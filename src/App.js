import { BrowserRouter as Router, Routes, Route } from "react-router-dom"
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { loadUser } from "./Actions/User.js";
import { ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';







import { lazy, Suspense } from "react";
import Loader from "./components/Loader.js";
const Login = lazy(() => import("./components/Login.js"));
const Home = lazy(() => import("./components/Home.js"))
const Account = lazy(() => import("./components/Account.js"))
const NewPost = lazy(() => import("./components/NewPost.js"))
const UpdateProfile = lazy(() => import("./components/UpdateProfile.js"))
const UpdatePassword = lazy(() => import("./components/UpdatePassword.js"))
const UserProfile = lazy(() => import("./components/UserProfile.js"))
const Search = lazy(() => import("./components/Search.js"))
const Message = lazy(() => import("./components/Message.js"))
const Explore = lazy(() => import("./components/Explore.js"))
import Navbar from "./components/Navbar.js"
import Signup from "./components/Signup.js";


function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(loadUser())
  }, [dispatch])

  const { isAuthenticated } = useSelector((state) => state.user)

  return (
    <>
      <Router>
      <ToastContainer />
        <div className="md:flex ">
          {isAuthenticated &&
            <div className="md:w-[25vw] md:h-[100vh] sticky top-0">
              <Navbar />
            </div>
          }
          <Suspense fallback={<Loader />}>
            <div className="md:w-[75vw] md:mx-[auto]">
              <Routes>
                <Route exact path="/" element={isAuthenticated ? <Home /> : <Login />} />
                <Route exact path="/login" element={<Login />} />
                <Route exact path="/register" element={<Signup />} />
                <Route exact path="/account" element={isAuthenticated ? <Account /> : <Login />} />
                <Route exact path="/newpost" element={isAuthenticated ? <NewPost /> : <Login />} />
                <Route exact path="/update/profile" element={isAuthenticated ? <UpdateProfile /> : <Login />} />
                <Route exact path="/update/password" element={isAuthenticated ? <UpdatePassword /> : <Login />} />
                <Route exact path="/user/:id" element={isAuthenticated ? <UserProfile /> : <Login />} />
                <Route exact path="/search" element={isAuthenticated ? <Search /> : <Login />} />
                <Route exact path="/messages" element={isAuthenticated ? <Message /> : <Login />} />
                <Route exact path="/explore" element={isAuthenticated ? <Explore /> : <Login />} />
              </Routes>
            </div>
          </Suspense>
        </div>
       
      </Router>
    </>
  );
}

export default App;
