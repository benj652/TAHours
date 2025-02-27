import { Route, Routes, useLocation } from "react-router-dom";
import { AnalyticsPage, FeedPage, MainPage, Login, ProfilePage } from "@/pages";
import { NavBar } from "@/components";
import { cn } from "./utils";
import { authStore } from "./store";
import { Navigate } from "react-router-dom";
import { rolesConfig, routes } from "./types";
import useListenMessages from "./hooks/posts/listeners/useListenMessages";

function App() {
    const location = useLocation();
    const showNavBar = location.pathname !== "/login";
    const { user, userItems } = authStore();
    const userRole = userItems?.roles;

    // determines if the user can see a route. This depends on their role and if they are logged in. I am using kind of a goofy pin bally thing where the login only depends on the user and everything else routes to the login, so for example, if a student trys to access the feed, they will be rerouted to the login which would then, assuming they are logged in, reroute them to the main page.
    const renderRoute = (
        role: string,
        allowedRoles: string[],
        element: JSX.Element,
    ) => {
        return allowedRoles.includes(role) ? (
            element
        ) : (
            <Navigate to={routes.login} />
        );
    };

    // Websocket listners
    useListenMessages();

    return (
        <div className={cn("font-primary")}>
            {showNavBar && <NavBar />}
            <Routes>
                <Route
                    path={routes.login}
                    element={user ? <Navigate to={routes.main} /> : <Login />}
                />
                <Route
                    path={routes.main}
                    element={
                        user ? (
                            renderRoute(
                                userRole,
                                [
                                    rolesConfig.student,
                                    rolesConfig.ta,
                                    rolesConfig.professor,
                                    rolesConfig.admin,
                                ],
                                <MainPage />,
                            )
                        ) : (
                            <Navigate to={routes.login} />
                        )
                    }
                />
                <Route
                    path={routes.profile}
                    element={
                        user ? (
                            renderRoute(
                                userRole,
                                [
                                    rolesConfig.student,
                                    rolesConfig.ta,
                                    rolesConfig.professor,
                                    rolesConfig.admin,
                                ],
                                <ProfilePage />,
                            )
                        ) : (
                            <Navigate to={routes.login} />
                        )
                    }
                />
                <Route
                    path={routes.feed}
                    element={
                        user ? (
                            renderRoute(
                                userRole,
                                [rolesConfig.ta, rolesConfig.professor, rolesConfig.admin],
                                <FeedPage />,
                            )
                        ) : (
                            <Navigate to={routes.login} />
                        )
                    }
                />
                <Route
                    path={routes.analytics}
                    element={
                        user ? (
                            renderRoute(
                                userRole,
                                [rolesConfig.ta, rolesConfig.professor, rolesConfig.admin],
                                <AnalyticsPage />,
                            )
                        ) : (
                            <Navigate to={routes.login} />
                        )
                    }
                />
                <Route
                    path="*"
                    element={
                        user ? (
                            <Navigate to={routes.analytics} />
                        ) : (
                            <Navigate to={routes.login} />
                        )
                    }
                />
            </Routes>
        </div>
    );
}

export default App;
