import { tc, type TextLike } from "typec";
import type { WebUiBrowser } from "./types";

export const webUi = {
  include: () => tc.includeRel("webui.h"),
  /** Wait until all opened windows get closed. */
  wait: () => tc.callFunc("webui_wait"),
  newWindow: () => {
    return tc.callFunc("webui_new_window");
  },
  /**
   * Show the window with the provided html.
   *
   * html can be:
   * - HTML code string
   * - path to HTML file
   * - URL to a website
   */
  show: (window: string, html: string) => {
    return tc.callFunc(`webui_show`, [window, html]);
  },
  showBrowser: (window: string, html: string, browser: WebUiBrowser) => {
    return tc.callFunc(`webui_show_browser`, [window, html, browser]);
  },
  getBestBrowser: (window: string) => {
    return tc.callFunc("webui_get_best_browser", [window]);
  },
  bind: (window: string, elementId: string, callback: string) => {
    return tc.callFunc("webui_bind", [window, elementId, callback]);
  },
  script: (
    window: string,
    js: string,
    timeout: TextLike,
    buffer: string,
    bufferSize: TextLike
  ) => {
    return tc.callFunc(`webui_script`, [
      window,
      js,
      timeout,
      buffer,
      bufferSize,
    ]);
  },
  setIcon: (window: string, svg: string, svgType = tc.str("image/svg+xml")) => {
    return tc.callFunc("webui_set_icon", [window, svg, svgType]);
  },
  navigate: (window: string, url: string) => {
    return tc.callFunc("webui_navigate", [window, url]);
  },
};
