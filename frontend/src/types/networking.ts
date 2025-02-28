import { create } from "zustand";

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
    user: {
        getOrCreateUser: `${userBase}/get-or-create`,
        getOneUser: `${userBase}/one/`,
        getAllUsers: `${userBase}/all`,
        UPDATE_ROLE_TA: `${userBase}/update-role-ta/`,
        UPDATE_ROLE_PROFESSOR: `${userBase}/update-role-professor/`,
        UPDATE_ROLE_STUDENT: `${userBase}/update-role-student/`,
    },
    posts: {
        createPost: `${postBase}/create`,
        getAllPosts: `${postBase}/all`,
        createComment: `${postBase}/comment/`,
        deletePost: `${postBase}/`,
    },
    csClass: {
        getActiveClasses: `${csClassBase}/active-classes`,
        createCsClass: `${csClassBase}/create`,
        createTaQueue: `${csClassBase}/create-ta-queue`,
        setActiveClass: `${csClassBase}/set-active/`,
        getCsClass: `${csClassBase}/one/`,
    },
    taQueue: {
        getAll: `${taQueueBase}/all`,
        addTa: `${taQueueBase}/add-ta/`,
        removeTa: `${taQueueBase}/remove-ta/`,
        getActiveTickets: `${taQueueBase}/active-tickets`,
    },
    ticket: {
        getTicket: `${ticketBase}/one/`,
        createTicket: `${ticketBase}/create/`,
        resoloveTicket: `${ticketBase}/resolve/`,
        deleteTicket: `${ticketBase}/`,
        userTickets: `${ticketBase}/user-tickets/`,
    },
};

/**
 * Config for the tokens in the application
 */
export const tokenConfig = {
    userTimeoutToken: "token",
    userJWTResponseToken: "JWTR",
    userItemsToken: "user",
};

/**
 * Config for roles.
 *
 * This corresponds with the Go config on the backend. In this, the student has the least privlages,
 * and can only access the main and profile page. TAs can access the feed page. Professors and admins can access
 * any page. In the future, these roles might also dictate if you can view another user's profile.
 *
 * @param student - The student role
 * @param ta - The teaching assistant role
 * @param professor - The professor role
 * @param admin - The admin role
 * @returns The roles configuration
 */
export const rolesConfig = {
    student: "student",
    ta: "ta",
    professor: "professor",
    admin: "admin",
};


// Popup Modals
export const MODALS = {
    ROLE_CHANGE: "model_1",
    CREATE_CLASS: "model_2",
}
