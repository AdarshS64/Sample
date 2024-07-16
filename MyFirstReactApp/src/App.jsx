import CreateEmployee from "./pages/CreateEmployee";
import Login from "./pages/Login";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import ErrorPage from "./pages/ErrorPage";
import EmployeeList from "./pages/EmployeeList";
import HomeLayout from "./pages/HomeLayout";
import EditEmployee from "./pages/EditEmployee";
import EmployeeDetails from "./pages/EmployeeDetails";
import { Provider } from "react-redux";
import store from "./store/store";

const App = () => {
  const route = createBrowserRouter([
    {
      path: "/",
      element: <Login />,
      errorElement: <ErrorPage />,
    },

    {
      path: "/employee",
      element: <HomeLayout />,
      children: [
        {
          index: true,
          element: <EmployeeList />,
        },
        { path: "create", element: <CreateEmployee /> },
        { path: "edit/:id", element: <EditEmployee /> },
        { path: "details/:id", element: <EmployeeDetails /> },
      ],
    },
  ]);
  //   const [flag, setFlag] = useState(false);

  //   const handleLogin = () => {
  //     setFlag(true);
  //   };

  return (
    <>
      <Provider store={store}>
        <div>
          {/* {flag ? <CreateEmployee /> : <Login handleSubmit={handleLogin} />} */}
          <RouterProvider router={route}></RouterProvider>
        </div>
      </Provider>
    </>
  );
};

export default App;
