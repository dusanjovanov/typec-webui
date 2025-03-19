import { Func, Include, Param, Struct, Type } from "typec";

export const WebUiEventStruct = Struct.new("webui_event_t", {
  window: Type.size_t(),
  event_type: Type.size_t(),
  element: Type.string(),
  event_number: Type.size_t(),
  bind_id: Type.size_t(),
  client_id: Type.size_t(),
  connection_id: Type.size_t(),
  cookies: Type.string(),
});

const WebUiEventPointerType = WebUiEventStruct.pointerType();

const FileHandlerType = Type.pointer(
  Type.func(Type.voidPointer(["const"]), [
    Type.string(["const"]),
    Type.intPointer(),
  ])
);

const FileHandlerWindowType = Type.pointer(
  Type.func(Type.void(["const"]), [
    Type.size_t(),
    Type.string(["const"]),
    Type.intPointer(),
  ])
);

const BindHandlerType = Type.pointer(
  Type.func(Type.void(), [WebUiEventPointerType])
);

const InterfaceBindHandlerType = Type.pointer(
  Type.func(Type.void(), [
    Type.size_t(),
    Type.size_t(),
    Type.string(),
    Type.size_t(),
    Type.size_t(),
  ])
);

export const HtmlContentParamType = Type.string(["const"]);

export const HtmlElementParamType = Type.string(["const"]);

export const PathParamType = Type.string();

export class WebUi {
  static include() {
    return Include.relative("webui.h");
  }

  // Window Management
  static newWindow = Func.new(Type.size_t(), "webui_new_window", []);

  static newWindowId = Func.new(Type.size_t(), "webui_new_window_id", [
    Param.new(Type.size_t(), "window_number"),
  ]);

  static getNewWindowId = Func.new(
    Type.size_t(),
    "webui_get_new_window_id",
    []
  );

  static wait = Func.new(Type.void(), "webui_wait", []);

  static close = Func.new(Type.void(), "webui_close", [
    Param.new(Type.size_t(), "window"),
  ]);

  static closeClient = Func.new(Type.void(), "webui_close_client", [
    Param.new(WebUiEventPointerType, "e"),
  ]);

  static destroy = Func.new(Type.void(), "webui_destroy", [
    Param.new(Type.size_t(), "window"),
  ]);

  static exit = Func.new(Type.void(), "webui_exit", []);

  // Show Functions
  static show = Func.new(Type.bool(), "webui_show", [
    Param.new(Type.size_t(), "window"),
    Param.new(HtmlContentParamType, "content"),
  ]);

  static showClient = Func.new(Type.bool(), "webui_show_client", [
    Param.new(WebUiEventPointerType, "e"),
    Param.new(HtmlContentParamType, "content"),
  ]);

  static showBrowser = Func.new(Type.bool(), "webui_show_browser", [
    Param.new(Type.size_t(), "window"),
    Param.new(HtmlContentParamType, "content"),
    Param.new(Type.size_t(), "browser"),
  ]);

  static startServer = Func.new(Type.string(["const"]), "webui_start_server", [
    Param.new(Type.size_t(), "window"),
    Param.new(HtmlContentParamType, "content"),
  ]);

  static showWv = Func.new(Type.bool(), "webui_show_wv", [
    Param.new(Type.size_t(), "window"),
    Param.new(HtmlContentParamType, "content"),
  ]);

  // Binding and Callbacks
  static bind = Func.new(Type.size_t(), "webui_bind", [
    Param.new(Type.size_t(), "window"),
    Param.new(HtmlElementParamType, "element"),
    Param.new(BindHandlerType, "func"),
  ]);

  static setContext = Func.new(Type.void(), "webui_set_context", [
    Param.new(Type.size_t(), "window"),
    Param.new(HtmlElementParamType, "element"),
    Param.new(Type.voidPointer(), "context"),
  ]);

  static getContext = Func.new(Type.voidPointer(), "webui_get_context", [
    Param.new(WebUiEventPointerType, "e"),
  ]);

