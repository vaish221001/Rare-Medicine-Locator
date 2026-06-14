import { useNavigate } from "react-router-dom";

const Navbar = () => {
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem("user")) || {};

  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    navigate("/");
  };

  return (
    <div className="bg-white shadow-md px-6 py-4 flex justify-between items-center sticky top-0 z-50">
      <h1
        onClick={() => navigate("/dashboard")}
        className="text-2xl font-bold text-blue-700 cursor-pointer"
      >
        💊 RareMed
      </h1>

      <div className="flex gap-5 items-center text-gray-700 font-medium">
        <button onClick={() => navigate("/dashboard")} className="hover:text-blue-600">
          Dashboard
        </button>

        <button onClick={() => navigate("/search")} className="hover:text-blue-600">
          Search
        </button>

        <button onClick={() => navigate("/sos")} className="hover:text-red-600">
          SOS
        </button>

        {user.role === "PHARMACY" && (
          <button onClick={() => navigate("/pharmacy")} className="hover:text-green-600">
            Pharmacy
          </button>
        )}

        <span className="bg-blue-50 text-blue-700 px-3 py-1 rounded-full text-sm">
          {user.role}
        </span>

        <button
          onClick={logout}
          className="bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600"
        >
          Logout
        </button>
      </div>
    </div>
  );
};

export default Navbar;