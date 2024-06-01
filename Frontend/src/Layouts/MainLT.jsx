import { Outlet } from "react-router-dom";
import Header from "../Components/Header/Header";
import Footer from "../Components/Footer/Footer";
import useUser from "../Hooks/useUser";

// desc: This is the main layout component of the application.
export default function MainLT() {
  useUser();
  return (
    <>
      {/* website header */}
      <Header />

      {/* website main content */}
      <main className="">
        <Outlet />
      </main>

      {/* website footer */}
      <Footer />
    </>
  );
}
