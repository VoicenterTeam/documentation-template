import { io, Socket as Socket_2 } from 'socket.io-client'
import StorageLogger, { LoggerDataPartial, LoggerOptions } from '@voicenter-team/socketio-storage-logger'

export declare type ActiveRoomListener = (event: number | undefined) => void

export declare type addRoomListener = (value: string) => void

declare type AllDialersStatusEvent = {
    dialers: Array<Dialer>;
    /**
     * 0 - Connection was establishing successfully.
     */
    errorCode?: number;
    /**
     * “Ok” - Connection was establishing successfully.
     */
    errorDesc?: string;
    /**
     * Server time at the moment of the event
     */
    serverTime: number;
    /**
     * Difference in time between server and client
     */
    serverTimeOffset: number;
};

export declare type AllDialersStatusEventSDK = EventTypeData<EventsEnum.ALL_DIALER_STATUS>

declare type AllExtensionStatusEvent = {
    /**
     * 0 - Connection was establishing successfully.
     */
    errorCode?: number;
    /**
     * “Ok” - Connection was establishing successfully.
     */
    errorDesc?: string;
    extensions: Array<Extension>;
    /**
     * Server time at the moment of the event
     */
    servertime: number;
    /**
     * Difference in time between server and client
     */
    servertimeoffset: number;
};

declare interface AllExtensionStatusEventExtended extends Omit<AllExtensionStatusEvent, 'extensions'> {
    extensions: Array<ExtensionSDK>
}

export declare type AllExtensionStatusEventSDK = EventTypeData<EventsEnum.ALL_EXTENSION_STATUS>

declare type AllUsersStatusEvent = {
    users: Array<User>;
    /**
     * 0 - Connection was establishing successfully.
     */
    errorCode?: number;
    /**
     * “Ok” - Connection was establishing successfully.
     */
    errorDesc?: string;
    /**
     * Server time at the moment of the event
     */
    serverTime: number;
    /**
     * Difference in time between server and client
     */
    serverTimeOffset: number;
};

export declare type AllUsersStatusEventSDK = EventTypeData<EventsEnum.ALL_USERS_STATUS>

declare class AuthClass {
    private readonly eventsSdkClass
    constructor(eventsSdkClass: EventsSdkClass);
    private delay
    lastLoginTimestamp: number | undefined
    token: string | undefined
    private storageKey
    login(options: EventsSdkOptions): Promise<void>;
    updateLastLoginTimestamp(): void;
    private checkLoginStatus
    private userLoginFunction
    private onLoginResponse
    handleTokenExpiry(): void;
    private externalLogin
    private getSettings
    private refreshToken
    private normalizeLoginType
}

export declare type CallAddingProgressListener = (callId: string | undefined) => void

export declare enum CallStatusEnum {
    RINGING = 'Ringing',
    TALKING = 'Talking',
    DIALING = 'Dialing',
    HOLD = 'Hold',
}

export declare enum CallTypeEnum {
    INCOMING = 'Incoming',
    OUTGOING = 'Outgoing',
}

export declare type changeActiveCallsListener = (event: { [key: string]: string }) => void

export declare type changeActiveInputMediaDeviceListener = (event: string) => void

export declare type changeActiveOutputMediaDeviceListener = (event: string) => void

export declare type changeCallStatusListener = (event: { [key: string]: number }) => void

export declare type changeIsDNDListener = (value: boolean) => void

export declare type changeIsMutedListener = (value: boolean) => void

export declare type changeMuteWhenJoinListener = (value: boolean) => void

declare interface CurrentCallEnded extends CurrentCallUTCExtended {
    duration: number
}

declare interface CurrentCallUTCExtended extends ExtensionCall {
    callStarted_UTC: number
    callStarted_UTC_CLIENT: number
    callAnswered_UTC: number
    callAnswered_UTC_CLIENT: number
}

