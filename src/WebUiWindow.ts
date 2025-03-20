import { Array, Func, Lit, Param, Type, Var, type CodeLike } from "typec";
import { WebUiBrowser } from "./types";
import { WebUi } from "./WebUi";

const script = (() => {
  const script = Func.new(Type.string(), "tc_webui_script", [
    Param.new(Type.size_t(), "win"),
    Param.new(Type.string(), "js"),
  ]);

  const response = Array.new(Type.char(), 64, "response");

  const { win, js } = script.params;

  script.add(
    WebUi.script.call(win, js, 0, response, 64),
    Func.return(response)
  );

  return script;
})();

/**
 * A helper class that accepts the variable name to hold the webui window
 * and binds all window-specific webui functions to it.
 */
export class WebUiWindow {
  constructor(varName: string) {
    this.win = Var.new(Type.size_t(), varName);
  }
  win;

  create() {
    return this.win.init(WebUi.newWindow.call());
  }

  getBestBrowser() {
    return WebUi.getBestBrowser.call(this.win);
  }

  show(html: CodeLike) {
    return WebUi.show.call(this.win, html);
  }

  showBrowser(html: CodeLike, browser: WebUiBrowser) {
    return WebUi.showBrowser.call(this.win, html, browser);
  }

  bind(elementId: CodeLike, callback: CodeLike) {
    return WebUi.bind.call(this.win, elementId, callback);
  }

  script(js: CodeLike) {
    return script.call(this.win, js);
  }

  setIcon(svg: CodeLike, svgType: CodeLike = Lit.string("image/svg+xml")) {
    return WebUi.setIcon.call(this.win, svg, svgType);
  }

  /** Navigate to a specific URL. */
  navigate(url: CodeLike) {
    return WebUi.navigate.call(this.win, url);
  }

  subscribe(elementId: CodeLike = "") {
    //
  }
}
