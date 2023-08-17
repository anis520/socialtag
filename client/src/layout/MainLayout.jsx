import { RouterProvider } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import loadinggif from "../assets/loading.gif";
import router from "../router/router";
import { useSelector } from "react-redux";
import { useEffect } from "react";
const MainLayout = () => {
  const { loading } = useSelector((state) => state.auth);

  return (
    <>
      {loading && (
        <div className="fixed top-0 left-0 w-screen h-screen bg-slate-600 bg-opacity-80 z-40 flex items-center justify-center">
          <img
            src={loadinggif}
            alt=""
            className="w-40 h-40   md:w-64  md:h-64 object-cover rounded-full "
          />
        </div>
      )}
      <ToastContainer position="top-right" />
      <RouterProvider router={router} />
    </>
  );
};

export default MainLayout;