declare type CustomData = {
    /**
     * Is do not call me
     */
    IsDoNotCallMe?: string;
    /**
     * Do not call me status
     */
    DoNotCallMeStatus?: string;
    /**
     * Do not call me token name
     */
    DoNotCallMeTokenName?: string;
    DoNotCallMeStatusCode?: DoNotCallMeStatusCodeEnum;
    /**
     * Do not call me transaction id
     */
    DoNotCallMetransactionId?: string;
};

export declare type CustomDataSDK = CustomData

declare type Dialer = {
    /**
     * Code
     */
    code: string;
    /**
     * Name
     */
    name: string;
    type: DialerTypeEnum;
    /**
     * Calls
     */
    calls: string;
    /**
     * Type id
     */
    typeID: number;
    /**
     * Campaign id
     */
    campaignID: number;
    /**
     * Statistics
     */
    statistics: string;
};

declare type DialerEvent = {
    data: Dialer;
    /**
     * callerID
     */
    callerID?: string;
    /**
     * Event name (dialer)
     */
    eventName: string;
    /**
     * dialStatus
     */
    dialStatus?: string;
    /**
     * ivrUniqueId
     */
    ivrUniqueId?: string;
    /**
     * TelephonyServerTime
     */
    telephonyServerTime?: number;
};

export declare type DialerEventSDK = EventTypeData<EventsEnum.DIALER_EVENT>

export declare type DialerSDK = Dialer

export declare enum DialerTypeEnum {
    AUTOMATIC = 'Automatic',
    IVR = 'IVR',
}

export declare enum DirectionEnum {
    INCOMINC = 'Incoming',
    OUTGOING = 'Outgoing',
    SPY = 'Spy',
    CLICK2CALL = 'Click2Call',
}

export declare enum DoNotCallMeStatusCodeEnum {
    RESPONSE_FROM_API_VALID = 'RESPONSE_FROM_API_VALID',
    RESPONSE_FROM_API_INVALID = 'RESPONSE_FROM_API_INVALID',
}

declare type Error_2 = {
    message?: string
};

export declare type ErrorSDK = Error_2

/**
 * This type defines a map where each key is an event name, and the value is an array of callback functions associated with that event.
 * This structure is used to manage event listeners for different events
 */
export declare type EventCallbackListenersMap = {
    [K in EventTypeNames]: Array<EventSpecificCallback<K>>
}

/**
 * Defines a registry of callback functions for each event type.
 * Each key is an event type name, and the value is a function that takes the specific event data type as an argument.
 * This registry is used to manage and invoke event-specific callbacks.
 */
export declare type EventCallbackRegistry = {
    [K in EventTypeNames]: (data: EventDataMap[K]) => void
}

export declare type EventData = EventDataMapExtended[EventsEnum]

/**
 * Mapping of event names to their respective data structures.
 * The data structures that socket io will send us
 */
export declare interface EventDataMap {
    [EventsEnum.ALL_EXTENSION_STATUS]: AllExtensionStatusEvent
    [EventsEnum.ALL_DIALER_STATUS]: AllDialersStatusEvent
    [EventsEnum.ALL_USERS_STATUS]: AllUsersStatusEvent
    [EventsEnum.QUEUE_EVENT]: QueueEvent
    [EventsEnum.EXTENSION_EVENT]: ExtensionEvent
    [EventsEnum.DIALER_EVENT]: DialerEvent
    [EventsEnum.LOGIN_SUCCESS]: LoginSuccessEvent
    [EventsEnum.LOGIN_STATUS]: LoginStatusEvent
    [EventsEnum.KEEP_ALIVE_RESPONSE]: KeepAliveResponseEvent
    [EventsEnum.ONLINE_STATUS_EVENT]: OnlineStatusEvent
    [EventsEnum.EXTENSIONS_UPDATED]: ExtensionsUpdated
}

/**
 * Mapping of event names to their respective data structures.
 * The data structures that we will send to the end user, here we can modify the type of events data
 */