  // Browser Utilities
  static getBestBrowser = Func.new(Type.size_t(), "webui_get_best_browser", [
    Param.new(Type.size_t(), "window"),
  ]);

  static browserExist = Func.new(Type.bool(), "webui_browser_exist", [
    Param.new(Type.size_t(), "browser"),
  ]);

  // Window Configuration
  static setKiosk = Func.new(Type.void(), "webui_set_kiosk", [
    Param.new(Type.size_t(), "window"),
    Param.new(Type.bool(), "status"),
  ]);

  static setCustomParameters = Func.new(
    Type.void(),
    "webui_set_custom_parameters",
    [Param.new(Type.size_t(), "window"), Param.new(Type.string(), "params")]
  );

  static setHighContrast = Func.new(Type.void(), "webui_set_high_contrast", [
    Param.new(Type.size_t(), "window"),
    Param.new(Type.bool(), "status"),
  ]);

  static isHighContrast = Func.new(Type.bool(), "webui_is_high_contrast", []);

  static setRootFolder = Func.new(Type.bool(), "webui_set_root_folder", [
    Param.new(Type.size_t(), "window"),
    Param.new(PathParamType, "path"),
  ]);

  static setDefaultRootFolder = Func.new(
    Type.bool(),
    "webui_set_default_root_folder",
    [Param.new(PathParamType, "path")]
  );

  static setFileHandler = Func.new(Type.void(), "webui_set_file_handler", [
    Param.new(Type.size_t(), "window"),
    Param.new(FileHandlerType, "handler"),
  ]);

  static setFileHandlerWindow = Func.new(
    Type.void(),
    "webui_set_file_handler_window",
    [
      Param.new(Type.size_t(), "window"),
      Param.new(FileHandlerWindowType, "handler"),
    ]
  );

  static interfaceSetResponseFileHandler = Func.new(
    Type.void(),
    "webui_interface_set_response_file_handler",
    [
      Param.new(Type.size_t(), "window"),
      Param.new(Type.voidPointer(["const"]), "response"),
      Param.new(Type.int(), "length"),
    ]
  );

  static isShown = Func.new(Type.bool(), "webui_is_shown", [
    Param.new(Type.size_t(), "window"),
  ]);

  static setTimeout = Func.new(Type.void(), "webui_set_timeout", [
    Param.new(Type.size_t(), "second"),
  ]);

  static setIcon = Func.new(Type.void(), "webui_set_icon", [
    Param.new(Type.size_t(), "window"),
    Param.new(Type.string(["const"]), "icon"),
    Param.new(Type.string(["const"]), "icon_type"),
  ]);

  static setHide = Func.new(Type.void(), "webui_set_hide", [
    Param.new(Type.size_t(), "window"),
    Param.new(Type.bool(), "status"),
  ]);

  static setSize = Func.new(Type.void(), "webui_set_size", [
    Param.new(Type.size_t(), "window"),
    Param.new(Type.simple("unsigned int"), "width"),
    Param.new(Type.simple("unsigned int"), "height"),
  ]);

  static setMinimumSize = Func.new(Type.void(), "webui_set_minimum_size", [
    Param.new(Type.size_t(), "window"),
    Param.new(Type.simple("unsigned int"), "width"),
    Param.new(Type.simple("unsigned int"), "height"),
  ]);

  static setPosition = Func.new(Type.void(), "webui_set_position", [
    Param.new(Type.size_t(), "window"),
    Param.new(Type.simple("unsigned int"), "x"),
    Param.new(Type.simple("unsigned int"), "y"),
  ]);

  static setProfile = Func.new(Type.void(), "webui_set_profile", [
    Param.new(Type.size_t(), "window"),
    Param.new(Type.string(["const"]), "name"),
    Param.new(PathParamType, "path"),
  ]);

  static setProxy = Func.new(Type.void(), "webui_set_proxy", [
    Param.new(Type.size_t(), "window"),
    Param.new(Type.string(["const"]), "proxy_server"),
  ]);

  static getUrl = Func.new(Type.string(["const"]), "webui_get_url", [
    Param.new(Type.size_t(), "window"),
  ]);

