import { Array, Enum, Func, Include, lib, Param, Struct, Type } from "typec";

export const WebUIBrowserEnum = Enum.new("webui_browser", {
  NoBrowser: 0,
  AnyBrowser: 1,
  Chrome: 2,
  Firefox: 3,
  Edge: 4,
  Safari: 5,
  Chromium: 6,
  Opera: 7,
  Brave: 8,
  Vivaldi: 9,
  Epic: 10,
  Yandex: 11,
  ChromiumBased: 12,
  WebView: 13,
});

export const WebUIRuntimeEnum = Enum.new("webui_runtime", {
  None: 0,
  Deno: 1,
  NodeJS: 2,
  Bun: 3,
});

export const WebUIEvent = Enum.new("webui_event", {
  WEBUI_EVENT_DISCONNECTED: 0,
  WEBUI_EVENT_CONNECTED: 1,
  WEBUI_EVENT_MOUSE_CLICK: 2,
  WEBUI_EVENT_NAVIGATION: 3,
  WEBUI_EVENT_CALLBACK: 4,
});

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

const script = Func.new(Type.bool(), "webui_script", [
  Param.new(Type.size_t(), "window"),
  Param.new(Type.string(["const"]), "script"),
  Param.new(Type.size_t(), "timeout"),
  Param.new(Type.string(), "buffer"),
  Param.new(Type.size_t(), "buffer_length"),
]);