export declare interface EventDataMapExtended extends EventDataMap {
    [EventsEnum.EXTENSION_EVENT]: ExtensionEventExtended
    [EventsEnum.ALL_EXTENSION_STATUS]: AllExtensionStatusEventExtended
    [EventsEnum.QUEUE_EVENT]: QueueEventUTCExtended
}

declare class EventEmitterClass {
    private readonly eventsSdkClass
    private listeners
    private allListeners
    constructor(eventsSdkClass: EventsSdkClass);
    on(event: unknown, callback: unknown): void;
    off<T extends EventTypeNames>(event: T, callback: EventSpecificCallback<T>): void;
    off(event: '*', callback: (data: GenericEventWrapper) => void): void;
    emit<T extends EventTypeNames>(event: T, data: EventTypeData<T>): void;
}

export declare enum EventsEnum {
    ALL_DIALER_STATUS = 'AllDialersStatus',
    ALL_EXTENSION_STATUS = 'AllExtensionsStatus',
    ALL_USERS_STATUS = 'AllUsersStatus',
    CONNECT = 'connect',
    DISCONNECT = 'disconnect',
    CONNECT_ERROR_EVENT = 'connect_error',
    EXTENSION_EVENT = 'ExtensionEvent',
    KEEP_ALIVE = 'keepalive',
    KEEP_ALIVE_RESPONSE = 'keepaliveResponse',
    LOGIN_STATUS = 'loginStatus',
    LOGIN_SUCCESS = 'loginSuccess',
    QUEUE_EVENT = 'QueueEvent',
    ONLINE_STATUS_EVENT = 'onlineStatusEvent',
    DIALER_EVENT = 'DialerEvent',
    EXTENSIONS_UPDATED = 'ExtensionsUpdated',
}

/**
 * This is a generic type for callback functions used in event handling.
 * It takes a generic event name and defines a callback function that receives wrapped socket event data for that specific event.
 */
export declare type EventSpecificCallback<T extends EventTypeNames> = (data: WrappedSocketEvent<T>) => void

declare class EventsSdkClass {
    readonly options: EventsSdkOptions
    servers: Server[]
    URLList: string[]
    server: Server | undefined
    URL: string | undefined
    socket: SocketTyped | undefined
    private mainServer
    private alreadyAttemptedOtherServers
    authClass: AuthClass
    socketIoClass: SocketIoClass
    loggerClass: LoggerClass
    eventEmitterClass: EventEmitterClass
    constructor(options: EventsSdkOptions);
    on<T extends EventTypeNames>(event: T, callback: EventSpecificCallback<T>): void;
    on(event: '*', callback: (data: GenericEventWrapper) => void): void;
    emit<T extends ServerEmitEventTypeNames>(event: T, ...args: Parameters<ServerEmitEventCallbackRegistry[T]>): void;
    connect(serverParameter: ServerParameter): void;
    disconnect(): void;
    clearKeepAliveInterval(): void;
    private findMainServer
    private findNextServer
    init(): Promise<boolean>;
}
export default EventsSdkClass

export declare interface EventsSdkOptions {
    isNewStack?: boolean;
    servers?: Server[];
    loginUrl?: string;
    getSettingsUrl?: string;
    refreshTokenUrl: string;
    refreshToken?: string;
    token: string;
    tokenExpiry?: Date;
    loginType: LoginType;
    forceNew?: boolean;
    reconnectionDelay: number;
    reconnectionDelayMax?: number;
    maxReconnectAttempts: number;
    timeout?: number;
    keepAliveTimeout: number;
    idleInterval?: number;
    protocol: string;
    transports?: string[];
    upgrade?: boolean;
    serverFetchStrategy?: string;
    serverType?: number;
    useLogger?: boolean;
    loggerSocketConnection?: Socket_2;
    loggerServer: string;
    loggerConfig: LoggerOptions;
    loggerConnectOptions?: LoggerConnectOptions;
    email: string;
    password: string;
    username: string;
    storageLoggerInstance: StorageLogger | undefined;
}

