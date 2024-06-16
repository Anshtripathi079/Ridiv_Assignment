import { Link } from "react-router-dom";

const Error = () => {
  return (
    <div className="h-screen w-full flex items-center justify-center text-3xl flex-col">
      <div> Error 404 : City Not Found</div>
      <Link to="/" className="text-lg underline mt-4 p-1">
        <span>Go Back</span>
      </Link>
    </div>
  );
};

export default Error;
