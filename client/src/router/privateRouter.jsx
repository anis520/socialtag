import Home from "../layout/pages/Home";
import Profile from "../layout/pages/Profile";

import PrivateGard from "./PrivateGard";

// creat Private router
const privateRouter = [
  {
    element: <PrivateGard />,
    children: [
      { path: "/", element: <Home /> },
      { path: "/profile/:id", element: <Profile /> },
    ],
  },
];

// export router
export default privateRouter;