/**
 * The structure of event data for a specific event type.
 */
export declare type EventTypeData<T extends EventsEnum> = EventDataMapExtended[T]

/**
 * Represents the set of all possible event type names as keys from the EventDataMap.
 * This type is used to define event listeners and handlers.
 */
export declare type EventTypeNames = keyof EventDataMap

/**
 * Represents Event Types in Enum
 */
export declare enum EventTypesEnum {
    ALL_DIALERS_STATUS = 'AllDialersStatus',
    ALL_EXTENSION_STATUS = 'AllExtensionsStatus',
    CLOSE = 'closeme',
    CONNECT = 'connect',
    CONNECT_ERROR = 'connect_error',
    CONNECT_TIMEOUT = 'connect_timeout',
    DISCONNECT = 'disconnect',
    DIALER_EVENT = 'DialerEvent',
    DIALERS_UPDATED = 'DialersUpdated',
    ERROR = 'error',
    EXTENSION_EVENT = 'ExtensionEvent',
    EXTENSION_UPDATED = 'ExtensionsUpdated',
    KEEP_ALIVE = 'keepalive',
    KEEP_ALIVE_RESPONSE = 'keepaliveResponse',
    LOGIN = 'login',
    LOGIN_ACCOUNT = 'loginAccount',
    LOGIN_CODE = 'loginUserCode',
    LOGIN_RESPONSE = 'loginResponse',
    LOGIN_STATUS = 'loginStatus',
    LOGIN_USER = 'loginUser',
    PONG = 'pong',
    QUEUE_EVENT = 'QueueEvent',
    QUEUES_UPDATED = 'QueuesUpdated',
    RECONNECT = 'reconnect',
    RECONNECT_ATTEMPT = 'reconnect_attempt',
    RECONNECT_ERROR = 'reconnect_error',
    RECONNECT_FAILED = 'reconnect_failed',
    RECONNECTING = 'reconnecting',
    RESYNC = 'resync'
}

/**
 * This type represents a mapping of listener event names to their corresponding wrapped socket event data structures.
 * Each key is an event name, and the value is the wrapped socket event data for that event
 */
export declare type EventWrappedSocketDataMap = {
    [K in EventTypeNames]: WrappedSocketEvent<K>
}

declare type Extension = {
    calls: Array<ExtensionCall>;
    /**
     * Number
     */
    number: number;
    /**
     * User id
     */
    userID: number;
    summery: Summery;
    /**
     * User name
     */
    userName: string;
    /**
     * Account id
     */
    accountID: number;
    /**
     * Exten user
     */
    extenUser: string;
    /**
     * Peer status
     */
    peerStatus: string;
    currentCall?: ExtensionCall;
    /**
     * Online user id
     */
    onlineUserID: number;
    /**
     * Top account id
     */
    topAccountID: number;
    /**
     * Representative
     */
    representative: number;
    /**
     * Last call event epoch
     */
    lastCallEventEpoch: number;
    /**
     * Last hangup call epoch
     */
    lastHangupCallEpoch: number;
    /**
     * Representative status
     */
    representativeStatus: number;
    /**
     * Representative updated
     */
    representativeUpdated: number;
    /**
     * Last answered call event epoch
     */
    lastAnsweredCallEventEpoch: number;
};

