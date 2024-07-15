import { Link } from "react-router-dom";

const ErrorPage = () => {
  return (
    <>
      <div>
        <h1>In Wrong page</h1>
        <Link to={"/"}>Redirect Back </Link>
      </div>
    </>
  );
};

export default ErrorPage;
