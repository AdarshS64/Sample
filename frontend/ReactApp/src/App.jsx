import { createBrowserRouter,RouterProvider } from 'react-router-dom';
import Login from "./pages/Login"
import "./style.scss"
import HomeLayout from './pages/HomeLayout';
import EmployeeCreate from './pages/EmployeeCreate';

function App() {

  const router = createBrowserRouter([
    {
      path: "/",
      element: <Login />,
    },
{
      path: "/employee",
      element: <HomeLayout />,
      children: [
        {
          path: "create",
          element: <EmployeeCreate />,
        },
      ],
    },
  ]);
  return (
<><RouterProvider router={router}/></>
  )
}

export default App