declare type ExtensionCall = {
    /**
     * Ip
     */
    ip: string;
    /**
     * Did
     */
    did: string;
    /**
     * Ivr id
     */
    ivrid: string;
    /**
     * Channel
     */
    channel: string;
    /**
     * Is spyed
     */
    isSpyed?: boolean;
    /**
     * Queue id
     */
    queueID?: number;
    /**
     * Answered
     */
    answered: number;
    callType?: CallTypeEnum;
    /**
     * Channel 2
     */
    'channel 2': string;
    direction: DirectionEnum;
    recording: Recording;
    /**
     * Caller name
     */
    callername: string;
    callstatus: CallStatusEnum;
    customdata: CustomData;
    /**
     * Is internal
     */
    isInternal: boolean;
    /**
     * Is opensips
     */
    isOpensips: boolean;
    /**
     * Blc server id
     */
    blcServerID: number;
    /**
     * Blc server id
     */
    blcServerId?: number;
    /**
     * Call started
     */
    callStarted: number;
    /**
     * Caller phone
     */
    callerphone: string;
    /**
     * Call answered
     */
    callAnswered: number;
    /**
     * Original caller id
     */
    originalCallerID?: string;
    /**
     * Actual dialed number
     */
    actualDialedNumber?: number;
    /**
     * Original caller name
     */
    originalCallerName?: string;
    /**
     * Outgoing caller name
     */
    outgoingcallername?: string;
    /**
     * Outgoing caller phone
     */
    outgoingcallerphone?: string;
    /**
     * Related ivr unique ids
     */
    relatedIvrUniqueIDs?: Array<string>;
    /**
     * Call duration interval
     */
    calldurationinterval: number;
};

export declare type ExtensionCallSDK = CurrentCallUTCExtended | CurrentCallEnded

declare interface ExtensionCallsEnded extends ExtensionUTCExtended {
    currentCall?: CurrentCallEnded
    calls?: Array<CurrentCallUTCExtended>
}

declare interface ExtensionCallsUTCExtended extends ExtensionUTCExtended {
    currentCall?: CurrentCallUTCExtended
    calls?: Array<CurrentCallUTCExtended>
}

declare type ExtensionEvent = {
    data: Extension;
    cause?: ExtensionHangupCauseEnum;
    reason: ExtensionEventReasonEnum;
    /**
     * Caller id
     */
    callerID?: string;
    /**
     * Event name (extension)
     */
    eventName: string;
    /**
     * Dial status
     */
    dialStatus?: string;
    /**
     * Server time
     */
    servertime: number;
    /**
     * Ivr unique id
     */
    ivrUniqueId?: string;
    /**
     * Server time offset
     */
    servertimeoffset: number;
    /**
     * Telephony server time
     */
    telephonyServerTime?: number;
};

declare interface ExtensionEventEnded extends Omit<ExtensionEvent, 'reason' | 'data'> {
    reason: ExtensionEventReasonEnum.HANGUP
    data: ExtensionCallsEnded
}

declare type ExtensionEventExtended = ExtensionEventUTCExtended | ExtensionEventEnded

export declare enum ExtensionEventReasonEnum {
    NEWCALL = 'NEWCALL',
    ANSWER = 'ANSWER',
    HOLD = 'HOLD',
    UNHOLD = 'UNHOLD',
    HANGUP = 'HANGUP',
    USER_STATUS_UPDATE = 'userStatusUpdate',
}

export declare type ExtensionEventSDK = EventTypeData<EventsEnum.EXTENSION_EVENT>

declare interface ExtensionEventUTCExtended extends Omit<ExtensionEvent, 'reason' | 'data'> {
    reason: Exclude<ExtensionEventReasonEnum, ExtensionEventReasonEnum.HANGUP>
    data: ExtensionCallsUTCExtended
}

export declare enum ExtensionHangupCauseEnum {
    NORMAL_HANGUP = 'Normal hangup',
    USER_BUSY = 'User busy',
    CALL_REJECTED = 'Call Rejected',
    UNALLOCATED_NUMBER = 'Unallocated (unassigned) number',
    UNKNOWN = 'Unknown',
    NO_USER_RESPONDING = 'No user responding',
    USER_ALERTING = 'User alerting, no answer',
    ANSWERED_ELSEWHERE = 'Answered elsewhere',
}

export declare type ExtensionSDK = ExtensionCallsUTCExtended | ExtensionCallsEnded

