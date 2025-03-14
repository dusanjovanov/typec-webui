import { Func, Include, Param, Pointer, Simple, Struct } from "typec";

const WebUiEventPointerType = Pointer.simple("webui_event_t");

const FileHandlerType = Func.pointerType(Pointer.simple("void", ["const"]), [
  Pointer.simple("char", ["const"]),
  Pointer.simple("int"),
]);

const FileHandlerWindowType = Func.pointerType(
  Pointer.simple("void", ["const"]),
  [
    Simple.type("size_t"),
    Pointer.simple("char", ["const"]),
    Pointer.simple("int"),
  ]
);

const BindHandlerType = Func.pointerType(Simple.type("void"), [
  WebUiEventPointerType,
]);

const InterfaceBindHandlerType = Func.pointerType(Simple.type("void"), [
  Simple.type("size_t"),
  Simple.type("size_t"),
  Pointer.simple("char"),
  Simple.type("size_t"),
  Simple.type("size_t"),
]);

export const HtmlContentParamType = Pointer.simple("char", ["const"]);

export const HtmlElementParamType = Pointer.type(
  Simple.type("char", ["const"])
);

export const PathParamType = Pointer.simple("char");

export const WebUiEventStruct = Struct.new("webui_event_t", {
  window: Simple.type("size_t"),
  event_type: Simple.type("size_t"),
  element: Pointer.simple("char"),
  event_number: Simple.type("size_t"),
  bind_id: Simple.type("size_t"),
  client_id: Simple.type("size_t"),
  connection_id: Simple.type("size_t"),
  cookies: Pointer.simple("char"),
});

export class WebUi {
  // Static method for include
  static include() {
    return Include.relative("webui.h");
  }

  // Window Management
  static newWindow = Func.new(Simple.type("size_t"), "webui_new_window", []);

  static newWindowId = Func.new(Simple.type("size_t"), "webui_new_window_id", [
    new Param(Simple.type("size_t"), "window_number"),
  ]);

  static getNewWindowId = Func.new(
    Simple.type("size_t"),
    "webui_get_new_window_id",
    []
  );

  static wait = Func.new(Simple.type("void"), "webui_wait", []);

  static close = Func.new(Simple.type("void"), "webui_close", [
    new Param(Simple.type("size_t"), "window"),
  ]);

  static closeClient = Func.new(Simple.type("void"), "webui_close_client", [
    new Param(WebUiEventPointerType, "e"),
  ]);

  static destroy = Func.new(Simple.type("void"), "webui_destroy", [
    new Param(Simple.type("size_t"), "window"),
  ]);

  static exit = Func.new(Simple.type("void"), "webui_exit", []);

  // Show Functions
  static show = Func.new(Simple.type("bool"), "webui_show", [
    new Param(Simple.type("size_t"), "window"),
    new Param(HtmlContentParamType, "content"),
  ]);

  static showClient = Func.new(Simple.type("bool"), "webui_show_client", [
    new Param(WebUiEventPointerType, "e"),
    new Param(HtmlContentParamType, "content"),
  ]);

  static showBrowser = Func.new(Simple.type("bool"), "webui_show_browser", [
    new Param(Simple.type("size_t"), "window"),
    new Param(HtmlContentParamType, "content"),
    new Param(Simple.type("size_t"), "browser"),
  ]);

  static startServer = Func.new(
    Pointer.simple("char", ["const"]),
    "webui_start_server",
    [
      new Param(Simple.type("size_t"), "window"),
      new Param(HtmlContentParamType, "content"),
    ]
  );

  static showWv = Func.new(Simple.type("bool"), "webui_show_wv", [
    new Param(Simple.type("size_t"), "window"),
    new Param(HtmlContentParamType, "content"),
  ]);

  // Binding and Callbacks
  static bind = Func.new(Simple.type("size_t"), "webui_bind", [
    new Param(Simple.type("size_t"), "window"),
    new Param(HtmlElementParamType, "element"),
    new Param(BindHandlerType, "func"),
  ]);

  static setContext = Func.new(Simple.type("void"), "webui_set_context", [
    new Param(Simple.type("size_t"), "window"),
    new Param(HtmlElementParamType, "element"),
    new Param(Pointer.simple("void"), "context"),
  ]);

  static getContext = Func.new(Pointer.simple("void"), "webui_get_context", [
    new Param(WebUiEventPointerType, "e"),
  ]);

