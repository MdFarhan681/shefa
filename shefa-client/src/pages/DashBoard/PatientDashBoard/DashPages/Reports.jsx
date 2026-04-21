import React, { useEffect, useState } from "react";
import useAuth from "../../../../hooks/useAuth";
import { IoDocumentText } from "react-icons/io5";
import { MdImage } from "react-icons/md";

const sampleReports = [
  {
    title: "Blood Test Report",
    date: "2026-04-10",
    image: "https://www.shutterstock.com/shutterstock/photos/159015356/display_1500/stock-photo-blood-test-results-isolated-on-white-background-159015356.jpg"
  },
  {
    title: "X-Ray Chest",
    date: "2026-03-22",
    image: "https://www.shutterstock.com/shutterstock/photos/159015356/display_1500/stock-photo-blood-test-results-isolated-on-white-background-159015356.jpg"
  },
  {
    title: "ECG Report",
    date: "2026-02-15",
    image: "https://www.shutterstock.com/shutterstock/photos/159015356/display_1500/stock-photo-blood-test-results-isolated-on-white-background-159015356.jpg"
  }
];

const Reports = () => {
  const { user: firebaseUser } = useAuth();

  const [reports, setReports] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedImage, setSelectedImage] = useState(null);

  // 🔥 Fetch MongoDB user
  useEffect(() => {
    if (!firebaseUser?.email) return;

    setLoading(true);

    fetch(`https://shefa-server.vercel.app/users/${firebaseUser.email}`)
      .then(res => res.json())
      .then(data => {
        const mongoReports =
          data?.medicalHistory?.reports?.map((r) => {
            return typeof r === "string"
              ? {
                  title: r,
                  date: "N/A",
                  image: data?.medicalHistory?.reportImage || ""
                }
              : r;
          }) || [];

        setReports(mongoReports);
        setLoading(false);
      })
      .catch(() => {
        setReports([]);
        setLoading(false);
      });
  }, [firebaseUser?.email]);

  if (loading) {
    return (
      <div className="text-center mt-10">
        <span className="loading loading-spinner text-primary"></span>
      </div>
    );
  }

  const finalData = reports.length > 0 ? reports : sampleReports;

  return (
    <div className="min-h-screen p-4 md:p-8 bg-gray-50">

      {/* HEADER */}
      <div className="bg-white p-5 rounded-2xl shadow mb-6">
        <h1 className="text-2xl font-bold text-blue-600 flex items-center gap-2">
          <IoDocumentText /> মেডিকেল রিপোর্ট
        </h1>
        <p className="text-gray-500">
          আপনার সকল রিপোর্ট
        </p>
      </div>

      {/* GRID */}
      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">

        {finalData.map((item, index) => (
          <div
            key={index}
            className="bg-white rounded-2xl shadow border overflow-hidden hover:shadow-lg transition"
          >

            {/* IMAGE */}
            <div className="relative">
              <img
                src={item.image || "https://via.placeholder.com/300"}
                className="w-full h-48 object-cover"
              />

              <div className="absolute top-2 right-2 bg-white/80 p-1 rounded-full">
                <MdImage className="text-blue-600" />
              </div>
            </div>

            {/* CONTENT */}
            <div className="p-4">

              <h2 className="font-bold text-lg">
                {item.title}
              </h2>

              <p className="text-sm text-gray-500">
                📅 {item.date}
              </p>

              <button
                onClick={() => setSelectedImage(item.image)}
                className="mt-3 w-full py-2 bg-blue-100 text-blue-700 rounded-lg"
              >
                View Details
              </button>

            </div>
          </div>
        ))}

      </div>

      {/* MODAL */}
      {selectedImage && (
        <div className="fixed inset-0 bg-black/80 flex items-center justify-center z-50">

          <div className="relative max-w-4xl w-full p-4">

            <button
              onClick={() => setSelectedImage(null)}
              className="absolute top-2 right-2 bg-white text-black px-3 py-1 rounded-full"
            >
              ✕
            </button>

            <img
              src={selectedImage}
              className="w-full max-h-[90vh] object-contain rounded-lg"
            />
          </div>

        </div>
      )}
    </div>
  );
};

export default Reports;