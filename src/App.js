import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, lazy, Suspense } from "react";
import { loadUser } from "./Actions/User.js";
import { ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';

import Loader from "./components/Loader.js";
import Navbar from "./components/Navbar.js";
import Signup from "./components/Signup.js";

const Login = lazy(() => import("./components/Login.js"));
const Home = lazy(() => import("./components/Home.js"));
const Account = lazy(() => import("./components/Account.js"));
const NewPost = lazy(() => import("./components/NewPost.js"));
const UpdateProfile = lazy(() => import("./components/UpdateProfile.js"));
const UpdatePassword = lazy(() => import("./components/UpdatePassword.js"));
const UserProfile = lazy(() => import("./components/UserProfile.js"));
const Search = lazy(() => import("./components/Search.js"));
const Message = lazy(() => import("./components/Message.js"));
const Explore = lazy(() => import("./components/Explore.js"));

function ProtectedRoute({ isAuthenticated, children }) {
  return isAuthenticated ? children : <Navigate to="/login" replace />;
}

function App() {
  const dispatch = useDispatch();
  const { isAuthenticated } = useSelector((state) => state.user);

  useEffect(() => {
    dispatch(loadUser());
  }, [dispatch]);

  return (
    <Router>
      <ToastContainer />
      <div className="md:flex">
        {isAuthenticated && (
          <div className="md:w-[25vw] md:h-[100vh] sticky top-0">
            <Navbar />
          </div>
        )}

        <Suspense fallback={<Loader />}>
          <div className="md:w-[75vw] md:mx-auto">
            <Routes>
              {/* Public Routes */}
              <Route
                path="/"
                element={
                  isAuthenticated ? <Home /> : <Navigate to="/login" replace />
                }
              />
              <Route
                path="/login"
                element={
                  !isAuthenticated ? <Login /> : <Navigate to="/" replace />
                }
              />
              <Route
                path="/register"
                element={
                  !isAuthenticated ? <Signup /> : <Navigate to="/" replace />
                }
              />

              {/* Protected Routes */}
              <Route
                path="/account"
                element={
                  <ProtectedRoute isAuthenticated={isAuthenticated}>
                    <Account />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/newpost"
                element={
                  <ProtectedRoute isAuthenticated={isAuthenticated}>
                    <NewPost />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/update/profile"
                element={
                  <ProtectedRoute isAuthenticated={isAuthenticated}>
                    <UpdateProfile />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/update/password"
                element={
                  <ProtectedRoute isAuthenticated={isAuthenticated}>
                    <UpdatePassword />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/user/:id"
                element={
                  <ProtectedRoute isAuthenticated={isAuthenticated}>
                    <UserProfile />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/search"
                element={
                  <ProtectedRoute isAuthenticated={isAuthenticated}>
                    <Search />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/messages"
                element={
                  <ProtectedRoute isAuthenticated={isAuthenticated}>
                    <Message />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/explore"
                element={
                  <ProtectedRoute isAuthenticated={isAuthenticated}>
                    <Explore />
                  </ProtectedRoute>
                }
              />
            </Routes>
          </div>
        </Suspense>
      </div>
    </Router>
  );
}

export default App;