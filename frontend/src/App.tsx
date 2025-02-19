import { Route, Routes, useLocation } from "react-router-dom";
import { AnalyticsPage, FeedPage, MainPage, Login, ProfilePage } from "@/pages"
import { NavBar } from "@/components"
import { cn } from "./utils";
import { authStore } from "./store";
import { Navigate } from "react-router-dom";
import { routes } from "./types";

function App() {
    const location = useLocation();
    const showNavBar = location.pathname !== '/login';
    const { user } = authStore();
    console.log(user);
    return (
        <div className={cn("font-primary")}>
            {showNavBar && <NavBar />}
            <Routes>
                <Route path={routes.login} element={user ? <Navigate to={routes.main}/> : <Login />} />
                <Route path={routes.main} element={user ? <MainPage /> : <Navigate to={routes.login} />} />
                <Route path={routes.profile} element={user ? <ProfilePage /> : <Navigate to={routes.login} />} />
                <Route path={routes.feed} element={user ? <FeedPage /> : <Navigate to={routes.login} />} />
                <Route path={routes.analytics} element={user ? <AnalyticsPage /> : <Navigate to = {routes.login} />} />
                <Route path="*" element={user ? <Navigate to={routes.analytics}/> : <Navigate to={routes.login} />} />
                </Routes>
        </div>
    );
}

export default App;
