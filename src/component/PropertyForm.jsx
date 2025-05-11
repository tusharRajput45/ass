import React, { useState, useEffect } from "react";

/**
 * Props:
 * - onChange: function(formData)
 */
const PropertyForm = ({ onChange }) => {
  const [form, setForm] = useState({
    type: "",
    bhk: "",
    bathrooms: "",
    furnishing: "",
    projectStatus: "",
    listedBy: "",
    superBuiltUpArea: "",
    carpetArea: "",
    maintenance: "",
    totalFloors: "",
    floorNo: "",
    carParking: "",
    facing: "",
    projectName: "",
  });

  // Notify parent on any form change
  useEffect(() => {
    if (onChange) onChange(form);
  }, [form, onChange]);

  const handleChange = (field, value) => {
    setForm((prev) => ({ ...prev, [field]: value }));
  };

  return (
    <div className="space-y-4 max-w-xl mx-auto">
      {/* Type */}
      <div>
        <label className="block font-semibold mb-1">Type *</label>
        {[
          "Flat / Apartments",
          "Independent / Builder Floors",
          "Farm House",
          "House & Villa",
        ].map((type) => (
          <button
            key={type}
            type="button"
            onClick={() => handleChange("type", type)}
            className={`px-3 py-1 mr-2 mb-2 border border-gray-900 rounded ${
              form.type === type ? "bg-[#d9ebfe] text-black" : "bg-white"
            }`}
          >
            {type}
          </button>
        ))}
      </div>

      {/* BHK */}
      <div>
        <label className="block font-semibold mb-1">BHK</label>
        {[1, 2, 3, 4].map((n) => (
          <button
            key={n}
            type="button"
            onClick={() => handleChange("bhk", n)}
            className={`px-3 py-1 mr-2 mb-2 border border-gray-900 rounded ${
              form.bhk === n ? "bg-[#d9ebfe] text-black" : "bg-white"
            }`}
          >
            {n}
          </button>
        ))}
      </div>

      {/* Bathrooms */}
      <div>
        <label className="block font-semibold mb-1">Bathrooms</label>
        {[1, 2, 3, 4].map((n) => (
          <button
            key={n}
            type="button"
            onClick={() => handleChange("bathrooms", n)}
            className={`px-3 py-1 mr-2 mb-2 border border-gray-900 rounded ${
              form.bathrooms === n ? "bg-[#d9ebfe] text-black" : "bg-white"
            }`}
          >
            {n}
          </button>
        ))}
      </div>

      {/* Furnishing */}
      <div>
        <label className="block font-semibold mb-1">Furnishing</label>
        {["Furnished", "Semi-Furnished", "Unfurnished"].map((furnish) => (
          <button
            key={furnish}
            type="button"
            onClick={() => handleChange("furnishing", furnish)}
            className={`px-3 py-1 mr-2 border rounded ${
              form.furnishing === furnish
                ? "bg-[#d9ebfe] text-white"
                : "bg-white"
            }`}
          >
            {furnish}
          </button>
        ))}
      </div>

      {/* Project Status */}
      <div>
        <label className="block font-semibold mb-1">Project Status</label>
        {["New Launch", "Ready to Move", "Under Construction"].map(
          (status) => (
            <button
              key={status}
              type="button"
              onClick={() => handleChange("projectStatus", status)}
              className={`px-3 py-1 mr-2 border rounded ${
                form.projectStatus === status
                  ? "bg-[#d9ebfe] text-white"
                  : "bg-white"
              }`}
            >
              {status}
            </button>
          )
        )}
      </div>

      {/* Listed By */}
      <div>
        <label className="block font-semibold mb-1">Listed By</label>
        {["Builder", "Dealer", "Owner"].map((by) => (
          <button
            key={by}
            type="button"
            onClick={() => handleChange("listedBy", by)}
            className={`px-3 py-1 mr-2 border rounded ${
              form.listedBy === by ? "bg-[#d9ebfe] text-white" : "bg-white"
            }`}
          >
            {by}
          </button>
        ))}
      </div>

      {/* Text Fields */}
      {[
        { label: "Super Built-up Area (sqft)", field: "superBuiltUpArea" },
        { label: "Carpet Area (sqft)", field: "carpetArea" },
        { label: "Maintenance (Monthly)", field: "maintenance" },
        { label: "Total Floors", field: "totalFloors" },
        { label: "Floor No", field: "floorNo" },
        { label: "Project Name", field: "projectName" },
      ].map(({ label, field }) => (
        <div key={field}>
          <label className="block font-semibold mb-1">{label}</label>
          <input
            type="text"
            value={form[field]}
            onChange={(e) => handleChange(field, e.target.value)}
            className="w-full border border-gray-300 rounded px-3 py-2"
          />
        </div>
      ))}

      {/* Car Parking */}
      <div>
        <label className="block font-semibold mb-1">Car Parking</label>
        {[0, 1, 2, 3].map((n) => (
          <button
            key={n}
            type="button"
            onClick={() => handleChange("carParking", n)}
            className={`px-3 py-1 mr-2 border rounded ${
              form.carParking === n ? "bg-[#d9ebfe] text-white" : "bg-white"
            }`}
          >
            {n}
          </button>
        ))}
      </div>

      {/* Facing */}
      <div>
        <label className="block font-semibold mb-1">Facing</label>
        <select
          value={form.facing}
          onChange={(e) => handleChange("facing", e.target.value)}
          className="w-full border border-gray-300 rounded px-3 py-2"
        >
          <option value="">Select Facing</option>
          {["East", "West", "North", "South", "North-East", "South-West"].map(
            (face) => (
              <option key={face} value={face}>
                {face}
              </option>
            )
          )}
        </select>
      </div>
    </div>
  );
};

export default PropertyForm;
