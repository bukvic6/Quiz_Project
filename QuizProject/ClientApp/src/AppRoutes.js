import HomePage from "./pages/HomePage";
import LoginPage from "./pages/LoginPage";
import Results from "./pages/Results";

const AppRoutes = [
  {
    path: '/home',
    element: <HomePage/>
  },
  {
    path: '/results',
    element: <Results/>
  }
];

export default AppRoutes;