declare type ExtensionsUpdated = string;

export declare type ExtensionsUpdatedSDK = EventTypeData<EventsEnum.EXTENSIONS_UPDATED>

declare interface ExtensionUTCExtended extends Extension {
    lastAnsweredCallEventEpoch_UTC: number
    lastAnsweredCallEventEpoch_UTC_CLIENT: number
    lastCallEventEpoch_UTC: number
    lastCallEventEpoch_UTC_CLIENT: number
    lastHangupCallEpoch_UTC: number
    lastHangupCallEpoch_UTC_CLIENT: number
    representativeUpdated_UTC: number
    representativeUpdated_UTC_CLIENT: number
}

export declare interface ExternalLoginNewStackResponseData {
    AccessToken: string,
    RefreshToken: string
}

export declare interface ExternalLoginOldStackResponseData {
    Socket: Socket,
}

export declare interface ExternalLoginRequestBody {
    identityType: LoginType,
    username?: string,
    password?: string,
    token?: string
}

export declare interface ExternalLoginResponse<T> {
    StatusCode: number,
    Status: string,
    Data: T
}

/**
 * A generic type that represents the structure of any event data wrapped in a socket event format.
 * This type is used in the handling of all event types, providing a consistent structure for event data processing.
 */
export declare type GenericEventWrapper = EventWrappedSocketDataMap[EventTypeNames]

declare type KeepAliveResponseEvent = {
    /**
     * Is ok
     */
    isOk: boolean;
    /**
     * 0 - Connection was establishing successfully.
     */
    errorCode?: number;
    /**
     * “Ok” - Connection was establishing successfully.
     */
    errorDesc?: string;
    /**
     * Server time at the moment of the event
     */
    serverTime: number;
    /**
     * Difference in time between server and client
     */
    serverTimeOffset: number;
};

export declare type KeepAliveResponseEventSDK = EventTypeData<EventsEnum.KEEP_ALIVE_RESPONSE>

export declare type ListenerCallbackFnType<T extends ListenersKeyType> = OpenSIPSEventMap[T]

export declare type ListenersCallbackFnType = OpenSIPSEventMap[ListenersKeyType]

export declare type ListenersKeyType = keyof OpenSIPSEventMap

declare class LoggerClass {
    private readonly eventsSdkClass
    constructor(eventsSdkClass: EventsSdkClass);
    private storageLogger
    init(): void;
    log(data: LoggerDataPartial): void;
    sdkInitializedLog(options: EventsSdkOptions): void;
}

export declare interface LoggerConfig {
    logToConsole?: boolean;
    overloadGlobalConsole?: boolean;
    namespace?: string;
    socketEmitInterval?: number;
}

export declare interface LoggerConnectOptions {
    reconnection?: boolean;
    reconnectionDelay?: number;
    reconnectionAttempts?: number;
    perMessageDeflate?: {
        threshold: number;
    };
    upgrade?: boolean;
    transports?: string[];
    debug?: boolean;
}

export declare interface LoginSessionData extends Settings, ExternalLoginNewStackResponseData, Socket {}

export declare interface LoginSessionPayload {
    token: string,
    email: string,
    password: string
}

declare type LoginStatusEvent = {
    queues: Array<Queue>;
    /**
     * 0 - Connection was establishing successfully.
     */
    errorCode?: number;
    /**
     * “Ok” - Connection was establishing successfully.
     */
    errorDesc?: string;
    /**
     * Server time at the moment of the event
     */
    serverTime: number;
    /**
     * Difference in time between server and client
     */
    serverTimeOffset: number;
};

export declare type LoginStatusEventSDK = EventTypeData<EventsEnum.LOGIN_STATUS>

declare type LoginSuccessEvent = {
    /**
     * 0 - Connection was establishing successfully.
     */
    errorCode?: number;
    /**
     * “Ok” - Connection was establishing successfully.
     */
    errorDesc?: string;
    /**
     * Server time at the moment of the event
     */
    serverTime: number;
    /**
     * Difference in time between server and client
     */
    serverTimeOffset: number;
};

