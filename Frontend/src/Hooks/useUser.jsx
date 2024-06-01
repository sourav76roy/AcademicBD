import { useEffect, useState } from "react";
import { useStore } from "../Store/Store";

export default function useUser() {
  const { getLogin, isUser } = useStore();
  const [user, setUser] = useState({});

  // console.log("isUser useUser ", isUser);

  useEffect(() => {
    const authUser = JSON.parse(localStorage.getItem("authUser"));
    // console.log("authUser useUser", authUser);

    if (authUser?.email) {
      setUser(authUser);
      const { token, email, gender, intro, location, name, phone, _id, role } =
        authUser;

      getLogin(
        { email, gender, intro, location, name, phone, _id },
        token,
        true,
        role
      );

      setUser({
        user: { email, gender, intro, location, name, phone, _id },
        token: token,
        login: true,
        role: role,
      });
    }
  }, []);

  // console.log("user ", user);

  return { user, setUser };
}
