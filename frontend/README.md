# Frontend

### Overview:

- The Frontend of this project uses **React + Vite + TS** with (Zustand)[https://github.com/pmndrs/zustand] for state management. 
- Each page has its own folder in `pages`. 
- Most components are otherwise in the `components` folder.
- API calls are made through hooks, organised in the `hooks` folder.
- Application state is stored in the `store` and `context` folders.
- The `mocks` folder is used for mock data. 
- Enums, consts, and types are all stored in the `types` folder.

### General Workflow

- The Frontend makes API requests to the backend. It than caches the response in a store. 
- On websocket events (most on the main page are handled in `frontend/src/hooks/general/useListenMainPage.ts`, the app updates these caches directly. 

