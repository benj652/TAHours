import { Route, Routes } from "react-router-dom";
import AnalyticsPage from "./pages/analyticsPage/AnalyticsPage";
import FeedPage from "./pages/feedPage/FeedPage";
import LoginPage from "./pages/loginPage/LoginPage";
import MainPage from "./pages/mainPage/MainPage";
import ProfilePage from "./pages/profilePage/ProfilePage";
import NavBar from "./components/navbar/NavBar";
import { cn } from "./utils";

function App() {
  const showNavBar = location.pathname !== '/login';
    return (
        <div className={cn("font-primary")}>
            {showNavBar && <NavBar />}
            <Routes>
                <Route path="/login" element={<LoginPage />} />
                <Route path="/main" element={<MainPage />} />
                <Route path="/profile" element={<ProfilePage />} />
                <Route path="/feed" element={<FeedPage />} />
                <Route path="/analytics" element={<AnalyticsPage />} />
            </Routes>
        </div>
    );
}

export default App;