export const webui = lib({
  externals: [
    {
      include: Include.relative("webui.h"),
      api: {
        // Window Management
        new_window: Func.new(Type.size_t(), "webui_new_window", []),
        new_window_id: Func.new(Type.size_t(), "webui_new_window_id", [
          Param.new(Type.size_t(), "window_number"),
        ]),
        get_new_window_id: Func.new(
          Type.size_t(),
          "webui_get_new_window_id",
          []
        ),
        wait: Func.new(Type.void(), "webui_wait", []),
        close: Func.new(Type.void(), "webui_close", [
          Param.new(Type.size_t(), "window"),
        ]),
        close_client: Func.new(Type.void(), "webui_close_client", [
          Param.new(WebUiEventPointerType, "e"),
        ]),
        destroy: Func.new(Type.void(), "webui_destroy", [
          Param.new(Type.size_t(), "window"),
        ]),
        exit: Func.new(Type.void(), "webui_exit", []),
        // Show Functions
        show: Func.new(Type.bool(), "webui_show", [
          Param.new(Type.size_t(), "window"),
          Param.new(HtmlContentParamType, "content"),
        ]),
        show_client: Func.new(Type.bool(), "webui_show_client", [
          Param.new(WebUiEventPointerType, "e"),
          Param.new(HtmlContentParamType, "content"),
        ]),
        show_browser: Func.new(Type.bool(), "webui_show_browser", [
          Param.new(Type.size_t(), "window"),
          Param.new(HtmlContentParamType, "content"),
          Param.new(Type.size_t(), "browser"),
        ]),
        start_server: Func.new(Type.string(["const"]), "webui_start_server", [
          Param.new(Type.size_t(), "window"),
          Param.new(HtmlContentParamType, "content"),
        ]),
        show_wv: Func.new(Type.bool(), "webui_show_wv", [
          Param.new(Type.size_t(), "window"),
          Param.new(HtmlContentParamType, "content"),
        ]),
        // Binding and Callbacks
        bind: Func.new(Type.size_t(), "webui_bind", [
          Param.new(Type.size_t(), "window"),
          Param.new(HtmlElementParamType, "element"),
          Param.new(BindHandlerType, "func"),
        ]),
        set_context: Func.new(Type.void(), "webui_set_context", [
          Param.new(Type.size_t(), "window"),
          Param.new(HtmlElementParamType, "element"),
          Param.new(Type.voidPointer(), "context"),
        ]),
        get_context: Func.new(Type.voidPointer(), "webui_get_context", [
          Param.new(WebUiEventPointerType, "e"),
        ]),
        // Browser Utilities
        get_best_browser: Func.new(Type.size_t(), "webui_get_best_browser", [
          Param.new(Type.size_t(), "window"),
        ]),
        browser_exist: Func.new(Type.bool(), "webui_browser_exist", [
          Param.new(Type.size_t(), "browser"),
        ]),
        // Window Configuration
        set_kiosk: Func.new(Type.void(), "webui_set_kiosk", [
          Param.new(Type.size_t(), "window"),
          Param.new(Type.bool(), "status"),
        ]),
        set_custom_parameters: Func.new(
          Type.void(),
          "webui_set_custom_parameters",
          [
            Param.new(Type.size_t(), "window"),
            Param.new(Type.string(), "params"),
          ]
        ),
        set_high_contrast: Func.new(Type.void(), "webui_set_high_contrast", [
          Param.new(Type.size_t(), "window"),
          Param.new(Type.bool(), "status"),
        ]),
        is_high_contrast: Func.new(Type.bool(), "webui_is_high_contrast", []),
        set_root_folder: Func.new(Type.bool(), "webui_set_root_folder", [
          Param.new(Type.size_t(), "window"),
          Param.new(PathParamType, "path"),
        ]),
        set_default_root_folder: Func.new(
          Type.bool(),
          "webui_set_default_root_folder",
          [Param.new(PathParamType, "path")]
        ),
        set_file_handler: Func.new(Type.void(), "webui_set_file_handler", [
          Param.new(Type.size_t(), "window"),
          Param.new(FileHandlerType, "handler"),
        ]),
        set_file_handler_window: Func.new(
          Type.void(),
          "webui_set_file_handler_window",
          [
            Param.new(Type.size_t(), "window"),
            Param.new(FileHandlerWindowType, "handler"),
          ]
        ),
        interface_set_response_file_handler: Func.new(
          Type.void(),
          "webui_interface_set_response_file_handler",
          [
            Param.new(Type.size_t(), "window"),
            Param.new(Type.voidPointer(["const"]), "response"),
            Param.new(Type.int(), "length"),
          ]
        ),
        is_shown: Func.new(Type.bool(), "webui_is_shown", [
          Param.new(Type.size_t(), "window"),
        ]),
        set_timeout: Func.new(Type.void(), "webui_set_timeout", [
          Param.new(Type.size_t(), "second"),
        ]),
        set_icon: Func.new(Type.void(), "webui_set_icon", [
          Param.new(Type.size_t(), "window"),
          Param.new(Type.string(["const"]), "icon"),
          Param.new(Type.string(["const"]), "icon_type"),
        ]),
        set_hide: Func.new(Type.void(), "webui_set_hide", [
          Param.new(Type.size_t(), "window"),
          Param.new(Type.bool(), "status"),
        ]),
        set_size: Func.new(Type.void(), "webui_set_size", [
          Param.new(Type.size_t(), "window"),
          Param.new(Type.simple("unsigned int"), "width"),
          Param.new(Type.simple("unsigned int"), "height"),
        ]),
        set_minimum_size: Func.new(Type.void(), "webui_set_minimum_size", [
          Param.new(Type.size_t(), "window"),
          Param.new(Type.simple("unsigned int"), "width"),
          Param.new(Type.simple("unsigned int"), "height"),
        ]),
        set_position: Func.new(Type.void(), "webui_set_position", [
          Param.new(Type.size_t(), "window"),
          Param.new(Type.simple("unsigned int"), "x"),
          Param.new(Type.simple("unsigned int"), "y"),
        ]),
        set_profile: Func.new(Type.void(), "webui_set_profile", [
          Param.new(Type.size_t(), "window"),
          Param.new(Type.string(["const"]), "name"),
          Param.new(PathParamType, "path"),
        ]),
        set_proxy: Func.new(Type.void(), "webui_set_proxy", [
          Param.new(Type.size_t(), "window"),
          Param.new(Type.string(["const"]), "proxy_server"),
        ]),
        get_url: Func.new(Type.string(["const"]), "webui_get_url", [
          Param.new(Type.size_t(), "window"),
        ]),
        open_url: Func.new(Type.void(), "webui_open_url", [
          Param.new(Type.string(["const"]), "url"),
        ]),
        set: Func.new(Type.void(), "webui_set_", [
          Param.new(Type.size_t(), "window"),
          Param.new(Type.bool(), "status"),
        ]),
        navigate: Func.new(Type.void(), "webui_navigate", [
          Param.new(Type.size_t(), "window"),
          Param.new(Type.string(["const"]), "url"),
        ]),
        navigate_client: Func.new(Type.void(), "webui_navigate_client", [
          Param.new(WebUiEventPointerType, "e"),
          Param.new(Type.string(["const"]), "url"),
        ]),
        // Memory and Utility
        encode: Func.new(Type.string(), "webui_encode", [
          Param.new(Type.string(["const"]), "str"),
        ]),
        decode: Func.new(Type.string(), "webui_decode", [
          Param.new(Type.string(["const"]), "str"),
        ]),
        free: Func.new(Type.void(), "webui_free", [
          Param.new(Type.voidPointer(), "ptr"),
        ]),
        malloc: Func.new(Type.voidPointer(), "webui_malloc", [
          Param.new(Type.size_t(), "size"),
        ]),
        memcpy: Func.new(Type.void(), "webui_memcpy", [
          Param.new(Type.voidPointer(), "dest"),
          Param.new(Type.voidPointer(), "src"),
          Param.new(Type.size_t(), "count"),
        ]),
        clean: Func.new(Type.void(), "webui_clean", []),
        delete_all_profiles: Func.new(
          Type.void(),
          "webui_delete_all_profiles",
          []
        ),
        delete_profile: Func.new(Type.void(), "webui_delete_profile", [
          Param.new(Type.size_t(), "window"),
        ]),
        get_parent_process_id: Func.new(
          Type.size_t(),
          "webui_get_parent_process_id",
          [Param.new(Type.size_t(), "window")]
        ),
        get_child_process_id: Func.new(
          Type.size_t(),
          "webui_get_child_process_id",
          [Param.new(Type.size_t(), "window")]
        ),
        // Network
        get_port: Func.new(Type.size_t(), "webui_get_port", [
          Param.new(Type.size_t(), "window"),
        ]),
        set_port: Func.new(Type.bool(), "webui_set_port", [
          Param.new(Type.size_t(), "window"),
          Param.new(Type.size_t(), "port"),
        ]),
        get_free_port: Func.new(Type.size_t(), "webui_get_free_port", []),
        // Configuration
        set_config: Func.new(Type.void(), "webui_set_config", [
          Param.new(Type.simple("webui_config"), "option"),
          Param.new(Type.bool(), "status"),
        ]),
        set_event_blocking: Func.new(Type.void(), "webui_set_event_blocking", [
          Param.new(Type.size_t(), "window"),
          Param.new(Type.bool(), "status"),
        ]),
        get_mime_type: Func.new(Type.string(["const"]), "webui_get_mime_type", [
          Param.new(Type.string(["const"]), "file"),
        ]),
        // SSL/TLS
        set_tls_certificate: Func.new(
          Type.bool(),
          "webui_set_tls_certificate",
          [
            Param.new(Type.string(["const"]), "certificate_pem"),
            Param.new(Type.string(["const"]), "private_key_pem"),
          ]
        ),
        // JavaScript
        run: Func.new(Type.void(), "webui_run", [
          Param.new(Type.size_t(), "window"),
          Param.new(Type.string(["const"]), "script"),
        ]),
        run_client: Func.new(Type.void(), "webui_run_client", [
          Param.new(WebUiEventPointerType, "e"),
          Param.new(Type.string(["const"]), "script"),
        ]),
        script: Func.new(Type.bool(), "webui_script", [
          Param.new(Type.size_t(), "window"),
          Param.new(Type.string(["const"]), "script"),
          Param.new(Type.size_t(), "timeout"),
          Param.new(Type.string(), "buffer"),
          Param.new(Type.size_t(), "buffer_length"),
        ]),
        script_client: Func.new(Type.bool(), "webui_script_client", [
          Param.new(WebUiEventPointerType, "e"),
          Param.new(Type.string(["const"]), "script"),
          Param.new(Type.size_t(), "timeout"),
          Param.new(Type.string(), "buffer"),
          Param.new(Type.size_t(), "buffer_length"),
        ]),
        set_runtime: Func.new(Type.void(), "webui_set_runtime", [
          Param.new(Type.size_t(), "window"),
          Param.new(Type.size_t(), "runtime"),
        ]),
        get_count: Func.new(Type.size_t(), "webui_get_count", [
          Param.new(WebUiEventPointerType, "e"),
        ]),
        get_int_at: Func.new(Type.simple("long long int"), "webui_get_int_at", [
          Param.new(WebUiEventPointerType, "e"),
          Param.new(Type.size_t(), "index"),
        ]),
        get_int: Func.new(Type.simple("long long int"), "webui_get_int", [
          Param.new(WebUiEventPointerType, "e"),
        ]),
        get_float_at: Func.new(Type.simple("double"), "webui_get_float_at", [
          Param.new(WebUiEventPointerType, "e"),
          Param.new(Type.size_t(), "index"),
        ]),
        get_float: Func.new(Type.simple("double"), "webui_get_float", [
          Param.new(WebUiEventPointerType, "e"),
        ]),
        get_string_at: Func.new(Type.string(["const"]), "webui_get_string_at", [
          Param.new(WebUiEventPointerType, "e"),
          Param.new(Type.size_t(), "index"),
        ]),
        get_string: Func.new(Type.string(["const"]), "webui_get_string", [
          Param.new(WebUiEventPointerType, "e"),
        ]),
        get_bool_at: Func.new(Type.bool(), "webui_get_bool_at", [
          Param.new(WebUiEventPointerType, "e"),
          Param.new(Type.size_t(), "index"),
        ]),
        get_bool: Func.new(Type.bool(), "webui_get_bool", [
          Param.new(WebUiEventPointerType, "e"),
        ]),
        get_size_at: Func.new(Type.size_t(), "webui_get_size_at", [
          Param.new(WebUiEventPointerType, "e"),
          Param.new(Type.size_t(), "index"),
        ]),
        get_size: Func.new(Type.size_t(), "webui_get_size", [
          Param.new(WebUiEventPointerType, "e"),
        ]),
        return_int: Func.new(Type.void(), "webui_return_int", [
          Param.new(WebUiEventPointerType, "e"),
          Param.new(Type.simple("long long int"), "n"),
        ]),
        return_float: Func.new(Type.void(), "webui_return_float", [
          Param.new(WebUiEventPointerType, "e"),
          Param.new(Type.simple("double"), "f"),
        ]),
        return_string: Func.new(Type.void(), "webui_return_string", [
          Param.new(WebUiEventPointerType, "e"),
          Param.new(Type.string(["const"]), "s"),
        ]),
        return_bool: Func.new(Type.void(), "webui_return_bool", [
          Param.new(WebUiEventPointerType, "e"),
          Param.new(Type.bool(), "b"),
        ]),
        // Raw Data
        send_raw: Func.new(Type.void(), "webui_send_raw", [
          Param.new(Type.size_t(), "window"),
          Param.new(Type.string(["const"]), "function"),
          Param.new(Type.voidPointer(["const"]), "raw"),
          Param.new(Type.size_t(), "size"),
        ]),
        send_raw_client: Func.new(Type.void(), "webui_send_raw_client", [
          Param.new(WebUiEventPointerType, "e"),
          Param.new(Type.string(["const"]), "function"),
          Param.new(Type.voidPointer(["const"]), "raw"),
          Param.new(Type.size_t(), "size"),
        ]),
        // Wrapper Interface
        interface_bind: Func.new(Type.size_t(), "webui_interface_bind", [
          Param.new(Type.size_t(), "window"),
          Param.new(HtmlElementParamType, "element"),
          Param.new(InterfaceBindHandlerType, "func"),
        ]),
        interface_set_response: Func.new(
          Type.void(),
          "webui_interface_set_response",
          [
            Param.new(Type.size_t(), "window"),
            Param.new(Type.size_t(), "event_number"),
            Param.new(Type.string(["const"]), "response"),
          ]
        ),
        interface_is_app_running: Func.new(
          Type.bool(),
          "webui_interface_is_app_running",
          []
        ),
        interface_get_window_id: Func.new(
          Type.size_t(),
          "webui_interface_get_window_id",
          [Param.new(Type.size_t(), "window")]
        ),
        interface_get_string_at: Func.new(
          Type.string(["const"]),
          "webui_interface_get_string_at",
          [
            Param.new(Type.size_t(), "window"),
            Param.new(Type.size_t(), "event_number"),
            Param.new(Type.size_t(), "index"),
          ]
        ),
        interface_get_int_at: Func.new(
          Type.simple("long long int"),
          "webui_interface_get_int_at",
          [
            Param.new(Type.size_t(), "window"),
            Param.new(Type.size_t(), "event_number"),
            Param.new(Type.size_t(), "index"),
          ]
        ),
        interface_get_float_at: Func.new(
          Type.simple("double"),
          "webui_interface_get_float_at",
          [
            Param.new(Type.size_t(), "window"),
            Param.new(Type.size_t(), "event_number"),
            Param.new(Type.size_t(), "index"),
          ]
        ),
        interface_get_bool_at: Func.new(
          Type.bool(),
          "webui_interface_get_bool_at",
          [
            Param.new(Type.size_t(), "window"),
            Param.new(Type.size_t(), "event_number"),
            Param.new(Type.size_t(), "index"),
          ]
        ),
        interface_get_size_at: Func.new(
          Type.size_t(),
          "webui_interface_get_size_at",
          [
            Param.new(Type.size_t(), "window"),
            Param.new(Type.size_t(), "event_number"),
            Param.new(Type.size_t(), "index"),
          ]
        ),
        interface_show_client: Func.new(
          Type.bool(),
          "webui_interface_show_client",
          [
            Param.new(Type.size_t(), "window"),
            Param.new(Type.size_t(), "event_number"),
            Param.new(Type.string(["const"]), "content"),
          ]
        ),
        interface_close_client: Func.new(
          Type.void(),
          "webui_interface_close_client",
          [
            Param.new(Type.size_t(), "window"),
            Param.new(Type.size_t(), "event_number"),
          ]
        ),
        interface_send_raw_client: Func.new(
          Type.void(),
          "webui_interface_send_raw_client",
          [
            Param.new(Type.size_t(), "window"),
            Param.new(Type.size_t(), "event_number"),
            Param.new(Type.string(["const"]), "function"),
            Param.new(Type.voidPointer(["const"]), "raw"),
            Param.new(Type.size_t(), "size"),
          ]
        ),
        interface_navigate_client: Func.new(
          Type.void(),
          "webui_interface_navigate_client",
          [
            Param.new(Type.size_t(), "window"),
            Param.new(Type.size_t(), "event_number"),
            Param.new(Type.string(["const"]), "url"),
          ]
        ),
        interface_run_client: Func.new(
          Type.void(),
          "webui_interface_run_client",
          [
            Param.new(Type.size_t(), "window"),
            Param.new(Type.size_t(), "event_number"),
            Param.new(Type.string(["const"]), "script"),
          ]
        ),
        interface_script_client: Func.new(
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
        ),
      },
    },
  ],
  internals: {
    tcScript: Func.new(
      Type.string(),
      "tc_webui_script",
      [Param.new(Type.size_t(), "win"), Param.new(Type.string(), "js")],
      ({ params: { win, js } }) => {
        const response = Array.new(Type.char(), 64, "response");

        return [
          response.declare(),
          script.call(win, js, 0, response, 64),
          Func.return(response),
        ];
      }
    ),
  },
});
