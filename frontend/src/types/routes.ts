 interface Routes {
    feed: string;
    profile: string;
    login: string;
    analytics: string;
    main: string;
}
export const routes: Routes= {
    feed: "/feed",
    profile: "/profile",
    login: "/login",
    analytics: "/analytics",
    main: "/main",
}

const userBase = "/api/user";
const csClassBase = "/api/cs-class";
const postBase = "/api/posts";
const taQueueBase = "/api/ta-queue";
const ticketBase = "/api/ticket";

export const uriRoutes = {
    getOrCreateUser: `${userBase}/get-or-create`,
}
