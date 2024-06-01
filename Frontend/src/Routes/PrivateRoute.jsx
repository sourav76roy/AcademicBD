import { useNavigate } from "react-router-dom";
import useUser from "../Hooks/useUser";
import { useStore } from "../Store/Store";

// Desc: Private Route for authenticated users
export default function PrivateRoute({ children }) {
  useUser();
  const navigate = useNavigate();
  const { isUser } = useStore();
  const { user, isLogin } = isUser;

  // console.log("this is private route", isLogin, user?.email);

  // if (!isLogin) {
  //   navigate("/login");
  // }

  // if user is logged in, then return the children
  if (!isLogin) {
    return navigate("/login");
  }

  return children;
}
