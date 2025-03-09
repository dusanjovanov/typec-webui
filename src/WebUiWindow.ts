import { tc } from "typec";
import { WebUiBrowser, WebUiEventNameMap, WebUiEventType } from "./types";
import { webUi } from "./webUi";

/**
 * A helper class that accepts the variable name to hold the webui window
 * and "binds" all window-specific webui functions.
 */
export class WebUiWindow {
  constructor(varName: string) {
    this.varName = varName;
  }
  varName;

  create() {
    return tc._var("size_t", this.varName, webUi.newWindow());
  }

  getBestBrowser() {
    return webUi.getBestBrowser(this.varName);
  }

  show(html: string) {
    return webUi.show(this.varName, html);
  }

  showBrowser(html: string, browser: WebUiBrowser) {
    return webUi.showBrowser(this.varName, html, browser);
  }

  bind(elementId: string, callback: string) {
    return webUi.bind(this.varName, elementId, callback);
  }

  script(js: string) {
    return tc.chunk([
      tc.arrVar("char", "response", 64),
      tc
        ._if(tc.not(webUi.script(this.varName, js, 0, "response", 64)), [
          tc.std.printf(tc.str("JavaScript Error: %s\\n"), `response`),
        ])
        ._else([
          tc.std.printf(tc.str("JavaScript Response: %s\\n"), `response`),
        ])
        .toString(),
    ]);
  }

  setIcon(svg: string, svgType?: string) {
    return webUi.setIcon(this.varName, svg, svgType);
  }

  /** Navigate to a specific URL. */
  navigate(url: string) {
    return webUi.navigate(this.varName, url);
  }

  subscribe(elementId = "") {
    const fnName = `webui_ev_${this.varName}_${
      elementId === "" ? "all" : elementId
    }`;

    return {
      handler: tc.func(
        "void",
        fnName,
        [["webui_event_t*", "e"]],
        [
          tc
            ._if(
              `e->event_type == ${
                WebUiEventNameMap[WebUiEventType.WEBUI_EVENT_CONNECTED]
              }`,
              [tc.std.printf(tc.str("Connected."))]
            )
            ._elseif(
              `e->event_type ==  ${
                WebUiEventNameMap[WebUiEventType.WEBUI_EVENT_DISCONNECTED]
              }`,
              [tc.std.printf(tc.str("Disconnected."))]
            )
            ._elseif(
              `e->event_type ==  ${
                WebUiEventNameMap[WebUiEventType.WEBUI_EVENT_MOUSE_CLICK]
              }`,
              [tc.std.printf(tc.str("Click."))]
            )
            ._elseif(
              `e->event_type ==  ${
                WebUiEventNameMap[WebUiEventType.WEBUI_EVENT_NAVIGATION]
              }`,
              [
                tc.std.printf(
                  tc.str("Starting navigation to: %s"),
                  `e->element`
                ),
              ]
            )
            .toString(),
        ]
      ),
      bind: this.bind(tc.str(elementId), fnName),
    };
  }
}
