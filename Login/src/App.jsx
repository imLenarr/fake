import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
  useLocation,
} from "react-router-dom";
import { useContext, useState } from "react";
import Sidebar from "./components/Sidebar";
import Topbar from "./components/Topbar";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";

import AuthProvider, { AuthContext } from "./Context/AuthContext";

import Dashboard from "./pages/Dashboard/Dashboard";
import Inventory from "./pages/Inventory/Inventory";
import Outbound from "./pages/Outbound/Outbound";
import Inbound from "./pages/Inbound/Inbound";
import Reports from "./pages/Reports/Reports";
import UserManagement from "./pages/Settings/UserManagement";
import Login from "./components/Login/Login";
import Status from "./pages/Outbound/Status";
import Cart from "./pages/Outbound/Cart";
import Inboundpage from "./pages/Inbound/Inboundpage";
import Barcode from "./pages/Inbound/Barcode";

const PrivateRoute = ({ children, allowedRoles = [] }) => {
  const { user } = useContext(AuthContext);

  if (!user) {
    return <Navigate to="/login" replace />;
  }

  if (allowedRoles.length > 0 && !allowedRoles.includes(user.role)) {
    return <Navigate to="/dashboard" replace />;
  }

  return children;
};

const App = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const { user } = useContext(AuthContext);
  const location = useLocation();

  const isLoginPage = location.pathname === "/login";

  return (
    <div className="d-flex" style={{ backgroundColor: "#748D8C" }}>
      {/* Display Sidebar only if user is logged in and not on login page */}
      {user && !isLoginPage && (
        <Sidebar
          isOpen={isSidebarOpen}
          toggleSidebar={() => setIsSidebarOpen(!isSidebarOpen)}
        />
      )}

      <div
        className={`main-content flex-grow-1 ${
          user && !isLoginPage ? "with-sidebar" : ""
        }`}
      >
        {/* Display Topbar only if user is logged in and not on login page */}
        {user && !isLoginPage && <Topbar loggedInUser={user} />}

        {/* Main Content */}
        <div
          className="content-area p-4"
          style={{ marginTop: user && !isLoginPage ? "80px" : "0" }}
        >
          <Routes>
            <Route path="/login" element={<Login />} />
            <Route
              path="/dashboard"
              element={
                <PrivateRoute allowedRoles={["SUPER", "ADMIN", "USER"]}>
                  <Dashboard />
                </PrivateRoute>
              }
            />
            <Route
              path="/inventory"
              element={
                <PrivateRoute allowedRoles={["ADMIN"]}>
                  <Inventory />
                </PrivateRoute>
              }
            />
            <Route
              path="/outbound"
              element={
                <PrivateRoute allowedRoles={["USER"]}>
                  <Outbound />
                </PrivateRoute>
              }
            />
            <Route path="/status" element={<Status />} />
            <Route path="/cart" element={<Cart />} />
            <Route
              path="/inbound"
              element={
                <PrivateRoute allowedRoles={["ADMIN"]}>
                  <Inbound />
                </PrivateRoute>
              }
            />
            <Route path="/inboundpage" element={<Inboundpage />}></Route>
            <Route path="/barcode" element={<Barcode />}></Route>
            <Route
              path="/reports"
              element={
                <PrivateRoute allowedRoles={["SUPER", "ADMIN"]}>
                  <Reports />
                </PrivateRoute>
              }
            />
            <Route
              path="/settings"
              element={
                <PrivateRoute allowedRoles={["SUPER"]}>
                  <UserManagement />
                </PrivateRoute>
              }
            />
            <Route path="/" element={<Navigate to="/dashboard" replace />} />
          </Routes>
        </div>
      </div>
    </div>
  );
};

export default App;

// import {
//   BrowserRouter as Router,
//   Routes,
//   Route,
//   Navigate, useLocation
// } from "react-router-dom";
// import { useContext, useState } from "react";
// import Sidebar from "./components/Sidebar";
// import "bootstrap/dist/css/bootstrap.min.css";
// import "./App.css";

// import AuthProvider, { AuthContext, useAuth } from "./Context/AuthContext";

// import Dashboard from "./pages/Dashboard/Dashboard";
// import Inventory from "./pages/Inventory/Inventory";
// import Outbound from "./pages/Outbound/Outbound";
// import Receiving from "./pages/Receiving/Receiving";
// import Reports from "./pages/Reports/Reports";
// import UserManagement from "./pages/Settings/UserManagement";
// import Login from "./components/Login/Login";

// const PrivateRoute = ({ children, allowedRoles = [] }) => {
//   const { user } = useContext(AuthContext);

//   if (!user) {
//     return <Navigate to="/login" replace />;
//   }

//   if (allowedRoles.length > 0 && !allowedRoles.includes(user.role)) {
//     return <Navigate to="/dashboard" replace />;
//   }

//   return children;
// };

// function App() {
//   const [isSidebarOpen, setIsSidebarOpen] = useState(true);
//   const { user } = useContext(AuthContext);
//   const location = useLocation();

//   // ตรวจสอบว่าหน้าปัจจุบันคือ "/login" หรือไม่
//   const isLoginPage = location.pathname === "/login";

//   return (
//     <div className="d-flex" style={{ backgroundColor: "#748D8C" }}>
//       {/* แสดง Sidebar เฉพาะเมื่อ user login แล้วและไม่ใช่หน้าล็อกอิน */}
//       {user && !isLoginPage && <Sidebar isOpen={isSidebarOpen} />}

//       <div
//         className={`main-content flex-grow-1 p-4 ${user && !isLoginPage ? "with-sidebar" : ""}`}
//       >
//         <Routes>
//           <Route path="/login" element={<Login />} />

//           <Route
//             path="/dashboard"
//             element={
//               <PrivateRoute allowedRoles={["SUPER", "ADMIN", "USER"]}>
//                 <Dashboard />
//               </PrivateRoute>
//             }
//           />

//           <Route
//             path="/inventory"
//             element={
//               <PrivateRoute allowedRoles={["ADMIN"]}>
//                 <Inventory />
//               </PrivateRoute>
//             }
//           />

//           <Route
//             path="/outbound"
//             element={
//               <PrivateRoute allowedRoles={["USER"]}>
//                 <Outbound />
//               </PrivateRoute>
//             }
//           />

//           <Route
//             path="/receiving"
//             element={
//               <PrivateRoute allowedRoles={["USER"]}>
//                 <Receiving />
//               </PrivateRoute>
//             }
//           />

//           <Route
//             path="/reports"
//             element={
//               <PrivateRoute allowedRoles={["SUPER", "ADMIN"]}>
//                 <Reports />
//               </PrivateRoute>
//             }
//           />

//           <Route
//             path="/settings"
//             element={
//               <PrivateRoute allowedRoles={["SUPER"]}>
//                 <UserManagement />
//               </PrivateRoute>
//             }
//           />

//           <Route path="/" element={<Navigate to="/dashboard" replace />} />
//         </Routes>
//       </div>
//     </div>
//   );
// }

// export default App;