export declare type LoginSuccessEventSDK = EventTypeData<EventsEnum.LOGIN_SUCCESS>

declare enum LoginType {
    USER = 'User',
    TOKEN = 'Token'
}

declare type OnlineStatusEvent = {
    /**
     * if we do reconnect
     */
    doReconnect: boolean;
    /**
     * attemptToConnect
     */
    attemptToConnect?: string;
    /**
     * Is client side connected to socket server
     */
    isSocketConnected: boolean;
};

export declare type OnlineStatusEventSDK = EventTypeData<EventsEnum.ONLINE_STATUS_EVENT>

export declare interface OpenSIPSEventMap {
    ready: readyListener
    changeActiveCalls: changeActiveCallsListener
    callConfirmed: TestEventListener
    currentActiveRoomChanged: ActiveRoomListener
    callAddingInProgressChanged: CallAddingProgressListener
    roomDeleted: RoomDeletedListener
    changeActiveInputMediaDevice: changeActiveInputMediaDeviceListener
    changeActiveOutputMediaDevice: changeActiveOutputMediaDeviceListener
    changeMuteWhenJoin: changeMuteWhenJoinListener
    changeIsDND: changeIsDNDListener
    changeIsMuted: changeIsMutedListener
    addRoom: addRoomListener
    updateRoom: updateRoomListener
    removeRoom: removeRoomListener
    changeCallStatus: changeCallStatusListener
}

declare type Queue = {
    Calls: Array<QueueCall>;
    /**
     * User id
     */
    UserId?: number;
    /**
     * Queue id
     */
    QueueID: number;
    /**
     * Queue name
     */
    QueueName: string;
    /**
     * Answered agent
     */
    AnsweredAgent?: string;
    /**
     * Distributor id
     */
    DistributorID?: number;
    /**
     * Is distributed queue
     */
    IsDistributedQueue?: boolean;
};

declare type QueueCall = {
    /**
     * Ivr id
     */
    ivrid: string;
    /**
     * Caller id
     */
    CallerId: string;
    /**
     * Caller name
     */
    CallerNme: string;
    /**
     * Ivr unique id
     */
    IvrUniqueID: string;
    /**
     * Join timestamp
     */
    JoinTimeStamp: number;
    /**
     * Is distributed queue
     */
    isDistributedQueue?: boolean;
    /**
     * Call duration interval
     */
    calldurationinterval: number;
};

export declare interface QueueCallSDK extends QueueCall {
    JoinTimeStamp_UTC: number
    JoinTimeStamp_UTC_CLIENT: number
}

declare type QueueEvent = {
    data: Queue;
    reason: QueueEventReasonEnum;
    /**
     * Event name (queue)
     */
    eventName: string;
    /**
     * Server time
     */
    servertime: number;
    /**
     * Ivr unique id
     */
    ivrUniqueId: string;
    /**
     * Server time offset
     */
    servertimeoffset: number;
    /**
     * Telephony server time
     */
    telephonyServerTime: number;
};

export declare enum QueueEventReasonEnum {
    ANSWER = 'ANSWER',
    ABANDONED = 'ABANDONED',
    EXIT = 'EXIT',
    JOIN = 'JOIN',
}

export declare type QueueEventSDK = EventTypeData<EventsEnum.QUEUE_EVENT>

declare interface QueueEventUTCExtended extends Omit<QueueEvent, 'data'> {
    data: QueueSDK
}

export declare interface QueueSDK extends Omit<Queue, 'Calls'> {
    Calls?: Array<QueueCallSDK>
}

export declare type readyListener = (value: boolean) => void

declare type Recording = {
    /**
     * Is muted
     */
    IsMuted: number;
    /**
     * Options
     */
    Options: string;
    /**
     * Filename
     */
    Filename: string;
    /**
     * Approximate url
     */
    ApproximateURL: string;
};

