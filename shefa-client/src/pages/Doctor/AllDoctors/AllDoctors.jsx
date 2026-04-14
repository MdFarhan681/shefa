import React, { useEffect, useState } from "react";
import DoctorCard from "../../Shared/DoctorCard/DoctorCard";

const API_URL = "http://localhost:3000/doctors";

const categories = [
  "all",
  "স্ত্রী রোগ ও প্রসূতি বিশেষজ্ঞ",
  "হৃদরোগ ও মেডিসিন বিশেষজ্ঞ",
  "নবজাতক ও শিশু রোগ বিশেষজ্ঞ",
  "গাইনী ও ল্যাপারোস্কোপিক সার্জন",
  "হাড়-জোড় ও অর্থোপেডিক বিশেষজ্ঞ",
  "চর্ম ও যৌন রোগ বিশেষজ্ঞ",
  "মেডিসিন বিশেষজ্ঞ",
  "স্ত্রী রোগ বিশেষজ্ঞ",
  "লিভার ও গ্যাস্ট্রিক বিশেষজ্ঞ",
  "ইউরোলজি বিশেষজ্ঞ ও সার্জন",
  "মানসিক স্বাস্থ্য বিশেষজ্ঞ",
  "নাক-কান-গলা",
  "শিশু রোগ বিশেষজ্ঞ",
];

const AllDoctors = () => {
  const [doctors, setDoctors] = useState([]);
  const [selectedCat, setSelectedCat] = useState("all");

  const [search, setSearch] = useState("");
  const [gender, setGender] = useState("all");
  const [minFee, setMinFee] = useState("");
  const [maxFee, setMaxFee] = useState("");

  const [openCategory, setOpenCategory] = useState(false);

  const [loading, setLoading] = useState(false);

  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  const fetchDoctors = async (page = 1) => {
    setLoading(true);

    const params = new URLSearchParams({
      page,
      limit: 8,
      category: selectedCat,
      search,
      gender,
      minFee,
      maxFee,
    });

    try {
      const res = await fetch(`${API_URL}?${params.toString()}`);
      const data = await res.json();

      setDoctors(data.doctors || []);
      setCurrentPage(data.currentPage);
      setTotalPages(data.totalPages);
    } catch (err) {
      console.log(err);
      setDoctors([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchDoctors(1);
  }, []);

  useEffect(() => {
    const t = setTimeout(() => {
      fetchDoctors(1);
    }, 400);

    return () => clearTimeout(t);
  }, [search, gender, minFee, maxFee, selectedCat]);

  return (
    <div className="bg-gray-50 min-h-screen px-4 sm:px-6 lg:px-[7%]">

      {/* ================= SEARCH ================= */}
      <div className="p-3 sm:p-4 bg-white shadow sticky top-0 z-10 rounded-2xl">
        <input
          type="text"
          placeholder="🔍 Search doctor by name or ID..."
          className="w-full p-3 border rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-400"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>

      {/* ================= MAIN LAYOUT ================= */}
      <div className="flex flex-col lg:flex-row gap-4 sm:gap-6 p-3 sm:p-4">

        {/* ================= LEFT FILTER ================= */}
        <div className="w-full lg:w-1/4 bg-white p-4 rounded-xl shadow h-fit">

          <h2 className="text-lg font-bold mb-4">Filters</h2>

          {/* Gender + Fee row on mobile */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-1 gap-3">

            <select
              className="w-full border border-gray-300 p-2 rounded"
              value={gender}
              onChange={(e) => setGender(e.target.value)}
            >
              <option value="all">All Gender</option>
              <option value="male">Male</option>
              <option value="female">Female</option>
            </select>

            <div className="flex gap-2">
              <input
                type="number"
                placeholder="Min Fee"
                className="w-1/2 border border-gray-300 p-2 rounded"
                value={minFee}
                onChange={(e) => setMinFee(e.target.value)}
              />
              <input
                type="number"
                placeholder="Max Fee"
                className="w-1/2 border border-gray-300 p-2 rounded"
                value={maxFee}
                onChange={(e) => setMaxFee(e.target.value)}
              />
            </div>
          </div>

          {/* CATEGORY DROPDOWN */}
          <div className="mt-4">
            <button
              onClick={() => setOpenCategory(!openCategory)}
              className="!w-full my-btn hover:bg-blue-700"
            >
              Speciality ▼
            </button>

            {openCategory && (
              <div className="mt-2 max-h-60 overflow-y-auto border border-gray-300 rounded bg-white shadow">
                {categories.map((cat) => (
                  <button
                    key={cat}
                    onClick={() => {
                      setSelectedCat(cat);
                      setOpenCategory(false);
                    }}
                    className={`block w-full text-left px-3 py-2 hover:bg-blue-100 ${
                      selectedCat === cat ? "bg-blue-500 text-white" : ""
                    }`}
                  >
                    {cat === "all" ? "All Specialist" : cat}
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* ================= RIGHT SIDE ================= */}
        <div className="w-full lg:w-3/4">

          {/* HEADER */}
          <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center mb-4 gap-2">
            <h2 className="text-lg sm:text-xl font-bold">
              {selectedCat === "all" ? "All Doctors" : selectedCat}
            </h2>

            <span className="text-gray-500 text-sm">
              {doctors.length} doctors found
            </span>
          </div>

          {/* LOADING */}
          {loading ? (
            <p>Loading...</p>
          ) : doctors.length === 0 ? (
            <p>No doctors found</p>
          ) : (
            <>
              {/* GRID RESPONSIVE */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
                {doctors.map((doc) => (
                  <DoctorCard key={doc._id} doctor={doc} />
                ))}
              </div>

              {/* PAGINATION */}
              <div className="flex flex-wrap justify-center gap-2 mt-6">
                <button
                  disabled={currentPage === 1}
                  onClick={() => fetchDoctors(currentPage - 1)}
                  className=" sm:px-4 my-btn disabled:opacity-50"
                >
                  Prev
                </button>

                <span className="px-3 sm:px-4 py-2 text-sm sm:text-base">
                  {currentPage} / {totalPages}
                </span>

                <button
                  disabled={currentPage === totalPages}
                  onClick={() => fetchDoctors(currentPage + 1)}
                  className="sm:px-4 my-btn disabled:opacity-50"
                >
                  Next
                </button>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default AllDoctors;