  static openUrl = Func.new(Type.void(), "webui_open_url", [
    Param.new(Type.string(["const"]), "url"),
  ]);

  static set = Func.new(Type.void(), "webui_set_", [
    Param.new(Type.size_t(), "window"),
    Param.new(Type.bool(), "status"),
  ]);

  static navigate = Func.new(Type.void(), "webui_navigate", [
    Param.new(Type.size_t(), "window"),
    Param.new(Type.string(["const"]), "url"),
  ]);

  static navigateClient = Func.new(Type.void(), "webui_navigate_client", [
    Param.new(WebUiEventPointerType, "e"),
    Param.new(Type.string(["const"]), "url"),
  ]);

  // Memory and Utility
  static encode = Func.new(Type.string(), "webui_encode", [
    Param.new(Type.string(["const"]), "str"),
  ]);

  static decode = Func.new(Type.string(), "webui_decode", [
    Param.new(Type.string(["const"]), "str"),
  ]);

  static free = Func.new(Type.void(), "webui_free", [
    Param.new(Type.voidPointer(), "ptr"),
  ]);

  static malloc = Func.new(Type.voidPointer(), "webui_malloc", [
    Param.new(Type.size_t(), "size"),
  ]);

  static memcpy = Func.new(Type.void(), "webui_memcpy", [
    Param.new(Type.voidPointer(), "dest"),
    Param.new(Type.voidPointer(), "src"),
    Param.new(Type.size_t(), "count"),
  ]);

  static clean = Func.new(Type.void(), "webui_clean", []);

  static deleteAllProfiles = Func.new(
    Type.void(),
    "webui_delete_all_profiles",
    []
  );

  static deleteProfile = Func.new(Type.void(), "webui_delete_profile", [
    Param.new(Type.size_t(), "window"),
  ]);

  static getParentProcessId = Func.new(
    Type.size_t(),
    "webui_get_parent_process_id",
    [Param.new(Type.size_t(), "window")]
  );

  static getChildProcessId = Func.new(
    Type.size_t(),
    "webui_get_child_process_id",
    [Param.new(Type.size_t(), "window")]
  );

  // Network
  static getPort = Func.new(Type.size_t(), "webui_get_port", [
    Param.new(Type.size_t(), "window"),
  ]);

  static setPort = Func.new(Type.bool(), "webui_set_port", [
    Param.new(Type.size_t(), "window"),
    Param.new(Type.size_t(), "port"),
  ]);

  static getFreePort = Func.new(Type.size_t(), "webui_get_free_port", []);

  // Configuration
  static setConfig = Func.new(Type.void(), "webui_set_config", [
    Param.new(Type.simple("webui_config"), "option"),
    Param.new(Type.bool(), "status"),
  ]);

  static setEventBlocking = Func.new(Type.void(), "webui_set_event_blocking", [
    Param.new(Type.size_t(), "window"),
    Param.new(Type.bool(), "status"),
  ]);

  static getMimeType = Func.new(Type.string(["const"]), "webui_get_mime_type", [
    Param.new(Type.string(["const"]), "file"),
  ]);

  // SSL/TLS
  static setTlsCertificate = Func.new(
    Type.bool(),
    "webui_set_tls_certificate",
    [
      Param.new(Type.string(["const"]), "certificate_pem"),
      Param.new(Type.string(["const"]), "private_key_pem"),
    ]
  );

  // JavaScript
  static run = Func.new(Type.void(), "webui_run", [
    Param.new(Type.size_t(), "window"),
    Param.new(Type.string(["const"]), "script"),
  ]);

  static runClient = Func.new(Type.void(), "webui_run_client", [
    Param.new(WebUiEventPointerType, "e"),
    Param.new(Type.string(["const"]), "script"),
  ]);

  static script = Func.new(Type.bool(), "webui_script", [
    Param.new(Type.size_t(), "window"),
    Param.new(Type.string(["const"]), "script"),
    Param.new(Type.size_t(), "timeout"),
    Param.new(Type.string(), "buffer"),
    Param.new(Type.size_t(), "buffer_length"),
  ]);

