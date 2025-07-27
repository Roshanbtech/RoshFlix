const Error = ({ message }) => (
  <>
    <div className="bg-red-100 text-red-800 p-3 rounded mb-4 text-center">
      {message || "Something went wrong!"}
    </div>
  </>
);

export default Error;
