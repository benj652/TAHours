import { Route, Routes, useLocation } from "react-router-dom";
import { AnalyticsPage, FeedPage, MainPage, Login, ProfilePage } from "@/pages";
import { NavBar } from "@/components";
import { cn } from "./utils";
import { authStore } from "./store";
import { Navigate } from "react-router-dom";
import { RolesConfig, Routes as routes } from "./types";
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
            <Navigate to={routes.Login} />
        );
    };

    // Websocket listners
    useListenMessages();

    return (
        <div className={cn("font-primary")}>
            {showNavBar && <NavBar />}
            <Routes>
                <Route
                    path={routes.Login}
                    element={user ? <Navigate to={routes.Main} /> : <Login />}
                />
                <Route
                    path={routes.Main}
                    element={
                        user ? (
                            renderRoute(
                                userRole,
                                [
                                    RolesConfig.Student,
                                    RolesConfig.Ta,
                                    RolesConfig.Professor,
                                    RolesConfig.Admin,
                                ],
                                <MainPage />,
                            )
                        ) : (
                            <Navigate to={routes.Login} />
                        )
                    }
                />
                <Route
                    path={routes.Profile}
                    element={
                        user ? (
                            renderRoute(
                                userRole,
                                [
                                    RolesConfig.Student,
                                    RolesConfig.Ta,
                                    RolesConfig.Professor,
                                    RolesConfig.Admin,
                                ],
                                <ProfilePage />,
                            )
                        ) : (
                            <Navigate to={routes.Login} />
                        )
                    }
                />
                <Route
                    path={routes.Feed}
                    element={
                        user ? (
                            renderRoute(
                                userRole,
                                [RolesConfig.Ta, RolesConfig.Professor, RolesConfig.Admin],
                                <FeedPage />,
                            )
                        ) : (
                            <Navigate to={routes.Login} />
                        )
                    }
                />
                <Route
                    path={routes.Analytics}
                    element={
                        user ? (
                            renderRoute(
                                userRole,
                                [RolesConfig.Ta, RolesConfig.Professor, RolesConfig.Admin],
                                <AnalyticsPage />,
                            )
                        ) : (
                            <Navigate to={routes.Login} />
                        )
                    }
                />
                <Route
                    path="*"
                    element={
                        user ? (
                            <Navigate to={routes.Analytics} />
                        ) : (
                            <Navigate to={routes.Login} />
                        )
                    }
                />
            </Routes>
        </div>
    );
}

export default App;
