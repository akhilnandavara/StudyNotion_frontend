import { Route, Routes } from "react-router-dom";
import "./App.css";
import Home from "./pages/Home";
import Navbar from "./components/common/Navbar";
import Login from "./pages/login";
import Signup from "./pages/signup";
import ForgotPassword from "./pages/ForgotPassword";
import OpenRoute from "./components/core/Auth/OpenRoute";
import UpdatePassword from "./pages/UpdatePassword";
import VerifyEmail from "./pages/VerifyEmail";
import About from "./pages/About";
import ContactPage from "./pages/ContactPage";
import DashBoard from "./pages/DashBoard";
import MyProfile from "./components/core/Dashboard/MyProfile";
import PrivateRoute from "./components/core/Auth/PrivateRoute";
import Error from "./pages/Error";
import ProfileSettings from "./components/core/Dashboard/settings/index";
import EnrolledCourses from "./components/core/Dashboard/EnrolledCourses";
import Cart from "./components/core/Dashboard/Cart";
import { ACCOUNT_TYPE } from "./utils/constants";
import { useSelector } from "react-redux";
import AddCourse from "./components/core/Dashboard/AddCourse";
import MyCourses from "./components/core/Dashboard/MyCourses";
import EditCourse from "./components/core/Dashboard/EditCourse";
import Catalog from "./pages/Catalog";
import CourseDetails from "./pages/CourseDetails";
import ViewCourse from "./pages/ViewCourse";
import VideoDetails from "./components/core/ViewCourse/VideoDetails";
import Instructor from "./components/core/Dashboard/InstructorDasboard/Instructor";
import LoadingBar from 'react-redux-loading-bar'
import PaymentHistory from "./components/core/Dashboard/PaymentHistory";
import AddCategory from "./components/core/Dashboard/AdminDashboard/AddCategory";
import DashboardDetail from "./components/core/Dashboard/AdminDashboard/DashboardDetail";
import ChatFooter from "./components/common/ChatFooter";


function App() {
  const { user } = useSelector((state) => state.profile);
  return (
    <div className="w-screen min-h-screen  bg-richblack-900 flex flex-col font-inter">
      
      <div className="h-[2px] bg-richblack-800">
      <LoadingBar className="bg-yellow-200 h-[3px]"/>
      </div>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="catalog/:catalogName" element={<Catalog />} />
        <Route path="course/:courseId" element={<CourseDetails />} />
        <Route path="/login" element={<OpenRoute> <Login /></OpenRoute> }/>
        <Route  path="/signup" element={ <OpenRoute> <Signup /></OpenRoute>  }/>
        <Route path="/verify-email" element={ <OpenRoute> <VerifyEmail /></OpenRoute>}/>
        <Route path="/forgot-password" element={<OpenRoute><ForgotPassword /> </OpenRoute>}/>
        <Route   path="/update-password/:id"element={<OpenRoute><UpdatePassword /></OpenRoute>   } />
        <Route  path="about"  element={<About />  }/>
        <Route path="contact" element={<ContactPage />} />


        {/* Dashboard route */}
        <Route
          element={
            <PrivateRoute>
              <DashBoard />
            </PrivateRoute>
          }
        >
          <Route path="dashboard/my-profile" element={<MyProfile />} />
          <Route path="dashboard/settings" element={<ProfileSettings />} />
          
          {user?.accountType === ACCOUNT_TYPE.STUDENT && (
            <>
              <Route
                path="dashboard/enrolled-courses"
                element={<EnrolledCourses />}
              />
              <Route path="dashboard/cart" element={<Cart />} />
              <Route path="dashboard/purchase-history" element={<PaymentHistory />} />
            </>
          )}
          {user?.accountType === ACCOUNT_TYPE.INSTRUCTOR && (
            <>
              <Route path="dashboard/add-course" element={<AddCourse />} />
              <Route path="dashboard/my-courses" element={<MyCourses />} />
              <Route path="dashboard/instructor" element={<Instructor />} />
              <Route path="dashboard/edit-course/:courseId" element={<EditCourse />}/>
            </>
          )}
          {
            user?.accountType===ACCOUNT_TYPE.ADMIN&&(
              <>
              <Route path="dashboard/add-category" element={<AddCategory/>}/>
              <Route path="dashboard/admin-dashboard" element={<DashboardDetail/>}/>
              
              </>
            )
          }
        </Route>

        {/* View course Route */}
        <Route
        element={
         <PrivateRoute>
          <ViewCourse/>
         </PrivateRoute>
        }
        >
          {
            user?.accountType===ACCOUNT_TYPE.STUDENT&&(
              <>
              <Route 
              path="view-course/:courseId/section/:sectionId/subSection/:subSectionId"
              element={<VideoDetails/>}
              
              />
              </>
            )
          }
        </Route>

        <Route path="*" element={<Error />} />
      </Routes>
      <ChatFooter/>
    </div>
  );
}

export default App;
