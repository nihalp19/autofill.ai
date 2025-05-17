import { Routes, Route, Navigate } from "react-router-dom";
import LandingPage from "./pages/LandingPage";
import SignUp from "./pages/SignUp";
import Dashboard from "./pages/DashBoard";
import Header from "./components/Header";
import Login from "./pages/Login";
import FormHistory from "./pages/FormHistory";
import MainHero from "./components/MainHero";
import Profile from "./pages/Profile";
import Footer from "./components/Footer"
import Sidebar from "./components/Sidebar";
import MainLandingPage from "./pages/MainLandingPage";
import { Toaster } from "react-hot-toast";
import { useAuthStore } from "./store/useAuthStore";
import { useEffect } from "react";
import FormView from "./pages/FormView";

function App() {
  const { user, checkAuth, isLoading, isSideBarOpen, toogleSideBar } = useAuthStore();

  useEffect(() => {
    checkAuth();
  }, [checkAuth]);

  if (isLoading) return <div>...loading</div>;

  return (
    <div>
      <main >
        <Routes>
          {/* Public routes */}
          <Route path="/" element={<LandingPage />} />
          <Route path="/login" element={!user ? <Login /> : <Navigate to="/home" />} />
          <Route path="/signup" element={!user ? <SignUp /> : <Navigate to="/home" />} />

          <Route path="/home" element={user ? <MainLandingPage /> : <Navigate to="/login" />}>
            <Route index element={<MainHero />} />
            <Route path="history" element={<FormHistory />} />
            <Route path="dashboard" element={<Dashboard />} />
            <Route path="profile" element={<Profile />} />
            <Route path="form/:id" element={<FormView />} />
          </Route>

        </Routes>
      </main>
      <Toaster />
    </div>
  );
}
export default App;
