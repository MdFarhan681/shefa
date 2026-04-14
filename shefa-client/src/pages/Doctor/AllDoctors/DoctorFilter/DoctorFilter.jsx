import React from "react";

const DoctorFilter = ({ filters, setFilters }) => {
  return (
    <div className="w-72 p-4 border-r space-y-4 bg-white">

      <h2 className="text-lg font-bold">Filter Doctors</h2>

      {/* Specialist */}
      <select
        className="select select-bordered w-full"
        onChange={(e) =>
          setFilters({ ...filters, specialist: e.target.value })
        }
      >
        <option value="">All Specialist</option>
        <option value="স্ত্রী রোগ ও প্রসূতি বিশেষজ্ঞ">স্ত্রী রোগ ও প্রসূতি বিশেষজ্ঞ</option>
        <option value="হৃদরোগ ও মেডিসিন বিশেষজ্ঞ">হৃদরোগ ও মেডিসিন বিশেষজ্ঞ</option>
        <option value="নবজাতক ও শিশু রোগ বিশেষজ্ঞ">নবজাতক ও শিশু রোগ বিশেষজ্ঞ</option>
        <option value="গাইনী ও ল্যাপারোস্কোপিক সার্জন">গাইনী ও ল্যাপারোস্কোপিক সার্জন</option>
        <option value="হাড়-জোড় ও অর্থোপেডিক বিশেষজ্ঞ">হাড়-জোড় ও অর্থোপেডিক বিশেষজ্ঞ</option>
        <option value="চর্ম ও যৌন রোগ বিশেষজ্ঞ">চর্ম ও যৌন রোগ বিশেষজ্ঞ</option>
        <option value="মেডিসিন বিশেষজ্ঞ">মেডিসিন বিশেষজ্ঞ</option>
        <option value="স্ত্রী রোগ বিশেষজ্ঞ">স্ত্রী রোগ বিশেষজ্ঞ</option>
        <option value="লিভার ও গ্যাস্ট্রিক বিশেষজ্ঞ">লিভার ও গ্যাস্ট্রিক বিশেষজ্ঞ</option>
        <option value="ইউরোলজি বিশেষজ্ঞ ও সার্জন">ইউরোলজি বিশেষজ্ঞ ও সার্জন</option>
        <option value="মানসিক স্বাস্থ্য বিশেষজ্ঞ">মানসিক স্বাস্থ্য বিশেষজ্ঞ</option>
        <option value="নাক-কান-গলা">নাক-কান-গলা</option>
        <option value="শিশু রোগ বিশেষজ্ঞ">শিশু রোগ বিশেষজ্ঞ</option>
        
      </select>

      {/* Gender */}
      <select
        className="select select-bordered w-full"
        onChange={(e) =>
          setFilters({ ...filters, gender: e.target.value })
        }
      >
        <option value="">All Gender</option>
        <option value="male">Male</option>
        <option value="female">Female</option>
      </select>

      {/* Fee */}
      <input
        type="number"
        placeholder="Min Fee"
        className="input input-bordered w-full"
        onChange={(e) =>
          setFilters({ ...filters, minFee: e.target.value })
        }
      />

      <input
        type="number"
        placeholder="Max Fee"
        className="input input-bordered w-full"
        onChange={(e) =>
          setFilters({ ...filters, maxFee: e.target.value })
        }
      />

      {/* Experience */}
      <input
        type="number"
        placeholder="Min Experience"
        className="input input-bordered w-full"
        onChange={(e) =>
          setFilters({ ...filters, minExp: e.target.value })
        }
      />

      {/* Rating */}
      <select
        className="select select-bordered w-full"
        onChange={(e) =>
          setFilters({ ...filters, rating: e.target.value })
        }
      >
        <option value="">All Rating</option>
        <option value="4">4+ ⭐</option>
        <option value="3">3+ ⭐</option>
      </select>

      {/* Reset */}
      <button
        className="btn btn-sm btn-error w-full"
        onClick={() =>
          setFilters({
            specialist: "",
            gender: "",
            minFee: "",
            maxFee: "",
            minExp: "",
            rating: "",
          })
        }
      >
        Reset Filters
      </button>
    </div>
  );
};

export default DoctorFilter;