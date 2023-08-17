import { useEffect } from "react";

import "./App.css";
import MainLayout from "./layout/MainLayout";
import { useDispatch } from "react-redux";
import { userMe } from "./features/Auth/authapiSlice";

function App() {
  const dispatch = useDispatch();
  // const { loading } = useSelector((state) => state.auth);

  useEffect(() => {
    if (localStorage.getItem("user")) {
      dispatch(userMe());
    }
  }, [dispatch]);

  return (
    <>
      <MainLayout />
    </>
  );
}

export default App;
