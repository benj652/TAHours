export enum SOCKET_URI_CONSTS {
    prod_socket_uri = "ws://137.146.29.181:8000/ws",
    SOCKET_URI = "ws://localhost:8000/ws",
    PROD_SOCKET_URI = "ws://137.146.29.181:8000/ws",
    USER_WS_ID = "userWSId",
    THREAD_ACCESS = "threadAccess",
};
export enum THREAD_EVENTS {
    NEW_MESSAGE = "newMessage",
    DELETE_MESSAGE = "deleteMessage",
    NEW_COMMENT = "newComment",

    NEW_TA_QUEUE_EVENT = "new_ta_queue",
    TA_JOIN_QUEUE_EVENT = "ta_join_queue",
    TA_LEAVE_QUEUE_EVENT = "ta_leave_queue",
    TICKET_CREATE_EVVENT = "ticket_create",
    TICKET_RESOLVE_EVENT = "ticket_resolve",
};