  // Browser Utilities
  static getBestBrowser = Func.new(
    Simple.type("size_t"),
    "webui_get_best_browser",
    [new Param(Simple.type("size_t"), "window")]
  );

  static browserExist = Func.new(Simple.type("bool"), "webui_browser_exist", [
    new Param(Simple.type("size_t"), "browser"),
  ]);

  // Window Configuration
  static setKiosk = Func.new(Simple.type("void"), "webui_set_kiosk", [
    new Param(Simple.type("size_t"), "window"),
    new Param(Simple.type("bool"), "status"),
  ]);

  static setCustomParameters = Func.new(
    Simple.type("void"),
    "webui_set_custom_parameters",
    [
      new Param(Simple.type("size_t"), "window"),
      new Param(Pointer.simple("char"), "params"),
    ]
  );

  static setHighContrast = Func.new(
    Simple.type("void"),
    "webui_set_high_contrast",
    [
      new Param(Simple.type("size_t"), "window"),
      new Param(Simple.type("bool"), "status"),
    ]
  );

  static isHighContrast = Func.new(
    Simple.type("bool"),
    "webui_is_high_contrast",
    []
  );

  static setRootFolder = Func.new(
    Simple.type("bool"),
    "webui_set_root_folder",
    [
      new Param(Simple.type("size_t"), "window"),
      new Param(PathParamType, "path"),
    ]
  );

  static setDefaultRootFolder = Func.new(
    Simple.type("bool"),
    "webui_set_default_root_folder",
    [new Param(PathParamType, "path")]
  );

  static setFileHandler = Func.new(
    Simple.type("void"),
    "webui_set_file_handler",
    [
      new Param(Simple.type("size_t"), "window"),
      new Param(FileHandlerType, "handler"),
    ]
  );

  static setFileHandlerWindow = Func.new(
    Simple.type("void"),
    "webui_set_file_handler_window",
    [
      new Param(Simple.type("size_t"), "window"),
      new Param(FileHandlerWindowType, "handler"),
    ]
  );

  static interfaceSetResponseFileHandler = Func.new(
    Simple.type("void"),
    "webui_interface_set_response_file_handler",
    [
      new Param(Simple.type("size_t"), "window"),
      new Param(Pointer.simple("void", ["const"]), "response"),
      new Param(Simple.type("int"), "length"),
    ]
  );

  static isShown = Func.new(Simple.type("bool"), "webui_is_shown", [
    new Param(Simple.type("size_t"), "window"),
  ]);

  static setTimeout = Func.new(Simple.type("void"), "webui_set_timeout", [
    new Param(Simple.type("size_t"), "second"),
  ]);

  static setIcon = Func.new(Simple.type("void"), "webui_set_icon", [
    new Param(Simple.type("size_t"), "window"),
    new Param(Pointer.simple("char", ["const"]), "icon"),
    new Param(Pointer.simple("char", ["const"]), "icon_type"),
  ]);

  static setHide = Func.new(Simple.type("void"), "webui_set_hide", [
    new Param(Simple.type("size_t"), "window"),
    new Param(Simple.type("bool"), "status"),
  ]);

  static setSize = Func.new(Simple.type("void"), "webui_set_size", [
    new Param(Simple.type("size_t"), "window"),
    new Param(Simple.type("unsigned int"), "width"),
    new Param(Simple.type("unsigned int"), "height"),
  ]);

  static setMinimumSize = Func.new(
    Simple.type("void"),
    "webui_set_minimum_size",
    [
      new Param(Simple.type("size_t"), "window"),
      new Param(Simple.type("unsigned int"), "width"),
      new Param(Simple.type("unsigned int"), "height"),
    ]
  );

  static setPosition = Func.new(Simple.type("void"), "webui_set_position", [
    new Param(Simple.type("size_t"), "window"),
    new Param(Simple.type("unsigned int"), "x"),
    new Param(Simple.type("unsigned int"), "y"),
  ]);

  static setProfile = Func.new(Simple.type("void"), "webui_set_profile", [
    new Param(Simple.type("size_t"), "window"),
    new Param(Pointer.simple("char", ["const"]), "name"),
    new Param(PathParamType, "path"),
  ]);

  static setProxy = Func.new(Simple.type("void"), "webui_set_proxy", [
    new Param(Simple.type("size_t"), "window"),
    new Param(Pointer.simple("char", ["const"]), "proxy_server"),
  ]);

  static getUrl = Func.new(Pointer.simple("char", ["const"]), "webui_get_url", [
    new Param(Simple.type("size_t"), "window"),
  ]);

