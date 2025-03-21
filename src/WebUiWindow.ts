import { Lit, Type, Var, type CodeLike } from "typec";
import { webui } from "./webuiA";

/**
 * A helper class that accepts the variable name to hold the webui window
 * and binds all window-specific webui functions to it.
 */
export class WebUIWindow {
  constructor(varName: string) {
    this.win = Var.new(Type.size_t(), varName);
  }
  win;

  create() {
    return this.win.init(webui.new_window.call());
  }

  getBestBrowser() {
    return webui.get_best_browser.call(this.win);
  }

  show(html: CodeLike) {
    return webui.show.call(this.win, html);
  }

  showBrowser(html: CodeLike, browser: CodeLike) {
    return webui.show_browser.call(this.win, html, browser);
  }

  bind(elementId: CodeLike, callback: CodeLike) {
    return webui.bind.call(this.win, elementId, callback);
  }

  script(js: CodeLike) {
    return webui.tcScript.call(this.win, js);
  }

  setIcon(svg: CodeLike, svgType: CodeLike = Lit.string("image/svg+xml")) {
    return webui.set_icon.call(this.win, svg, svgType);
  }

  /** Navigate to a specific URL. */
  navigate(url: CodeLike) {
    return webui.navigate.call(this.win, url);
  }

  subscribe(elementId: CodeLike = "") {
    //
  }
}
