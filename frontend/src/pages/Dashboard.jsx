import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";
import API from "../api/axios";

const Dashboard = () => {
  const navigate = useNavigate();

  const user =
    JSON.parse(localStorage.getItem("user")) || {};

  const [totalMedicines, setTotalMedicines] = useState(0);
  const [totalSOS, setTotalSOS] = useState(0);
  const [completedSOS, setCompletedSOS] = useState(0);
  const [recentRequests, setRecentRequests] = useState([]);

  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        const medicinesRes = await API.get("/medicines/all");
        const sosRes = await API.get("/emergency/all");

        const medicines = medicinesRes.data.medicines || [];
        const requests = sosRes.data.emergencyRequests || [];

        setTotalMedicines(medicines.length);
        setTotalSOS(requests.length);

        setCompletedSOS(
          requests.filter((r) => r.status === "COMPLETED").length
        );

        setRecentRequests(requests.slice(0, 5));
      } catch (error) {
        console.log(error);
      }
    };

    fetchDashboardData();
  }, []);

  return (
    <>
      <Navbar />

      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-green-50 p-8">
        <div className="bg-gradient-to-r from-blue-700 to-green-600 text-white p-8 rounded-3xl shadow-lg mb-8">
          <h1 className="text-4xl font-bold">
            Rare Medicine Locator
          </h1>

          <p className="mt-2 text-blue-100">
            Emergency Medicine Search & Reservation System
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <div className="bg-white p-6 rounded-3xl shadow">
            <p className="text-gray-500">Total Medicines</p>
            <h2 className="text-3xl font-bold text-blue-700">
              {totalMedicines}
            </h2>
          </div>

          <div className="bg-white p-6 rounded-3xl shadow">
            <p className="text-gray-500">SOS Requests</p>
            <h2 className="text-3xl font-bold text-red-600">
              {totalSOS}
            </h2>
          </div>

          <div className="bg-white p-6 rounded-3xl shadow">
            <p className="text-gray-500">Completed</p>
            <h2 className="text-3xl font-bold text-green-600">
              {completedSOS}
            </h2>
          </div>

          <div className="bg-white p-6 rounded-3xl shadow">
            <p className="text-gray-500">Logged In As</p>
            <h2 className="text-2xl font-bold text-purple-600">
              {user.role}
            </h2>
          </div>
        </div>

        <h2 className="text-2xl font-bold text-gray-800 mb-4">
          Quick Actions
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <button
            onClick={() => navigate("/search")}
            className="bg-white p-8 rounded-3xl shadow hover:shadow-xl text-left border-t-4 border-blue-600"
          >
            <h2 className="text-xl font-bold text-blue-700">
              🔍 Search Medicine
            </h2>

            <p className="text-gray-600 mt-2">
              Find medicine availability from pharmacies.
            </p>
          </button>

          <button
            onClick={() => navigate("/sos")}
            className="bg-white p-8 rounded-3xl shadow hover:shadow-xl text-left border-t-4 border-red-600"
          >
            <h2 className="text-xl font-bold text-red-600">
              🚨 Emergency SOS
            </h2>

            <p className="text-gray-600 mt-2">
              Raise urgent medicine requests.
            </p>
          </button>

          {user.role === "PHARMACY" && (
            <button
              onClick={() => navigate("/pharmacy")}
              className="bg-white p-8 rounded-3xl shadow hover:shadow-xl text-left border-t-4 border-green-600"
            >
              <h2 className="text-xl font-bold text-green-700">
                🏥 Pharmacy Dashboard
              </h2>

              <p className="text-gray-600 mt-2">
                Manage medicines and SOS requests.
              </p>
            </button>
          )}
        </div>

        <div className="bg-white p-6 rounded-3xl shadow">
          <h2 className="text-2xl font-bold text-gray-800 mb-4">
            Recent Activity
          </h2>

          {recentRequests.length === 0 ? (
            <p className="text-gray-500">
              No recent SOS requests found.
            </p>
          ) : (
            <div className="space-y-4">
              {recentRequests.map((req) => (
                <div
                  key={req._id}
                  className="flex justify-between items-center border-b pb-3"
                >
                  <div>
                    <p className="font-semibold">
                      {req.medicineName}
                    </p>

                    <p className="text-sm text-gray-500">
                      Patient: {req.patientName}
                    </p>
                  </div>

                  <span
                    className={`px-3 py-1 rounded-full text-sm font-semibold ${
                      req.status === "COMPLETED"
                        ? "bg-green-100 text-green-700"
                        : req.status === "RESERVED"
                        ? "bg-purple-100 text-purple-700"
                        : req.status === "ACCEPTED"
                        ? "bg-blue-100 text-blue-700"
                        : req.status === "CANCELLED"
                        ? "bg-red-100 text-red-700"
                        : "bg-yellow-100 text-yellow-700"
                    }`}
                  >
                    {req.status}
                  </span>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default Dashboard;