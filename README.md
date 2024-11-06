# Install dependencies

To install the dependencies for this project, you'll need to run the following commands in your terminal:

1. `cd frontend && npm install` - This will install the dependencies for the frontend (React) application.
2. `cd backend && go get` - This will install the dependencies for the backend (Go) application.
3. `cd .. && cp .env.example .env` - This will create a copy of the .env file which is gitignored. You should fill in the variables with the correct values for your environment.

After you've installed the dependencies, you can start the development server by running `npm run dev` in the frontend directory. This will start the React development server and make the application available at [http://localhost:3000](http://localhost:3000).
