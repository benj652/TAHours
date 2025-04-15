// Define routes as an enum
export enum Routes {
  Feed = "/feed",
  Profile = "/profile",
  Login = "/login",
  Analytics = "/analytics",
  Main = "/main",
}

/**
 * Matches the REST API route endpoints from the backend server to the frontend
 */
const userBase = "/api/user";
const csClassBase = "/api/cs-class";
const postBase = "/api/posts";
const taQueueBase = "/api/ta-queue";
const ticketBase = "/api/ticket";

export enum UserRoutes {
  GetOrCreateUser = `${userBase}/get-or-create`,
  GetOneUser = `${userBase}/one/`,
  GetAllUsers = `${userBase}/all`,
  UpdateRoleTA = `${userBase}/update-role-ta/`,
  UpdateRoleProfessor = `${userBase}/update-role-professor/`,
  UpdateRoleStudent = `${userBase}/update-role-student/`,
  UpdateUserDesc = `${userBase}/update-desc/`,
}

export enum PostRoutes {
  CreatePost = `${postBase}/create`,
  GetAllPosts = `${postBase}/all`,
  CreateComment = `${postBase}/comment/`,
  DeletePost = `${postBase}/`,
}

export enum CsClassRoutes {
  GetActiveClasses = `${csClassBase}/active-classes`,
  CreateCsClass = `${csClassBase}/create`,
  CreateTaQueue = `${csClassBase}/create-ta-queue`,
  SetActiveClass = `${csClassBase}/set-active/`,
  GetCsClass = `${csClassBase}/one/`,
}

export enum TaQueueRoutes {
  GetAll = `${taQueueBase}/all`,
  AddTa = `${taQueueBase}/add-ta/`,
  RemoveTa = `${taQueueBase}/remove-ta/`,
  GetActiveTickets = `${taQueueBase}/active-tickets`,
  GetClassQueues = `${taQueueBase}/class-queues/`,
}

export enum TicketRoutes {
  GetTicket = `${ticketBase}/one/`,
  CreateTicket = `${ticketBase}/create/`,
  ResolveTicket = `${ticketBase}/resolve/`,
  DeleteTicket = `${ticketBase}/`,
  UserTickets = `${ticketBase}/user-tickets/`,
}

/**
 * Config for the tokens in the application
 */
export enum TokenConfig {
  UserTimeoutToken = "token",
  UserJWTResponseToken = "JWTR",
  UserItemsToken = "user",
}

/**
 * Config for roles.
 *
 * This corresponds with the Go config on the backend. In this, the student has the least privileges,
 * and can only access the main and profile page. TAs can access the feed page. Professors and admins can access
 * any page. In the future, these roles might also dictate if you can view another user's profile.
 */
export enum Roles {
  Student = "student",
  TA = "ta",
  Professor = "professor",
  Admin = "admin",
}

// Popup Modals
export enum Modals {
  RoleChange = "model_1",
  CreateClass = "model_2",
  QueuePopup = "model_3",
}
