import { Login } from "../layout/pages/Login";
import Register from "../layout/pages/Register";
import PublicGard from "./PublicGard";

// creat public router
const publicRouter = [
  {
    element: <PublicGard />,
    children: [
      { path: "/login", element: <Login /> },
      { path: "/register", element: <Register /> },
    ],
  },
];

// export router
export default publicRouter;
