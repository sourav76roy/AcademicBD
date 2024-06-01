import { UserOutlined } from "@ant-design/icons";
import { useNavigate } from "react-router-dom";
import { useStore } from "../../../Store/Store";

// Objective: Provide a button to access the user profile.
export default function UserProfileButton() {
  const { isUser } = useStore();
  const navigate = useNavigate();

  // login state of the user
  if (isUser.isLogin === false) {
    return navigate("/login");
  }

  const { user, role } = isUser;

  // console.log("isUser UserProfileButton ", isUser);

  return (
    <div className="flex items-center justify-end gap-4">
      <figure className="w-11 h-11 rounded-full bg-slate-200 border shadow-md flex items-center justify-center text-2xl p-2">
        <UserOutlined />
      </figure>
      <div className="flex flex-col items-start justify-center gap-2 text-left">
        <h2 className="font-semibold text-base leading-4">{user?.name}</h2>
        <p className="font-normal text-base leading-3 capitalize">{role}</p>
      </div>
    </div>
  );
}
