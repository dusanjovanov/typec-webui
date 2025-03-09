# typec-webui 🪟

The `typec` wrapper for the `webui` C library.

## Install

Create a Bun TS project with `bun init`. ( install Bun first https://bun.sh/docs/installation )

Install typec with `bun add typec`

Download the newest `webui` release for your OS from here: https://github.com/webui-dev/webui/releases

Copy the folder to your TS project root.

Your main ( entry ) file:

```ts
import { tc } from "typec";
import { webUi, WebUiWindow } from "typec-webui";
import { $ } from "bun";

const win = new WebUiWindow("myWindow");

const code = tc.chunk([
  // includes the webui header file
  webUi.include(),
  // the C main function
  tc.func(
    "int",
    "main",
    [],
    [
      win.create(),
      win.show(
        tc.str(
          '<html><script src="webui.js"></script> Hello World from C! </html>'
        )
      ),
      webUi.wait(), // wait until all windows are closed
      tc._return(0),
    ]
  ),
]);

const C_FILE_PATH = "main.c";
const BINARY_FILE_PATH = "main.exe";

// Write code to a C file
const file = Bun.file(C_FILE_PATH);
await Bun.write(file, code);

// Generate a gcc compile command
const compileCmd = tc.gcc({
  path: C_FILE_PATH,
  output: BINARY_FILE_PATH,
  includeSearchPaths: ["webui/include"],
  libSearchPaths: ["webui"] // path to the webui folder you downloaded,
  libs: ["webui-2-static", "ws2_32", "user32", "ole32"],
  allWarnings: true,
  linkerOptions: ["-subsystem=windows"],
  optimizationLevel: "s",
  isStatic: true,
});

// Call the command with Bun Shell
$`${{ raw: compileCmd }}`;

// Run the binary
$`${{ raw: BINARY_FILE_PATH }}`;
```

## API

`webUi` object has an equivalent method for all `webui` C functions.

```ts
type WebUi = {
  include: () => string,
  wait: () => string,
  newWindow: () => string,
  show: (window: string, html: string) => string,
  showBrowser: (window: string, html: string, browser: WebUiBrowser) => string,
  getBestBrowser: (window: string) => string,
  bind: (window: string, elementId: string, callback: string) => string,
  script: (
    window: string,
    js: string,
    timeout: TextLike,
    buffer: string,
    bufferSize: TextLike
  ) => string,
  setIcon: (window: string, svg: string, svgType?: string) => string,
  navigate: (window: string, url: string): string;
  ...
};
```

`WebUiWindow` class is a helper class that binds all window specific functions to a single window variable.

```ts
const win = new WebUiWindow("someName");

// you need to call this and insert it in the code before any other methods
win.create(); // this actually creates the window and assigns it to a variable named "someName"

// show window and load an html file:
win.show(tc.str("./index.html"));

// navigate to a url
win.navigate("https://www.google.com");

// set favicon to window
win.setIcon(tc.str(`<svg>...</svg>`));
```
