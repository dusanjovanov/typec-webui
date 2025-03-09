export enum WebUiEventType {
  WEBUI_EVENT_DISCONNECTED = 0,
  WEBUI_EVENT_CONNECTED = 1,
  WEBUI_EVENT_MOUSE_CLICK = 2,
  WEBUI_EVENT_NAVIGATION = 3,
  WEBUI_EVENT_CALLBACK = 4,
}

export const WebUiEventNameMap = {
  [WebUiEventType.WEBUI_EVENT_DISCONNECTED]: "WEBUI_EVENT_DISCONNECTED",
  [WebUiEventType.WEBUI_EVENT_CONNECTED]: "WEBUI_EVENT_CONNECTED",
  [WebUiEventType.WEBUI_EVENT_MOUSE_CLICK]: "WEBUI_EVENT_MOUSE_CLICK",
  [WebUiEventType.WEBUI_EVENT_NAVIGATION]: "WEBUI_EVENT_NAVIGATION",
  [WebUiEventType.WEBUI_EVENT_CALLBACK]: "WEBUI_EVENT_CALLBACK",
};

export type WebUiEvent = {
  window: number;
  event_type: WebUiEventType;
  element: string;
  event_number: number;
  bind_id: number;
  client_id: number;
  connection_id: number;
  cookies: number;
};

export enum WebUiBrowser {
  NoBrowser = 0,
  AnyBrowser = 1,
  Chrome = 2,
  Firefox = 3,
  Edge = 4,
  Safari = 5,
  Chromium = 6,
  Opera = 7,
  Brave = 8,
  Vivaldi = 9,
  Epic = 10,
  Yandex = 11,
  ChromiumBased = 12,
  WebView = 13,
}
