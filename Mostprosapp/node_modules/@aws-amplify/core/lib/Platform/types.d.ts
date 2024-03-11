export declare enum Framework {
    WebUnknown = "0",
    React = "1",
    NextJs = "2",
    Angular = "3",
    VueJs = "4",
    Nuxt = "5",
    Svelte = "6",
    ServerSideUnknown = "100",
    ReactSSR = "101",
    NextJsSSR = "102",
    AngularSSR = "103",
    VueJsSSR = "104",
    NuxtSSR = "105",
    SvelteSSR = "106",
    ReactNative = "201",
    Expo = "202"
}
export declare enum Category {
    API = "api",
    Auth = "auth",
    Analytics = "analytics",
    DataStore = "datastore",
    Geo = "geo",
    InAppMessaging = "inappmessaging",
    Interactions = "interactions",
    Predictions = "predictions",
    PubSub = "pubsub",
    PushNotification = "pushnotification",
    Storage = "storage"
}
export declare enum AnalyticsAction {
    Record = "1",
    UpdateEndpoint = "2"
}
export declare enum ApiAction {
    GraphQl = "1",
    Get = "2",
    Post = "3",
    Put = "4",
    Patch = "5",
    Del = "6",
    Head = "7"
}
export declare enum AuthAction {
    FederatedSignIn = "30"
}
export declare enum DataStoreAction {
    Subscribe = "1",
    GraphQl = "2"
}
export declare enum GeoAction {
    None = "0"
}
export declare enum InAppMessagingAction {
    None = "0"
}
export declare enum InteractionsAction {
    None = "0"
}
export declare enum PredictionsAction {
    Convert = "1",
    Identify = "2",
    Interpret = "3"
}
export declare enum PubSubAction {
    Subscribe = "1"
}
export declare enum PushNotificationAction {
    None = "0"
}
export declare enum StorageAction {
    Put = "1",
    Get = "2",
    List = "3",
    Copy = "4",
    Remove = "5",
    GetProperties = "6"
}
type ActionMap = {
    [Category.Auth]: AuthAction;
    [Category.API]: ApiAction;
    [Category.Analytics]: AnalyticsAction;
    [Category.DataStore]: DataStoreAction;
    [Category.Geo]: GeoAction;
    [Category.InAppMessaging]: InAppMessagingAction;
    [Category.Interactions]: InteractionsAction;
    [Category.Predictions]: PredictionsAction;
    [Category.PubSub]: PubSubAction;
    [Category.PushNotification]: PushNotificationAction;
    [Category.Storage]: StorageAction;
};
type UserAgentDetailsWithCategory<T extends Category> = CustomUserAgentDetailsBase & {
    category: T;
    action: T extends keyof ActionMap ? ActionMap[T] : never;
};
type CustomUserAgentDetailsBase = {
    framework?: Framework;
};
export type CustomUserAgentDetails = (CustomUserAgentDetailsBase & {
    category?: never;
    action?: never;
}) | UserAgentDetailsWithCategory<Category.API> | UserAgentDetailsWithCategory<Category.Auth> | UserAgentDetailsWithCategory<Category.Analytics> | UserAgentDetailsWithCategory<Category.DataStore> | UserAgentDetailsWithCategory<Category.Geo> | UserAgentDetailsWithCategory<Category.Interactions> | UserAgentDetailsWithCategory<Category.InAppMessaging> | UserAgentDetailsWithCategory<Category.Predictions> | UserAgentDetailsWithCategory<Category.PubSub> | UserAgentDetailsWithCategory<Category.PushNotification> | UserAgentDetailsWithCategory<Category.Storage>;
export {};
