import { Navigate, useLocation } from "react-router-dom";

export default function ProtectedRoute({ children, anonymous = false }) {
  if (!anonymous) {
    return <Navigate to="/" replace />;
  }
  return children;
}
//   const location = useLocation();
//   const from = location.state?.from || "/";

//   if (isLoggedIn) {
//     return <Navigate to={from} />;
//   } else if (!isLoggedIn) {
//     return <Navigate to="/login" state={{ from: location }} />;
//   }
//   return children;
// }
