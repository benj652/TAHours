import { Route, Routes } from "react-router-dom";
import {AnalyticsPage, FeedPage, MainPage, Login, ProfilePage} from "@/pages"
import { NavBar } from "@/components"
import { cn } from "./utils";

function App() {
  const showNavBar = location.pathname !== '/login';
    return (
        <div className={cn("font-primary")}>
            {showNavBar && <NavBar />}
            <Routes>
                <Route path="/login" element={<Login />} />
                <Route path="/main" element={<MainPage />} />
                <Route path="/profile" element={<ProfilePage />} />
                <Route path="/feed" element={<FeedPage />} />
                <Route path="/analytics" element={<AnalyticsPage />} />
            </Routes>
        </div>
    );
}

export default App;