  static scriptClient = Func.new(Type.bool(), "webui_script_client", [
    Param.new(WebUiEventPointerType, "e"),
    Param.new(Type.string(["const"]), "script"),
    Param.new(Type.size_t(), "timeout"),
    Param.new(Type.string(), "buffer"),
    Param.new(Type.size_t(), "buffer_length"),
  ]);

  static setRuntime = Func.new(Type.void(), "webui_set_runtime", [
    Param.new(Type.size_t(), "window"),
    Param.new(Type.size_t(), "runtime"),
  ]);

  static getCount = Func.new(Type.size_t(), "webui_get_count", [
    Param.new(WebUiEventPointerType, "e"),
  ]);

  static getIntAt = Func.new(Type.simple("long long int"), "webui_get_int_at", [
    Param.new(WebUiEventPointerType, "e"),
    Param.new(Type.size_t(), "index"),
  ]);

  static getInt = Func.new(Type.simple("long long int"), "webui_get_int", [
    Param.new(WebUiEventPointerType, "e"),
  ]);

  static getFloatAt = Func.new(Type.simple("double"), "webui_get_float_at", [
    Param.new(WebUiEventPointerType, "e"),
    Param.new(Type.size_t(), "index"),
  ]);

  static getFloat = Func.new(Type.simple("double"), "webui_get_float", [
    Param.new(WebUiEventPointerType, "e"),
  ]);

  static getStringAt = Func.new(Type.string(["const"]), "webui_get_string_at", [
    Param.new(WebUiEventPointerType, "e"),
    Param.new(Type.size_t(), "index"),
  ]);

  static getString = Func.new(Type.string(["const"]), "webui_get_string", [
    Param.new(WebUiEventPointerType, "e"),
  ]);

  static getBoolAt = Func.new(Type.bool(), "webui_get_bool_at", [
    Param.new(WebUiEventPointerType, "e"),
    Param.new(Type.size_t(), "index"),
  ]);

  static getBool = Func.new(Type.bool(), "webui_get_bool", [
    Param.new(WebUiEventPointerType, "e"),
  ]);

  static getSizeAt = Func.new(Type.size_t(), "webui_get_size_at", [
    Param.new(WebUiEventPointerType, "e"),
    Param.new(Type.size_t(), "index"),
  ]);

  static getSize = Func.new(Type.size_t(), "webui_get_size", [
    Param.new(WebUiEventPointerType, "e"),
  ]);

  static returnInt = Func.new(Type.void(), "webui_return_int", [
    Param.new(WebUiEventPointerType, "e"),
    Param.new(Type.simple("long long int"), "n"),
  ]);

  static returnFloat = Func.new(Type.void(), "webui_return_float", [
    Param.new(WebUiEventPointerType, "e"),
    Param.new(Type.simple("double"), "f"),
  ]);

  static returnString = Func.new(Type.void(), "webui_return_string", [
    Param.new(WebUiEventPointerType, "e"),
    Param.new(Type.string(["const"]), "s"),
  ]);

  static returnBool = Func.new(Type.void(), "webui_return_bool", [
    Param.new(WebUiEventPointerType, "e"),
    Param.new(Type.bool(), "b"),
  ]);

  // Raw Data
  static sendRaw = Func.new(Type.void(), "webui_send_raw", [
    Param.new(Type.size_t(), "window"),
    Param.new(Type.string(["const"]), "function"),
    Param.new(Type.voidPointer(["const"]), "raw"),
    Param.new(Type.size_t(), "size"),
  ]);

  static sendRawClient = Func.new(Type.void(), "webui_send_raw_client", [
    Param.new(WebUiEventPointerType, "e"),
    Param.new(Type.string(["const"]), "function"),
    Param.new(Type.voidPointer(["const"]), "raw"),
    Param.new(Type.size_t(), "size"),
  ]);

  // Wrapper Interface
  static interfaceBind = Func.new(Type.size_t(), "webui_interface_bind", [
    Param.new(Type.size_t(), "window"),
    Param.new(HtmlElementParamType, "element"),
    Param.new(InterfaceBindHandlerType, "func"),
  ]);