  static openUrl = Func.new(Simple.type("void"), "webui_open_url", [
    new Param(Pointer.simple("char", ["const"]), "url"),
  ]);

  static set = Func.new(Simple.type("void"), "webui_set_", [
    new Param(Simple.type("size_t"), "window"),
    new Param(Simple.type("bool"), "status"),
  ]);

  static navigate = Func.new(Simple.type("void"), "webui_navigate", [
    new Param(Simple.type("size_t"), "window"),
    new Param(Pointer.simple("char", ["const"]), "url"),
  ]);

  static navigateClient = Func.new(
    Simple.type("void"),
    "webui_navigate_client",
    [
      new Param(WebUiEventPointerType, "e"),
      new Param(Pointer.simple("char", ["const"]), "url"),
    ]
  );

  // Memory and Utility
  static encode = Func.new(Pointer.simple("char"), "webui_encode", [
    new Param(Pointer.simple("char", ["const"]), "str"),
  ]);

  static decode = Func.new(Pointer.simple("char"), "webui_decode", [
    new Param(Pointer.simple("char", ["const"]), "str"),
  ]);

  static free = Func.new(Simple.type("void"), "webui_free", [
    new Param(Pointer.simple("void"), "ptr"),
  ]);

  static malloc = Func.new(Pointer.simple("void"), "webui_malloc", [
    new Param(Simple.type("size_t"), "size"),
  ]);

  static memcpy = Func.new(Simple.type("void"), "webui_memcpy", [
    new Param(Pointer.simple("void"), "dest"),
    new Param(Pointer.simple("void"), "src"),
    new Param(Simple.type("size_t"), "count"),
  ]);

  static clean = Func.new(Simple.type("void"), "webui_clean", []);

  static deleteAllProfiles = Func.new(
    Simple.type("void"),
    "webui_delete_all_profiles",
    []
  );

  static deleteProfile = Func.new(Simple.type("void"), "webui_delete_profile", [
    new Param(Simple.type("size_t"), "window"),
  ]);

  static getParentProcessId = Func.new(
    Simple.type("size_t"),
    "webui_get_parent_process_id",
    [new Param(Simple.type("size_t"), "window")]
  );

  static getChildProcessId = Func.new(
    Simple.type("size_t"),
    "webui_get_child_process_id",
    [new Param(Simple.type("size_t"), "window")]
  );

  // Network
  static getPort = Func.new(Simple.type("size_t"), "webui_get_port", [
    new Param(Simple.type("size_t"), "window"),
  ]);

  static setPort = Func.new(Simple.type("bool"), "webui_set_port", [
    new Param(Simple.type("size_t"), "window"),
    new Param(Simple.type("size_t"), "port"),
  ]);

  static getFreePort = Func.new(
    Simple.type("size_t"),
    "webui_get_free_port",
    []
  );

  // Configuration
  static setConfig = Func.new(Simple.type("void"), "webui_set_config", [
    new Param(Simple.type("webui_config"), "option"),
    new Param(Simple.type("bool"), "status"),
  ]);

  static setEventBlocking = Func.new(
    Simple.type("void"),
    "webui_set_event_blocking",
    [
      new Param(Simple.type("size_t"), "window"),
      new Param(Simple.type("bool"), "status"),
    ]
  );

  static getMimeType = Func.new(
    Pointer.simple("char", ["const"]),
    "webui_get_mime_type",
    [new Param(Pointer.simple("char", ["const"]), "file")]
  );

  // SSL/TLS
  static setTlsCertificate = Func.new(
    Simple.type("bool"),
    "webui_set_tls_certificate",
    [
      new Param(Pointer.simple("char", ["const"]), "certificate_pem"),
      new Param(Pointer.simple("char", ["const"]), "private_key_pem"),
    ]
  );

  // JavaScript
  static run = Func.new(Simple.type("void"), "webui_run", [
    new Param(Simple.type("size_t"), "window"),
    new Param(Pointer.simple("char", ["const"]), "script"),
  ]);

  static runClient = Func.new(Simple.type("void"), "webui_run_client", [
    new Param(WebUiEventPointerType, "e"),
    new Param(Pointer.simple("char", ["const"]), "script"),
  ]);

