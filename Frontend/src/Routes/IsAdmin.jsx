import { useNavigate } from "react-router-dom";
import useUser from "../Hooks/useUser";
import { useStore } from "../Store/Store";

// desc: check if the user is admin or not
export default function IsAdmin({ children }) {
  useUser();
  const { isUser } = useStore();
  const navigate = useNavigate();

  // if user is not logged in then redirect to login
  if (!isUser.isLogin) {
    navigate("/login", { replace: true });
  }

  // if user is not admin then redirect to home
  if (isUser.role !== "admin") {
    navigate("/", { replace: true });
  }

  return children;
}