  static interfaceSetResponse = Func.new(
    Type.void(),
    "webui_interface_set_response",
    [
      Param.new(Type.size_t(), "window"),
      Param.new(Type.size_t(), "event_number"),
      Param.new(Type.string(["const"]), "response"),
    ]
  );

  static interfaceIsAppRunning = Func.new(
    Type.bool(),
    "webui_interface_is_app_running",
    []
  );

  static interfaceGetWindowId = Func.new(
    Type.size_t(),
    "webui_interface_get_window_id",
    [Param.new(Type.size_t(), "window")]
  );

  static interfaceGetStringAt = Func.new(
    Type.string(["const"]),
    "webui_interface_get_string_at",
    [
      Param.new(Type.size_t(), "window"),
      Param.new(Type.size_t(), "event_number"),
      Param.new(Type.size_t(), "index"),
    ]
  );

  static interfaceGetIntAt = Func.new(
    Type.simple("long long int"),
    "webui_interface_get_int_at",
    [
      Param.new(Type.size_t(), "window"),
      Param.new(Type.size_t(), "event_number"),
      Param.new(Type.size_t(), "index"),
    ]
  );

  static interfaceGetFloatAt = Func.new(
    Type.simple("double"),
    "webui_interface_get_float_at",
    [
      Param.new(Type.size_t(), "window"),
      Param.new(Type.size_t(), "event_number"),
      Param.new(Type.size_t(), "index"),
    ]
  );

  static interfaceGetBoolAt = Func.new(
    Type.bool(),
    "webui_interface_get_bool_at",
    [
      Param.new(Type.size_t(), "window"),
      Param.new(Type.size_t(), "event_number"),
      Param.new(Type.size_t(), "index"),
    ]
  );

  static interfaceGetSizeAt = Func.new(
    Type.size_t(),
    "webui_interface_get_size_at",
    [
      Param.new(Type.size_t(), "window"),
      Param.new(Type.size_t(), "event_number"),
      Param.new(Type.size_t(), "index"),
    ]
  );

  static interfaceShowClient = Func.new(
    Type.bool(),
    "webui_interface_show_client",
    [
      Param.new(Type.size_t(), "window"),
      Param.new(Type.size_t(), "event_number"),
      Param.new(Type.string(["const"]), "content"),
    ]
  );

  static interfaceCloseClient = Func.new(
    Type.void(),
    "webui_interface_close_client",
    [
      Param.new(Type.size_t(), "window"),
      Param.new(Type.size_t(), "event_number"),
    ]
  );

  static interfaceSendRawClient = Func.new(
    Type.void(),
    "webui_interface_send_raw_client",
    [
      Param.new(Type.size_t(), "window"),
      Param.new(Type.size_t(), "event_number"),
      Param.new(Type.string(["const"]), "function"),
      Param.new(Type.voidPointer(["const"]), "raw"),
      Param.new(Type.size_t(), "size"),
    ]
  );

  static interfaceNavigateClient = Func.new(
    Type.void(),
    "webui_interface_navigate_client",
    [
      Param.new(Type.size_t(), "window"),
      Param.new(Type.size_t(), "event_number"),
      Param.new(Type.string(["const"]), "url"),
    ]
  );

  static interfaceRunClient = Func.new(
    Type.void(),
    "webui_interface_run_client",
    [
      Param.new(Type.size_t(), "window"),
      Param.new(Type.size_t(), "event_number"),
      Param.new(Type.string(["const"]), "script"),
    ]
  );

  static interfaceScriptClient = Func.new(
    Type.bool(),
    "webui_interface_script_client",
    [
      Param.new(Type.size_t(), "window"),
      Param.new(Type.size_t(), "event_number"),
      Param.new(Type.string(["const"]), "script"),
      Param.new(Type.size_t(), "timeout"),
      Param.new(Type.string(), "buffer"),
      Param.new(Type.size_t(), "buffer_length"),
    ]
  );
}
