import { useState } from "react";
import API from "../api/axios";
import Navbar from "../components/Navbar";

const SearchMedicine = () => {
  const [search, setSearch] = useState("");
  const [medicines, setMedicines] = useState([]);
  const [searched, setSearched] = useState(false);

  const handleSearch = async () => {
    try {
      const response = await API.get(
        `/medicines/search?name=${search}`
      );

      setMedicines(response.data.medicines);
      setSearched(true);
    } catch (error) {
      alert("Search Failed");
    }
  };

  const statusColor = (status) => {
    if (status === "AVAILABLE") return "bg-green-100 text-green-700";
    if (status === "LOW_STOCK") return "bg-yellow-100 text-yellow-700";
    if (status === "OUT_OF_STOCK") return "bg-red-100 text-red-700";
    return "bg-gray-100 text-gray-700";
  };

  return (
    <>
      <Navbar />

      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-green-50 p-6">
        <div className="bg-gradient-to-r from-blue-700 to-green-600 text-white p-7 rounded-3xl shadow mb-8">
          <h1 className="text-4xl font-bold">
            Search Medicines
          </h1>

          <p className="mt-2 text-blue-100">
            Find rare medicines and pharmacy availability instantly.
          </p>
        </div>

        <div className="bg-white p-6 rounded-3xl shadow mb-8">
          <div className="flex flex-col md:flex-row gap-4">
            <input
              type="text"
              placeholder="Enter medicine name..."
              className="flex-1 p-3 border rounded-xl"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />

            <button
              onClick={handleSearch}
              className="bg-blue-600 text-white px-8 py-3 rounded-xl hover:bg-blue-700"
            >
              Search
            </button>
          </div>
        </div>

        {searched && medicines.length === 0 && (
          <div className="bg-white p-8 rounded-3xl shadow text-center">
            <h2 className="text-2xl font-bold text-red-600">
              Medicine Not Found
            </h2>

            <p className="text-gray-600 mt-2">
              You can raise an Emergency SOS request for this medicine.
            </p>
          </div>
        )}

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {medicines.map((medicine) => (
            <div
              key={medicine._id}
              className="bg-white p-6 rounded-3xl shadow hover:shadow-lg"
            >
              <div className="flex justify-between items-start mb-3">
                <h2 className="text-2xl font-bold text-blue-700">
                  {medicine.name}
                </h2>

                <span
                  className={`px-3 py-1 rounded-full text-sm font-semibold ${statusColor(
                    medicine.status
                  )}`}
                >
                  {medicine.status}
                </span>
              </div>

              <p className="text-gray-600 mb-3">
                {medicine.description}
              </p>

              <p>
                <strong>Pharmacy:</strong> {medicine.pharmacyName}
              </p>

              <p>
                <strong>Location:</strong> {medicine.location}
              </p>

              <p>
                <strong>Quantity:</strong> {medicine.quantity}
              </p>

              <p>
                <strong>Contact:</strong> {medicine.contactNumber}
              </p>

              {medicine.isRare && (
                <p className="mt-3 text-purple-600 font-semibold">
                  Rare Medicine
                </p>
              )}
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default SearchMedicine;