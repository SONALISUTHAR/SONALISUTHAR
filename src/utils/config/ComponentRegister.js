import Home from "../secure-route-master/secure-route/components/Home"
import Login from "../secure-route-master/secure-route/components/Login";

// Example Components
// import APIManagerStarter from "../utils/api-manager/Examples/APIManagerStarter";
// import ATasks from "../components/pages/Admin/ATasks";
// import ALogs from "../components/pages/Admin/ALogs";
// import AUser from "../components/pages/Admin/AUser";
// import ARoles from "../components/pages/Admin/ARoles";
// import JTEst from "../components/JTEst";

const routes = [
  {
    "path": "/",
    "component": Home,
    "auth":true
  },
  {
    "path": "/login",
    "component": Login,
    "auth":true
  },
 
]
export const getRoutes = ()=> routes;