# Backend Server Instructions

1. In the backend directory, run `cp .env.example .env` and change the `MONGODB_URI` to your specific connection URI.

2. `cd` into the `backend` directory and run `go mod tidy` to install dependencies.

3. Run `go run cmd/server/main.go` to run the backend server on localhost:8000.

4. There are example `curl` requests in the `singletests` folder that can be used to test routes. There is an example mongo dimp in the `testdata` folder.

### Project Structure

```
.
├── README.md
├── backend
│   ├── app
│   │   └── app.go
│   ├── cmd
│   │   └── main.go
│   ├── controllers
│   │   ├── cs_class_controller.go
│   │   ├── post_controller.go
│   │   ├── ta_queue_controller.go
│   │   ├── ticket_controller.go
│   │   └── user_controller.go
│   ├── db
│   │   └── connect_to_mongo.go
│   ├── go.mod
│   ├── go.sum
│   ├── middleware
│   ├── models
│   │   ├── cs_class_model.go
│   │   ├── post_model.go
│   │   ├── ta_queue_model.go
│   │   ├── ticket_model.go
│   │   └── user_model.go
│   ├── routes
│   │   ├── cs_class_router.go
│   │   ├── post_router.go
│   │   ├── ta_queue_router.go
│   │   ├── ticket_router.go
│   │   └── user_router.go
│   ├── tests
│   │   ├── python
│   │   │   └── requirements.txt
│   │   ├── singletests
│   │   │   ├── classes
│   │   │   │   ├── create_cs_class.sh
│   │   │   │   ├── create_cs_class_2.sh
│   │   │   │   ├── create_cs_class_3.sh
│   │   │   │   ├── create_ta_queue.sh
│   │   │   │   ├── create_ta_queue_2.sh
│   │   │   │   ├── get_all_active.sh
│   │   │   │   ├── get_cs_class.sh
│   │   │   │   ├── set_active_1.sh
│   │   │   │   └── set_active_2.sh
│   │   │   ├── posts
│   │   │   │   ├── create_comment.sh
│   │   │   │   ├── create_comment_2.sh
│   │   │   │   ├── create_post.sh
│   │   │   │   ├── create_post_2.sh
│   │   │   │   ├── create_post_3.sh
│   │   │   │   └── get_all_posts.sh
│   │   │   ├── taqueue
│   │   │   │   ├── active_tickets.sh
│   │   │   │   ├── add_ta.sh
│   │   │   │   ├── get_taqueue.sh
│   │   │   │   └── remove_ta.sh
│   │   │   ├── tickets
│   │   │   │   ├── create_ticket.sh
│   │   │   │   ├── get_ticket.sh
│   │   │   │   ├── get_user_tickets.sh
│   │   │   │   └── resolve_ticket.sh
│   │   │   └── user
│   │   │       ├── create_user.sh
│   │   │       ├── create_user_2.sh
│   │   │       ├── create_user_3.sh
│   │   │       ├── get_user.sh
│   │   │       ├── simple_test.sh
│   │   │       ├── update_description.sh
│   │   │       ├── update_profile_pic.sh
│   │   │       ├── update_roll_prof.sh
│   │   │       ├── update_roll_student.sh
│   │   │       └── update_roll_ta.sh
│   │   └── suites
│   │       ├── cs_class_test.go
│   │       ├── post_test.go
│   │       ├── ta_queue_test.go
│   │       ├── ticket_test.go
│   │       └── user_test.go
│   └── utils
│       └── validate.go
├── frontend
│   ├── README.md
│   ├── eslint.config.js
│   ├── index.html
│   ├── package.json
│   ├── public
│   │   └── vite.svg
│   ├── src
│   │   ├── App.css
│   │   ├── App.tsx
│   │   ├── assets
│   │   │   └── react.svg
│   │   ├── index.css
│   │   ├── main.tsx
│   │   └── vite-env.d.ts
│   ├── tsconfig.app.json
│   ├── tsconfig.json
│   ├── tsconfig.node.json
│   └── vite.config.ts
└── testdata
    └── TAHours
        ├── cs_classes.bson
        ├── cs_classes.metadata.json
        ├── posts.bson
        ├── posts.metadata.json
        ├── ta_queues.bson
        ├── ta_queues.metadata.json
        ├── tickets.bson
        ├── tickets.metadata.json
        ├── users.bson
        └── users.metadata.json

24 directories, 86 files
```