  static script = Func.new(Simple.type("bool"), "webui_script", [
    new Param(Simple.type("size_t"), "window"),
    new Param(Pointer.simple("char", ["const"]), "script"),
    new Param(Simple.type("size_t"), "timeout"),
    new Param(Pointer.simple("char"), "buffer"),
    new Param(Simple.type("size_t"), "buffer_length"),
  ]);

  static scriptClient = Func.new(Simple.type("bool"), "webui_script_client", [
    new Param(WebUiEventPointerType, "e"),
    new Param(Pointer.simple("char", ["const"]), "script"),
    new Param(Simple.type("size_t"), "timeout"),
    new Param(Pointer.simple("char"), "buffer"),
    new Param(Simple.type("size_t"), "buffer_length"),
  ]);

  static setRuntime = Func.new(Simple.type("void"), "webui_set_runtime", [
    new Param(Simple.type("size_t"), "window"),
    new Param(Simple.type("size_t"), "runtime"),
  ]);

  static getCount = Func.new(Simple.type("size_t"), "webui_get_count", [
    new Param(WebUiEventPointerType, "e"),
  ]);

  static getIntAt = Func.new(Simple.type("long long int"), "webui_get_int_at", [
    new Param(WebUiEventPointerType, "e"),
    new Param(Simple.type("size_t"), "index"),
  ]);

  static getInt = Func.new(Simple.type("long long int"), "webui_get_int", [
    new Param(WebUiEventPointerType, "e"),
  ]);

  static getFloatAt = Func.new(Simple.type("double"), "webui_get_float_at", [
    new Param(WebUiEventPointerType, "e"),
    new Param(Simple.type("size_t"), "index"),
  ]);

  static getFloat = Func.new(Simple.type("double"), "webui_get_float", [
    new Param(WebUiEventPointerType, "e"),
  ]);

  static getStringAt = Func.new(
    Pointer.simple("char", ["const"]),
    "webui_get_string_at",
    [
      new Param(WebUiEventPointerType, "e"),
      new Param(Simple.type("size_t"), "index"),
    ]
  );

  static getString = Func.new(
    Pointer.simple("char", ["const"]),
    "webui_get_string",
    [new Param(WebUiEventPointerType, "e")]
  );

  static getBoolAt = Func.new(Simple.type("bool"), "webui_get_bool_at", [
    new Param(WebUiEventPointerType, "e"),
    new Param(Simple.type("size_t"), "index"),
  ]);

  static getBool = Func.new(Simple.type("bool"), "webui_get_bool", [
    new Param(WebUiEventPointerType, "e"),
  ]);

  static getSizeAt = Func.new(Simple.type("size_t"), "webui_get_size_at", [
    new Param(WebUiEventPointerType, "e"),
    new Param(Simple.type("size_t"), "index"),
  ]);

  static getSize = Func.new(Simple.type("size_t"), "webui_get_size", [
    new Param(WebUiEventPointerType, "e"),
  ]);

  static returnInt = Func.new(Simple.type("void"), "webui_return_int", [
    new Param(WebUiEventPointerType, "e"),
    new Param(Simple.type("long long int"), "n"),
  ]);

  static returnFloat = Func.new(Simple.type("void"), "webui_return_float", [
    new Param(WebUiEventPointerType, "e"),
    new Param(Simple.type("double"), "f"),
  ]);

  static returnString = Func.new(Simple.type("void"), "webui_return_string", [
    new Param(WebUiEventPointerType, "e"),
    new Param(Pointer.simple("char", ["const"]), "s"),
  ]);

  static returnBool = Func.new(Simple.type("void"), "webui_return_bool", [
    new Param(WebUiEventPointerType, "e"),
    new Param(Simple.type("bool"), "b"),
  ]);

  // Raw Data
  static sendRaw = Func.new(Simple.type("void"), "webui_send_raw", [
    new Param(Simple.type("size_t"), "window"),
    new Param(Pointer.simple("char", ["const"]), "function"),
    new Param(Pointer.simple("void", ["const"]), "raw"),
    new Param(Simple.type("size_t"), "size"),
  ]);

  static sendRawClient = Func.new(
    Simple.type("void"),
    "webui_send_raw_client",
    [
      new Param(WebUiEventPointerType, "e"),
      new Param(Pointer.simple("char", ["const"]), "function"),
      new Param(Pointer.simple("void", ["const"]), "raw"),
      new Param(Simple.type("size_t"), "size"),
    ]
  );

