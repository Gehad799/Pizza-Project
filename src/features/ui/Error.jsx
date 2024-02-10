import { useRouteError, useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
function Error() {
  const error = useRouteError();
  const navigate = useNavigate();
  return (
    <div>
      <h1>Something went wrong 😢</h1>
      <p>{error.data || error.message}</p>
      <Link
        onClick={() => navigate(-1)}
        className="text-blue-500 text-sm hover:underline hover:text-blue-700"
      >
        &larr; Go back
      </Link>
    </div>
  );
}
export default Error;
