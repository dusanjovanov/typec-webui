import {
  Address,
  ArrayC,
  chunk,
  Condition,
  Func,
  Operator,
  Simple,
  std,
  Value,
  Variable,
} from "typec";
import { WebUiBrowser } from "./types";
import { WebUi } from "./WebUi";

/**
 * A helper class that accepts the variable name to hold the webui window
 * and binds all window-specific webui functions to it.
 */
export class WebUiWindow {
  constructor(varName: string) {
    this.variable = new Variable(Simple.type("size_t"), varName);
  }
  variable;

  create() {
    return this.variable.init(WebUi.newWindow.call([]));
  }

  getBestBrowser() {
    return WebUi.getBestBrowser.call([this.variable.value()]);
  }

  show(html: string) {
    return WebUi.show.call([this.variable.value(), Address.string(html)]);
  }

  showBrowser(html: string, browser: WebUiBrowser) {
    return WebUi.showBrowser.call([
      this.variable.value(),
      Address.string(html),
      new Value("size_t", browser),
    ]);
  }

  bind(elementId: string, callback: string) {
    return WebUi.bind.call([
      this.variable.value(),
      Address.string(elementId),
      "" as any,
    ]);
  }

  script(js: string) {
    const arr = new ArrayC(Simple.type("char"), 64, "response");

    return chunk([
      arr.declare(),
      Condition.if(
        Operator.not(
          WebUi.script.call([
            this.variable.value(),
            Address.string(js),
            Value.any("size_t", 0),
            Address.string("response"),
            Value.any("size_t", 64),
          ])
        ),
        [
          std.io.printf.call([
            Address.string("JavaScript Error: %s\\n"),
            `response`,
          ]),
        ]
      ).else([
        std.io.printf.call([Address.string("JavaScript Response: %s\\n")]),
        `response`,
      ]),
    ]);
  }

  setIcon(svg: string, svgType = "image/svg+xml") {
    return WebUi.setIcon.call([
      this.variable.value(),
      Address.string(svg),
      Address.string(svgType),
    ]);
  }

  /** Navigate to a specific URL. */
  navigate(url: string) {
    return WebUi.navigate.call([this.variable.value(), Address.string(url)]);
  }

  subscribe(elementId = "") {
    // const fnName = `webui_ev_${this.varName}_${
    //   elementId === "" ? "all" : elementId
    // }`;

    // const refEvType = dotRef("e", "event_type");

    const handler = Func.new(Simple.type("void"), "bla", []);

    return {
      handler,
      bind: () => this.bind(elementId, ""),
    };
  }
}

// func(
//   "void",
//   fnName,
//   [["webui_event_t*", "e"]],
//   [
//     Condition.if(
//       Operator.eq(
//         refEvType,
//         WebUiEventNameMap[WebUiEventType.WEBUI_EVENT_CONNECTED]
//       ),
//       [std.printf(str("WEBUI_EVENT_CONNECTED."))]
//     )
//       ._elseif(
//         eq(
//           refEvType,
//           WebUiEventNameMap[WebUiEventType.WEBUI_EVENT_DISCONNECTED]
//         ),
//         [std.printf(str("WEBUI_EVENT_DISCONNECTED."))]
//       )
//       ._elseif(
//         eq(
//           refEvType,
//           WebUiEventNameMap[WebUiEventType.WEBUI_EVENT_MOUSE_CLICK]
//         ),
//         [std.printf(str("WEBUI_EVENT_MOUSE_CLICK."))]
//       )
//       ._elseif(
//         eq(
//           refEvType,
//           WebUiEventNameMap[WebUiEventType.WEBUI_EVENT_NAVIGATION]
//         ),
//         [std.printf(str("WEBUI_EVENT_NAVIGATION."))]
//       )
//       .toString(),
//   ]
// )