  // Wrapper Interface
  static interfaceBind = Func.new(
    Simple.type("size_t"),
    "webui_interface_bind",
    [
      new Param(Simple.type("size_t"), "window"),
      new Param(HtmlElementParamType, "element"),
      new Param(InterfaceBindHandlerType, "func"),
    ]
  );

  static interfaceSetResponse = Func.new(
    Simple.type("void"),
    "webui_interface_set_response",
    [
      new Param(Simple.type("size_t"), "window"),
      new Param(Simple.type("size_t"), "event_number"),
      new Param(Pointer.simple("char", ["const"]), "response"),
    ]
  );

  static interfaceIsAppRunning = Func.new(
    Simple.type("bool"),
    "webui_interface_is_app_running",
    []
  );

  static interfaceGetWindowId = Func.new(
    Simple.type("size_t"),
    "webui_interface_get_window_id",
    [new Param(Simple.type("size_t"), "window")]
  );

  static interfaceGetStringAt = Func.new(
    Pointer.simple("char", ["const"]),
    "webui_interface_get_string_at",
    [
      new Param(Simple.type("size_t"), "window"),
      new Param(Simple.type("size_t"), "event_number"),
      new Param(Simple.type("size_t"), "index"),
    ]
  );

  static interfaceGetIntAt = Func.new(
    Simple.type("long long int"),
    "webui_interface_get_int_at",
    [
      new Param(Simple.type("size_t"), "window"),
      new Param(Simple.type("size_t"), "event_number"),
      new Param(Simple.type("size_t"), "index"),
    ]
  );

  static interfaceGetFloatAt = Func.new(
    Simple.type("double"),
    "webui_interface_get_float_at",
    [
      new Param(Simple.type("size_t"), "window"),
      new Param(Simple.type("size_t"), "event_number"),
      new Param(Simple.type("size_t"), "index"),
    ]
  );

  static interfaceGetBoolAt = Func.new(
    Simple.type("bool"),
    "webui_interface_get_bool_at",
    [
      new Param(Simple.type("size_t"), "window"),
      new Param(Simple.type("size_t"), "event_number"),
      new Param(Simple.type("size_t"), "index"),
    ]
  );

  static interfaceGetSizeAt = Func.new(
    Simple.type("size_t"),
    "webui_interface_get_size_at",
    [
      new Param(Simple.type("size_t"), "window"),
      new Param(Simple.type("size_t"), "event_number"),
      new Param(Simple.type("size_t"), "index"),
    ]
  );

  static interfaceShowClient = Func.new(
    Simple.type("bool"),
    "webui_interface_show_client",
    [
      new Param(Simple.type("size_t"), "window"),
      new Param(Simple.type("size_t"), "event_number"),
      new Param(Pointer.simple("char", ["const"]), "content"),
    ]
  );

  static interfaceCloseClient = Func.new(
    Simple.type("void"),
    "webui_interface_close_client",
    [
      new Param(Simple.type("size_t"), "window"),
      new Param(Simple.type("size_t"), "event_number"),
    ]
  );

  static interfaceSendRawClient = Func.new(
    Simple.type("void"),
    "webui_interface_send_raw_client",
    [
      new Param(Simple.type("size_t"), "window"),
      new Param(Simple.type("size_t"), "event_number"),
      new Param(Pointer.simple("char", ["const"]), "function"),
      new Param(Pointer.simple("void", ["const"]), "raw"),
      new Param(Simple.type("size_t"), "size"),
    ]
  );

  static interfaceNavigateClient = Func.new(
    Simple.type("void"),
    "webui_interface_navigate_client",
    [
      new Param(Simple.type("size_t"), "window"),
      new Param(Simple.type("size_t"), "event_number"),
      new Param(Pointer.simple("char", ["const"]), "url"),
    ]
  );

  static interfaceRunClient = Func.new(
    Simple.type("void"),
    "webui_interface_run_client",
    [
      new Param(Simple.type("size_t"), "window"),
      new Param(Simple.type("size_t"), "event_number"),
      new Param(Pointer.simple("char", ["const"]), "script"),
    ]
  );

  static interfaceScriptClient = Func.new(
    Simple.type("bool"),
    "webui_interface_script_client",
    [
      new Param(Simple.type("size_t"), "window"),
      new Param(Simple.type("size_t"), "event_number"),
      new Param(Pointer.simple("char", ["const"]), "script"),
      new Param(Simple.type("size_t"), "timeout"),
      new Param(Pointer.simple("char"), "buffer"),
      new Param(Simple.type("size_t"), "buffer_length"),
    ]
  );
}
