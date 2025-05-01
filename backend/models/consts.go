package models

const(
	NEW_TA_QUEUE_EVENT = "new_ta_queue"
	TA_JOIN_QUEUE_EVENT = "ta_join_queue"
	TA_LEAVE_QUEUE_EVENT = "ta_leave_queue"
	TICKET_CREATE_EVVENT = "ticket_create"
	TICKET_RESOLVE_EVENT = "ticket_resolve"

	USER_CHANGE_DESCRIPTION_EVENT = "user_change_description"
	USER_ROLE_CHANGE_EVENT = "user_role_change"

	DELETE_POST_EVENT = "deleteMessage"
	NEW_POST_EVENT = "newMessage"
	NEW_COMMENT_EVENT = "newComment"

	USER_ROLE_PARAM = "UserRole"
	USER_ID_POST_PARAM = "UserID"

	WEBSOCKET_ID_PARAM = "userWSId"
	WEBSOCKET_THREAD_PARAM = "threadAccess"
)