export declare type RecordingSDK = Recording

export declare type removeRoomListener = (value: string) => void

declare type Response_2 = {
    body: RecordingSDK
};

export declare type ResponseSDK = Response_2

export declare type RoomDeletedListener = (roomId: number) => void

export declare interface Server {
    Priority: number;
    Domain: string;
    URLID: number;
    Version: string;
}

export declare type ServerEmitEventCallbackRegistry = {
    [K in ServerEmitEventTypeNames]: (data: ServerEmitEventDataMap[K]) => void
}

/**
 * Mapping of event names to their respective data structures.
 * The data structures that we can send to the server
 */
export declare interface ServerEmitEventDataMap {
    [ServerListenerEventsEnum.UPDATE_MONITORED_EXTENSIONS]: UpdateMonitoredExtensionsPayload
    [ServerListenerEventsEnum.KEEP_ALIVE]: string
}

/**
 * Represents the set of all possible event type names as keys from the ServerEmitEventDataMap.
 * This type is used to define event emitters and data.
 */
export declare type ServerEmitEventTypeNames = keyof ServerEmitEventDataMap

export declare enum ServerListenerEventsEnum {
    UPDATE_MONITORED_EXTENSIONS = 'updateMonitoredExtensions',
    KEEP_ALIVE = 'keepAlive'
}

export declare enum ServerParameter {
    MAIN = 'main',
    NEXT = 'next'
}

export declare enum ServerTypesEnum {
    DEFAULT = 1,
    CHROME_EXTENSION = 2
}

export declare interface Settings {
    IdentityCode: string,
    IdentityCodeExpiry: Date,
    PersonID: number,
    PersonType: number,
    ExtensionMonitorID: number,
    MonitorList: Server[]
}

export declare interface Socket {
    Client: string,
    PersonId: number,
    RefreshToken: string,
    RefreshTokenExpiry: Date,
    Token: string,
    TokenExpiry: Date,
    URLList: string[],
    Url: string,
    Version: string
}

declare class SocketIoClass {
    private readonly eventsSdkClass
    constructor(eventsSdkClass: EventsSdkClass);
    io: SocketTyped | undefined
    ioFunction: TypedSocketIo | undefined
    lastEventTimestamp: number
    doReconnect: boolean
    private keepAliveInterval
    private keepReconnectInterval
    private connected
    getSocketIoFunction(Client: string): void;
    initSocketConnection(): void;
    clearKeepAliveInterval(): void;
    initKeepAlive(): void;
    closeAllConnections(): void;
    initSocketEvents(): void;
    private onLoginSuccessEvent
    private onQueueEvent
    private onExtensionEvent
    private onDialerEvent
    private onLoginStatusEvent
    private onAllExtensionStatus
    private onAllDialerStatus
    private onKeepAliveResponse
    private onExtensionsUpdatedEvent
    private onConnect
    private onDisconnect
    private onConnectError
}

export declare type SocketTyped = Socket_2<EventCallbackRegistry, ServerEmitEventCallbackRegistry>

declare type Summery = {
    /**
     * Representative
     */
    representative: string;
};

export declare type SummerySDK = Summery

export declare type TestEventListener = (event: { test: string }) => void

declare type TypedSocketIo = (...args: Parameters<typeof io>) => SocketTyped;

export declare interface UpdateMonitoredExtensionsPayload {
    extensionsString: string
}

export declare type updateRoomListener = (value: string) => void

declare type User = {
    /**
     * User id
     */
    userID: number;
    /**
     * User name
     */
    userName: string;
    /**
     * Account id
     */
    accountID: number;
};

export declare type UserSDK = User

/**
 * The structure of received socket events.
 */
export declare type WrappedSocketEvent<T extends EventsEnum> = {
    name: T
    data: EventDataMapExtended[T]
}

export { }
