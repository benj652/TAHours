# Frontend

- [Home](./../README.md)

## Overview:

- The Frontend of this project uses **React + Vite + TS** with [Zustand](https://github.com/pmndrs/zustand) for state management.
- Each page has its own folder in `pages`.
- Most components are otherwise in the `components` folder.
- API calls are made through hooks, organised in the `hooks` folder.
- Application state is stored in the `store` and `context` folders.
- The `mocks` folder is used for mock data.
- Enums, consts, and types are all stored in the `types` folder.

## General Workflow

- The Frontend makes API requests to the backend. It than caches the response in a store.
- On WebSocket events (most on the main page are handled in `frontend/src/hooks/general/useListenMainPage.ts`, the app updates these caches directly.

## Running

Node and [npm](https://www.npmjs.com/) are required to run this micro service.

- To run in development mode:

```sh
npm run dev
```

- To run in production, run

```sh
npm run build
npm run preview
```

## `.env` Variables

Although for production, the `.env` variables are **entirely handled in secrets**, they are listed as:

-
-
-

## File Structure

```.
├── Dockerfile
├── eslint.config.js
├── index.html
├── nvim.benj
├── package-lock.json
├── package.json
├── prettierrc.yaml
├── public
│  └── vite.svg
├── README.md
├── src
│  ├── App.tsx
│  ├── assets
│  │  ├── colbyseal.svg
│  │  ├── colbytext.svg
│  │  ├── react.svg
│  │  └── star.svg
│  ├── components
│  │  ├── analytics
│  │  │  ├── AnalyticPieChart.tsx
│  │  │  ├── classManagement
│  │  │  │  ├── AddClassForm.tsx
│  │  │  │  ├── ClassList.tsx
│  │  │  │  └── index.ts
│  │  │  ├── index.ts
│  │  │  ├── middleCol
│  │  │  │  ├── index.ts
│  │  │  │  ├── MiddleCol.tsx
│  │  │  │  ├── SearchFilter.tsx
│  │  │  │  ├── TextAnalytics.tsx
│  │  │  │  ├── TicketDisplay.tsx
│  │  │  │  ├── ticketpopupanal.tsx
│  │  │  │  └── TicketQueue.tsx
│  │  │  └── roleAssigning
│  │  │     ├── index.ts
│  │  │     ├── RoleChangePopup.tsx
│  │  │     └── SearchableDropdown.tsx
│  │  ├── feed
│  │  │  ├── index.tsx
│  │  │  ├── Post.tsx
│  │  │  ├── Posts.tsx
│  │  │  ├── Replies.tsx
│  │  │  ├── Reply.tsx
│  │  │  ├── WritePost.tsx
│  │  │  └── WriteReply.tsx
│  │  ├── index.ts
│  │  ├── mainPage
│  │  │  ├── addTaQueue
│  │  │  │  ├── AddTaQueueButton.tsx
│  │  │  │  ├── AddTaQueuePopup.tsx
│  │  │  │  └── index.ts
│  │  │  ├── index.ts
│  │  │  ├── queueCard
│  │  │  │  ├── AddTicketButton.tsx
│  │  │  │  ├── index.ts
│  │  │  │  ├── queuePopups
│  │  │  │  │  ├── AddTicketPopup.tsx
│  │  │  │  │  ├── index.ts
│  │  │  │  │  ├── QueuePopup.tsx
│  │  │  │  │  └── ResolveTicketPopup.tsx
│  │  │  │  ├── Ticket.tsx
│  │  │  │  └── Tickets.tsx
│  │  │  ├── taCard
│  │  │  │  ├── ActiveTa.tsx
│  │  │  │  ├── ActiveTas.tsx
│  │  │  │  ├── index.ts
│  │  │  │  ├── JoinSessionButton.tsx
│  │  │  │  └── LeaveSessionButton.tsx
│  │  │  └── TaQueue.tsx
│  │  ├── navbar
│  │  │  ├── index.ts
│  │  │  ├── NavBar.tsx
│  │  │  └── NavBarButton.tsx
│  │  └── profile
│  │     ├── index.ts
│  │     ├── StudentTickets.tsx
│  │     └── TicketPopup.tsx
│  ├── context
│  │  ├── index.ts
│  │  └── SocketContext.tsx
│  ├── hooks
│  │  ├── csClass
│  │  │  ├── index.ts
│  │  │  ├── useCreateCSClass.ts
│  │  │  ├── useGetActiveClasses.ts
│  │  │  ├── useGetCSClass.ts
│  │  │  └── userCreateTaQueue.ts
│  │  ├── general
│  │  │  ├── index.ts
│  │  │  └── useListenMainPage.ts
│  │  ├── index.ts
│  │  ├── posts
│  │  │  ├── index.ts
│  │  │  ├── listeners
│  │  │  │  ├── index.ts
│  │  │  │  └── useListenMessages.ts
│  │  │  ├── useCreateComment.ts
│  │  │  ├── useCreatePost.ts
│  │  │  ├── useDeletePost.ts
│  │  │  └── useGetAllPosts.ts
│  │  ├── taQueue
│  │  │  ├── index.ts
│  │  │  ├── useGetAllTaQueues.ts
│  │  │  ├── useGetClassQueues.ts
│  │  │  ├── useJoinTaQueue.ts
│  │  │  └── useLeaveTaQueue.ts
│  │  ├── tickets
│  │  │  ├── index.ts
│  │  │  ├── useCreateTicket.ts
│  │  │  ├── useGetTicket.ts
│  │  │  ├── useResolveTicket.ts
│  │  │  └── useUserTickets.ts
│  │  └── user
│  │     ├── index.ts
│  │     ├── updateRoleHooks
│  │     │  ├── index.ts
│  │     │  ├── useUpdateRoleProfessor.ts
│  │     │  ├── useUpdateRoleStudent.ts
│  │     │  └── useUpdateRoleTA.ts
│  │     ├── useGetAllUsers.ts
│  │     ├── useGetUser.ts
│  │     ├── useLogin.ts
│  │     ├── useLogout.ts
│  │     └── useUpdateUserDesc.ts
│  ├──  index.css
│  ├── main.tsx
│  ├── mocks
│  │  ├── BasicQueueMock.ts
│  │  ├── index.ts
│  │  └── QueueMocks.ts
│  ├── pages
│  │  ├── analyticsPage
│  │  │  ├── AnalyticsPage.tsx
│  │  │  └── index.ts
│  │  ├── feedPage
│  │  │  ├── FeedPage.tsx
│  │  │  └── index.ts
│  │  ├── index.ts
│  │  ├── loginPage
│  │  │  ├── index.ts
│  │  │  └── LoginPage.tsx
│  │  ├── mainPage
│  │  │  ├── index.ts
│  │  │  └── MainPage.tsx
│  │  └── profilePage
│  │     ├── index.ts
│  │     └── ProfilePage.tsx
│  ├── store
│  │  ├── globalStores
│  │  │  ├── csClassStore.ts
│  │  │  ├── index.ts
│  │  │  ├── taQueueStore.ts
│  │  │  ├── threadStore.ts
│  │  │  ├── ticketStore.ts
│  │  │  └── userStore.ts
│  │  ├── index.ts
│  │  └── localStores
│  │     ├── analyticsPageStore.ts
│  │     ├── forceUpdateStore.ts
│  │     ├── index.ts
│  │     ├── mainPageStore.ts
│  │     └── threadStore.ts
│  ├── types
│  │  ├── csClass.ts
│  │  ├── index.ts
│  │  ├── misc.ts
│  │  ├── networking.ts
│  │  ├── posts.ts
│  │  ├── socketEvents.ts
│  │  ├── taQueue.ts
│  │  ├── tickets.ts
│  │  └── users.ts
│  ├── utils
│  │  ├── classNames.ts
│  │  ├── dateFormatters.ts
│  │  ├── httpClient.ts
│  │  └── index.ts
│  └── vite-env.d.ts
├── tsconfig.json
├── vite.config.d.ts
├── vite.config.js
└── vite.config.ts
```
