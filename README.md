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
  libSearchPaths: ["webui"],
  libs: ["webui-2-static", "ws2_32", "user32", "ole32"],
  allWarnings: true,
  linkerOptions: ["-subsystem=windows"],
  optimizationLevel: "0",
  isStatic: true,
});

// Call the command with Bun Shell
$`${{ raw: compileCmd }}`;

// Run the binary
$`${{ raw: BINARY_FILE_PATH }}`;
```

## API

`WebUIWindow` class:

```ts
const win = new WebUIWindow("someName");

// you need to call this before any other methods
win.create();

// this actually creates the window and assigns it to a variable named "someName"

// show window and load an html file:
win.show(tc.str("./index.html"));

// navigate to a url
win.navigate("https://www.google.com");

// set favicon to window
win.setIcon(tc.str(`<svg>...</svg>`));
```
