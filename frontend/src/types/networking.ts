interface Routes {
    feed: string;
    profile: string;
    login: string;
    analytics: string;
    main: string;
}

/**
 * Define the routes for the application
 * @param feed - The feed route
 * @param profile - The profile route
 * @param login - The login route
 * @param analytics - The analytics route
 * @param main - The main route
 * @returns The routes for the application
 */
export const routes: Routes = {
    feed: "/feed",
    profile: "/profile",
    login: "/login",
    analytics: "/analytics",
    main: "/main",
};

/**
 * Matches the REST API route endpoints from the backend server to the frontend
 */
const userBase = "/api/user";
const csClassBase = "/api/cs-class";
const postBase = "/api/posts";
const taQueueBase = "/api/ta-queue";
const ticketBase = "/api/ticket";

export const uriRoutes = {
    getOrCreateUser: `${userBase}/get-or-create`,
};

/**
 * Config for the tokens in the application
 */
export const tokenConfig = {
    userTimeoutToken: "token",
    userJWTResponseToken: "JWTR",
    userItemsToken: "user",
};
