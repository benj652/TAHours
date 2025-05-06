# TA Hours

### Quickstart:
- Make an account on google cloud services and get an Oauth Consent URI: You can find a tutorial on how to do this [here](https://www.youtube.com/watch?v=A3838fq6j4U).
- Fill out the `.txt` files in the `secrets` folder. To do this, make copies of all the `.example` files in the folder and copy them to just be `.txt` files. After this, fill out all the fields as requested in the files.
- Next, in `frontend/src/types/socketEvents.ts`, change the IP address in the `PROD_SOCKET_URI` to whichever IP you want to run it on (maybe change this in the future so it is not hard coded).
- In the `frontend/vite.config.ts` file, under `preview:{allowedHosts}`, add to the list to DNS you want to run the project on.
- Next (assuming you have docker), in the root, run:
```sh
make all 
```
- Afterwards, to run the project, run 
```sh 
make run
```
- To shut it down, run
```sh
make destroy
```
- And to get rid of the volumes (due to how it is building currently, you have to do this every time), run:
```sh
make prune
```
  
### File Structure:
```
.
├── backend
│  ├── app
│  │  └── app.go
│  ├── cmd
│  │  └── server
│  │     └── main.go
│  ├── controllers
│  │  ├── cs_class_controller.go
│  │  ├── post_controller.go
│  │  ├── ta_queue_controller.go
│  │  ├── ticket_controller.go
│  │  └── user_controller.go
│  ├── db
│  │  └── connect_to_mongo.go
│  ├── Dockerfile
│  ├── go.mod
│  ├── go.sum
│  ├── middleware
│  │  ├── auth_middleware.go
│  │  └── user_middleware.go
│  ├── models
│  │  ├── consts.go
│  │  ├── cs_class_model.go
│  │  ├── post_model.go
│  │  ├── ta_queue_model.go
│  │  ├── ticket_model.go
│  │  └── user_model.go
│  ├── routes
│  │  ├── cs_class_router.go
│  │  ├── post_router.go
│  │  ├── ta_queue_router.go
│  │  ├── ticket_router.go
│  │  └── user_router.go
│  ├── socket
│  │  └── socket_server.go
│  ├── tests
│  │  ├── python
│  │  │  └── requirements.txt
│  │  ├── singletests
│  │  │  ├── classes
│  │  │  │  ├── create_cs_class.sh
│  │  │  │  ├── create_cs_class_2.sh
│  │  │  │  ├── create_cs_class_3.sh
│  │  │  │  ├── create_ta_queue.sh
│  │  │  │  ├── create_ta_queue_2.sh
│  │  │  │  ├── get_all_active.sh
│  │  │  │  ├── get_cs_class.sh
│  │  │  │  ├── set_active_1.sh
│  │  │  │  └── set_active_2.sh
│  │  │  ├── posts
│  │  │  │  ├── create_comment.sh
│  │  │  │  ├── create_comment_2.sh
│  │  │  │  ├── create_post.sh
│  │  │  │  ├── create_post_2.sh
│  │  │  │  ├── create_post_3.sh
│  │  │  │  └── get_all_posts.sh
│  │  │  ├── taqueue
│  │  │  │  ├── active_tickets.sh
│  │  │  │  ├── add_ta.sh
│  │  │  │  ├── get_taqueue.sh
│  │  │  │  └── remove_ta.sh
│  │  │  ├── tickets
│  │  │  │  ├── create_ticket.sh
│  │  │  │  ├── get_ticket.sh
│  │  │  │  ├── get_user_tickets.sh
│  │  │  │  └── resolve_ticket.sh
│  │  │  └── user
│  │  │     ├── create_user.sh
│  │  │     ├── create_user_2.sh
│  │  │     ├── create_user_3.sh
│  │  │     ├── get_user.sh
│  │  │     ├── simple_test.sh
│  │  │     ├── update_description.sh
│  │  │     ├── update_profile_pic.sh
│  │  │     ├── update_roll_prof.sh
│  │  │     ├── update_roll_student.sh
│  │  │     └── update_roll_ta.sh
│  │  └── suites
│  │     ├── cs_class_test.go
│  │     ├── post_test.go
│  │     ├── ta_queue_test.go
│  │     ├── ticket_test.go
│  │     └── user_test.go
│  └── utils
│     ├── load_secret.go
│     └── validate.go
├── count_line.sh
├── database
│  ├── mongo-dump
│  │  └── TAHours
│  │     ├── posts.bson
│  │     ├── posts.metadata.json
│  │     ├── users.bson
│  │     └── users.metadata.json
│  └── testdata
│     └── TAHours
│        ├── cs_classes.bson
│        ├── cs_classes.metadata.json
│        ├── posts.bson
│        ├── posts.metadata.json
│        ├── ta_queues.bson
│        ├── ta_queues.metadata.json
│        ├── tickets.bson
│        ├── tickets.metadata.json
│        ├── users.bson
│        └── users.metadata.json
├── docker-compose.yml
├── frontend
│  ├── Dockerfile
│  ├──  eslint.config.js
│  ├── index.html
│  ├── nvim.benj
│  ├── package-lock.json
│  ├── package.json
│  ├── prettierrc.yaml
│  ├── public
│  │  └── vite.svg
│  ├── README.md
│  ├── src
│  │  ├── App.tsx
│  │  ├── assets
│  │  │  ├── colbyseal.svg
│  │  │  ├── colbytext.svg
│  │  │  ├── react.svg
│  │  │  └── star.svg
│  │  ├── components
│  │  │  ├── analytics
│  │  │  │  ├── AnalyticPieChart.tsx
│  │  │  │  ├── classManagement
│  │  │  │  │  ├── AddClassForm.tsx
│  │  │  │  │  ├── ClassList.tsx
│  │  │  │  │  └── index.ts
│  │  │  │  ├── index.ts
│  │  │  │  ├── middleCol
│  │  │  │  │  ├── index.ts
│  │  │  │  │  ├── MiddleCol.tsx
│  │  │  │  │  ├── SearchFilter.tsx
│  │  │  │  │  ├── TextAnalytics.tsx
│  │  │  │  │  ├── TicketDisplay.tsx
│  │  │  │  │  ├── ticketpopupanal.tsx
│  │  │  │  │  └── TicketQueue.tsx
│  │  │  │  └── roleAssigning
│  │  │  │     ├── index.ts
│  │  │  │     ├── RoleChangePopup.tsx
│  │  │  │     └── SearchableDropdown.tsx
│  │  │  ├── feed
│  │  │  │  ├── index.tsx
│  │  │  │  ├── Post.tsx
│  │  │  │  ├── Posts.tsx
│  │  │  │  ├── Replies.tsx
│  │  │  │  ├── Reply.tsx
│  │  │  │  ├── WritePost.tsx
│  │  │  │  └── WriteReply.tsx
│  │  │  ├── index.ts
│  │  │  ├── mainPage
│  │  │  │  ├── addTaQueue
│  │  │  │  │  ├── AddTaQueueButton.tsx
│  │  │  │  │  ├── AddTaQueuePopup.tsx
│  │  │  │  │  └── index.ts
│  │  │  │  ├── index.ts
│  │  │  │  ├── queueCard
│  │  │  │  │  ├── AddTicketButton.tsx
│  │  │  │  │  ├── index.ts
│  │  │  │  │  ├── queuePopups
│  │  │  │  │  │  ├── AddTicketPopup.tsx
│  │  │  │  │  │  ├── index.ts
│  │  │  │  │  │  ├── QueuePopup.tsx
│  │  │  │  │  │  └── ResolveTicketPopup.tsx
│  │  │  │  │  ├── Ticket.tsx
│  │  │  │  │  └── Tickets.tsx
│  │  │  │  ├── taCard
│  │  │  │  │  ├── ActiveTa.tsx
│  │  │  │  │  ├── ActiveTas.tsx
│  │  │  │  │  ├── index.ts
│  │  │  │  │  ├── JoinSessionButton.tsx
│  │  │  │  │  └── LeaveSessionButton.tsx
│  │  │  │  └── TaQueue.tsx
│  │  │  ├── navbar
│  │  │  │  ├── index.ts
│  │  │  │  ├── NavBar.tsx
│  │  │  │  └── NavBarButton.tsx
│  │  │  └── profile
│  │  │     ├── index.ts
│  │  │     ├── StudentTickets.tsx
│  │  │     └── TicketPopup.tsx
│  │  ├── context
│  │  │  ├── index.ts
│  │  │  └── SocketContext.tsx
│  │  ├── hooks
│  │  │  ├── csClass
│  │  │  │  ├── index.ts
│  │  │  │  ├── useCreateCSClass.ts
│  │  │  │  ├── useGetActiveClasses.ts
│  │  │  │  ├── useGetCSClass.ts
│  │  │  │  └── userCreateTaQueue.ts
│  │  │  ├── general
│  │  │  │  ├── index.ts
│  │  │  │  └── useListenMainPage.ts
│  │  │  ├── index.ts
│  │  │  ├── posts
│  │  │  │  ├── index.ts
│  │  │  │  ├── listeners
│  │  │  │  │  ├── index.ts
│  │  │  │  │  └── useListenMessages.ts
│  │  │  │  ├── useCreateComment.ts
│  │  │  │  ├── useCreatePost.ts
│  │  │  │  ├── useDeletePost.ts
│  │  │  │  └── useGetAllPosts.ts
│  │  │  ├── taQueue
│  │  │  │  ├── index.ts
│  │  │  │  ├── useGetAllTaQueues.ts
│  │  │  │  ├── useGetClassQueues.ts
│  │  │  │  ├── useJoinTaQueue.ts
│  │  │  │  └── useLeaveTaQueue.ts
│  │  │  ├── tickets
│  │  │  │  ├── index.ts
│  │  │  │  ├── useCreateTicket.ts
│  │  │  │  ├── useGetTicket.ts
│  │  │  │  ├── useResolveTicket.ts
│  │  │  │  └── useUserTickets.ts
│  │  │  └── user
│  │  │     ├── index.ts
│  │  │     ├── updateRoleHooks
│  │  │     │  ├── index.ts
│  │  │     │  ├── useUpdateRoleProfessor.ts
│  │  │     │  ├── useUpdateRoleStudent.ts
│  │  │     │  └── useUpdateRoleTA.ts
│  │  │     ├── useGetAllUsers.ts
│  │  │     ├── useGetUser.ts
│  │  │     ├── useLogin.ts
│  │  │     ├── useLogout.ts
│  │  │     └── useUpdateUserDesc.ts
│  │  ├── index.css
│  │  ├── main.tsx
│  │  ├── mocks
│  │  │  ├── BasicQueueMock.ts
│  │  │  ├── index.ts
│  │  │  └── QueueMocks.ts
│  │  ├── pages
│  │  │  ├── analyticsPage
│  │  │  │  ├── AnalyticsPage.tsx
│  │  │  │  └── index.ts
│  │  │  ├── feedPage
│  │  │  │  ├── FeedPage.tsx
│  │  │  │  └── index.ts
│  │  │  ├── index.ts
│  │  │  ├── loginPage
│  │  │  │  ├── index.ts
│  │  │  │  └── LoginPage.tsx
│  │  │  ├── mainPage
│  │  │  │  ├── index.ts
│  │  │  │  └── MainPage.tsx
│  │  │  └── profilePage
│  │  │     ├── index.ts
│  │  │     └── ProfilePage.tsx
│  │  ├── store
│  │  │  ├── globalStores
│  │  │  │  ├── csClassStore.ts
│  │  │  │  ├── index.ts
│  │  │  │  ├── taQueueStore.ts
│  │  │  │  ├── threadStore.ts
│  │  │  │  ├── ticketStore.ts
│  │  │  │  └── userStore.ts
│  │  │  ├── index.ts
│  │  │  └── localStores
│  │  │     ├── analyticsPageStore.ts
│  │  │     ├── forceUpdateStore.ts
│  │  │     ├── index.ts
│  │  │     ├── mainPageStore.ts
│  │  │     └── threadStore.ts
│  │  ├── types
│  │  │  ├── csClass.ts
│  │  │  ├── index.ts
│  │  │  ├── misc.ts
│  │  │  ├── networking.ts
│  │  │  ├── posts.ts
│  │  │  ├── socketEvents.ts
│  │  │  ├── taQueue.ts
│  │  │  ├── tickets.ts
│  │  │  └── users.ts
│  │  ├── utils
│  │  │  ├── classNames.ts
│  │  │  ├── dateFormatters.ts
│  │  │  ├── httpClient.ts
│  │  │  └── index.ts
│  │  └── vite-env.d.ts
│  ├── tsconfig.json
│  ├── vite.config.d.ts
│  ├── vite.config.js
│  └── vite.config.ts
├── gorilla
│  └── gorilla.jpg
├── Makefile
├── mongorestore.sh
├── README.md
├── secrets
│  ├── backend_env.txt.example
│  ├── frontend_env.txt.example
│  ├── mongo_pass.txt.example
│  └── mongo_user.txt.example
└── Useful_Queries.md
```
