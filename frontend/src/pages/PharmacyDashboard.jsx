import { useEffect, useState } from "react";
import API from "../api/axios";
import Navbar from "../components/Navbar";

const PharmacyDashboard = () => {
  const [requests, setRequests] = useState([]);
  const [medicines, setMedicines] = useState([]);

  const [medicineForm, setMedicineForm] = useState({
    name: "",
    description: "",
    quantity: "",
    status: "AVAILABLE",
    location: "",
    pharmacyName: "Apollo Pharmacy",
    contactNumber: "",
    isRare: true,
  });

  const fetchRequests = async () => {
    const res = await API.get("/emergency/all");
    setRequests(res.data.emergencyRequests);
  };

  const fetchMedicines = async () => {
    const res = await API.get("/medicines/all");
    setMedicines(res.data.medicines);
  };

  useEffect(() => {
    fetchRequests();
    fetchMedicines();
  }, []);

  const handleChange = (e) => {
    setMedicineForm({
      ...medicineForm,
      [e.target.name]: e.target.value,
    });
  };

  const addMedicine = async (e) => {
    e.preventDefault();

    try {
      await API.post("/medicines/add", {
        ...medicineForm,
        quantity: Number(medicineForm.quantity),
      });

      alert("Medicine Added");

      setMedicineForm({
        name: "",
        description: "",
        quantity: "",
        status: "AVAILABLE",
        location: "",
        pharmacyName: "Apollo Pharmacy",
        contactNumber: "",
        isRare: true,
      });

      fetchMedicines();
    } catch (error) {
      alert(error.response?.data?.message || "Failed to add medicine");
    }
  };

  const acceptRequest = async (id) => {
    try {
      await API.put(`/emergency/accept/${id}`, {
        pharmacyName: "Apollo Pharmacy",
      });

      alert("Request Accepted");
      fetchRequests();
    } catch (error) {
      alert(error.response?.data?.message || "Accept failed");
    }
  };

  const reserveRequest = async (id) => {
    try {
      await API.put(`/emergency/reserve/${id}`);

      alert("Medicine Reserved");
      fetchRequests();
    } catch (error) {
      alert(error.response?.data?.message || "Reserve failed");
    }
  };

  const completeRequest = async (id) => {
    try {
      await API.put(`/emergency/complete/${id}`);

      alert("Request Completed");
      fetchRequests();
    } catch (error) {
      alert(error.response?.data?.message || "Complete failed");
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

      <div className="min-h-screen bg-gradient-to-br from-green-50 via-white to-blue-50 p-6">
        <div className="bg-gradient-to-r from-green-700 to-blue-700 text-white p-7 rounded-3xl shadow mb-8">
          <h1 className="text-4xl font-bold">Pharmacy Dashboard</h1>
          <p className="mt-2 text-green-100">
            Manage medicines and emergency SOS requests
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
          <form
            onSubmit={addMedicine}
            className="bg-white p-6 rounded-3xl shadow space-y-4"
          >
            <h2 className="text-2xl font-bold text-green-700">
              Add Medicine
            </h2>

            <input
              name="name"
              placeholder="Medicine Name"
              value={medicineForm.name}
              onChange={handleChange}
              className="w-full border p-3 rounded-lg"
              required
            />

            <input
              name="description"
              placeholder="Description"
              value={medicineForm.description}
              onChange={handleChange}
              className="w-full border p-3 rounded-lg"
            />

            <input
              name="quantity"
              type="number"
              placeholder="Quantity"
              value={medicineForm.quantity}
              onChange={handleChange}
              className="w-full border p-3 rounded-lg"
              required
            />

            <select
              name="status"
              value={medicineForm.status}
              onChange={handleChange}
              className="w-full border p-3 rounded-lg"
            >
              <option value="AVAILABLE">AVAILABLE</option>
              <option value="LOW_STOCK">LOW_STOCK</option>
              <option value="OUT_OF_STOCK">OUT_OF_STOCK</option>
            </select>

            <input
              name="location"
              placeholder="Location"
              value={medicineForm.location}
              onChange={handleChange}
              className="w-full border p-3 rounded-lg"
              required
            />

            <input
              name="contactNumber"
              placeholder="Contact Number"
              value={medicineForm.contactNumber}
              onChange={handleChange}
              className="w-full border p-3 rounded-lg"
              required
            />

            <button className="w-full bg-green-600 text-white py-3 rounded-lg hover:bg-green-700">
              Add Medicine
            </button>
          </form>

          <div className="bg-white p-6 rounded-3xl shadow">
            <h2 className="text-2xl font-bold text-blue-700 mb-4">
              Medicine Inventory
            </h2>

            <div className="space-y-3 max-h-[520px] overflow-y-auto">
              {medicines.map((med) => (
                <div key={med._id} className="border p-4 rounded-2xl">
                  <div className="flex justify-between">
                    <h3 className="font-bold text-lg text-blue-700">
                      {med.name}
                    </h3>

                    <span className="text-sm font-semibold text-green-700">
                      {med.status}
                    </span>
                  </div>

                  <p className="text-gray-600">{med.description}</p>

                  <p>
                    <strong>Qty:</strong> {med.quantity}
                  </p>

                  <p>
                    <strong>Location:</strong> {med.location}
                  </p>

                  <p>
                    <strong>Pharmacy:</strong> {med.pharmacyName}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="bg-white p-6 rounded-3xl shadow">
          <h2 className="text-2xl font-bold text-red-600 mb-4">
            Emergency SOS Requests
          </h2>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {requests.map((req) => (
              <div key={req._id} className="border p-5 rounded-2xl">
                <div className="flex justify-between mb-3">
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

                {req.reservedUntil && (
                  <p className="text-purple-600 font-semibold mt-2">
                    Reserved Until:{" "}
                    {new Date(req.reservedUntil).toLocaleString()}
                  </p>
                )}

                <div className="flex gap-3 mt-5 flex-wrap">
                  <button
                    onClick={() => acceptRequest(req._id)}
                    className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700"
                  >
                    Accept
                  </button>

                  <button
                    onClick={() => reserveRequest(req._id)}
                    className="bg-purple-600 text-white px-4 py-2 rounded-lg hover:bg-purple-700"
                  >
                    Reserve
                  </button>

                  <button
                    onClick={() => completeRequest(req._id)}
                    className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700"
                  >
                    Complete
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
};

export default PharmacyDashboard;