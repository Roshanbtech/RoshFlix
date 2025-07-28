const Error = ({ message }) => {
  let displayMsg = "Something went wrong!";

  if (typeof message === "string") {
    if (message.toLowerCase().includes("request limit")) {
      displayMsg = "Oops! We've reached our daily movie data limit. Please try again tomorrow.";
    } else if (message.toLowerCase().includes("401")) {
      displayMsg = "Unable to fetch movie data at this time. Please try again later.";
    } else if (message.toLowerCase().includes("network")) {
      displayMsg = "Network error. Please check your connection.";
    } else {
      displayMsg = message;
    }
  }

  return (
    <div className="bg-red-100 text-red-800 p-3 rounded mb-4 text-center font-[Orbitron] text-lg">
      {displayMsg}
    </div>
  );
};

export default Error;
