import { useEffect, useState } from "react";
import API from "../api/axios";
import Navbar from "../components/Navbar";

const EmergencySOS = () => {
  const user =
    JSON.parse(localStorage.getItem("user")) || {};

  const [form, setForm] = useState({
    medicineName: "",
    patientName: user.name || "",
    contactNumber: "",
    location: "",
    urgencyLevel: "HIGH",
    note: "",
  });

  const [requests, setRequests] = useState([]);

  const fetchRequests = async () => {
    try {
    const res = await API.get("/emergency/my-requests");
      setRequests(res.data.emergencyRequests);
    } catch (error) {
      alert("Failed to fetch SOS requests");
    }
  };

  useEffect(() => {
    fetchRequests();
  }, []);

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const createSOS = async (e) => {
    e.preventDefault();

    try {
      await API.post("/emergency/create", form);

      alert("SOS request created successfully");

      setForm({
        medicineName: "",
        patientName: user.name || "",
        contactNumber: "",
        location: "",
        urgencyLevel: "HIGH",
        note: "",
      });

      fetchRequests();
    } catch (error) {
      alert(error.response?.data?.message || "SOS failed");
    }
  };

  const statusColor = (status) => {
    if (status === "PENDING") return "bg-yellow-100 text-yellow-700";
    if (status === "ACCEPTED") return "bg-blue-100 text-blue-700";
    if (status === "RESERVED") return "bg-purple-100 text-purple-700";
    if (status === "COMPLETED") return "bg-green-100 text-green-700";
    if (status === "CANCELLED") return "bg-red-100 text-red-700";
    return "bg-gray-100 text-gray-700";
  };

  return (
    <>
      <Navbar />

      <div className="min-h-screen bg-gradient-to-br from-red-50 via-white to-blue-50 p-6">
        <div className="bg-gradient-to-r from-red-600 to-blue-700 text-white p-7 rounded-3xl shadow mb-8">
          <h1 className="text-4xl font-bold">
            Emergency SOS Request
          </h1>

          <p className="mt-2 text-red-100">
            Raise urgent medicine requests and track pharmacy response.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <form
            onSubmit={createSOS}
            className="bg-white p-6 rounded-3xl shadow space-y-4"
          >
            <h2 className="text-2xl font-bold text-red-600">
              Create SOS Request
            </h2>

            <input
              name="medicineName"
              placeholder="Medicine Name"
              value={form.medicineName}
              onChange={handleChange}
              className="w-full border p-3 rounded-lg"
              required
            />

            <input
              name="patientName"
              placeholder="Patient Name"
              value={form.patientName}
              onChange={handleChange}
              className="w-full border p-3 rounded-lg"
              required
            />

            <input
              name="contactNumber"
              placeholder="Contact Number"
              value={form.contactNumber}
              onChange={handleChange}
              className="w-full border p-3 rounded-lg"
              required
            />

            <input
              name="location"
              placeholder="Location"
              value={form.location}
              onChange={handleChange}
              className="w-full border p-3 rounded-lg"
              required
            />

            <select
              name="urgencyLevel"
              value={form.urgencyLevel}
              onChange={handleChange}
              className="w-full border p-3 rounded-lg"
            >
              <option value="LOW">LOW</option>
              <option value="MEDIUM">MEDIUM</option>
              <option value="HIGH">HIGH</option>
              <option value="CRITICAL">CRITICAL</option>
            </select>

            <textarea
              name="note"
              placeholder="Extra Note"
              value={form.note}
              onChange={handleChange}
              className="w-full border p-3 rounded-lg"
            />

            <button className="w-full bg-red-600 text-white py-3 rounded-lg hover:bg-red-700">
              🚨 Send SOS
            </button>
          </form>

          <div className="bg-white p-6 rounded-3xl shadow">
            <h2 className="text-2xl font-bold text-blue-700 mb-4">
              SOS Request Status
            </h2>

            <div className="space-y-4 max-h-[620px] overflow-y-auto">
              {requests.map((req) => (
                <div
                  key={req._id}
                  className="border p-5 rounded-2xl"
                >
                  <div className="flex justify-between items-center mb-3">
                    <h3 className="text-xl font-bold text-blue-700">
                      {req.medicineName}
                    </h3>

                    <span
                      className={`px-3 py-1 rounded-full text-sm font-semibold ${statusColor(
                        req.status
                      )}`}
                    >
                      {req.status}
                    </span>
                  </div>

                  <p>
                    <strong>Patient:</strong> {req.patientName}
                  </p>

                  <p>
                    <strong>Location:</strong> {req.location}
                  </p>

                  <p>
                    <strong>Urgency:</strong> {req.urgencyLevel}
                  </p>

                  <p>
                    <strong>Pharmacy:</strong>{" "}
                    {req.assignedPharmacy || "Not assigned"}
                  </p>

                  {req.note && (
                    <p>
                      <strong>Note:</strong> {req.note}
                    </p>
                  )}

                  {req.reservedUntil && (
                    <p className="text-purple-600 font-semibold mt-2">
                      Reserved Until:{" "}
                      {new Date(req.reservedUntil).toLocaleString()}
                    </p>
                  )}

                  <div className="mt-4 text-sm text-gray-500">
                    Created:{" "}
                    {new Date(req.createdAt).toLocaleString()}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default EmergencySOS;