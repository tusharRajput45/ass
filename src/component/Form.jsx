import React, { useState } from "react";
import axios from "axios";
import LocationSelector from "./LocationAndReviewSection";
import PropertyForm from "./PropertyForm";
import ImageUpload from "./ImageUpload";

const Form = () => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [phone, setPhone] = useState("");
  const [name, setName] = useState("Tushar Rajput");

  // new states for child data
  const [propertyData, setPropertyData] = useState({});
  const [location, setLocation] = useState(null);
  const [images, setImages] = useState([]);

  const formatPrice = (value) => {
    const numericValue = value.replace(/[^\d]/g, "");
    return numericValue.replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  };

  const handleChange = (e) => {
    const formattedValue = formatPrice(e.target.value);
    setPrice(formattedValue);
  };

  // handlers for child components
  const handlePropertyChange = (data) => {
    setPropertyData(data);
  };

  const handleLocationSelect = (loc) => {
    setLocation(loc);
  };

  const handleImagesUpload = (uploadedImages) => {
    setImages(uploadedImages);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const payload = {
      title,
      description,
      price: Number(price.replace(/,/g, "")),
      name,
      phone,
      property: propertyData,
      location,
      images,
    };

    try {
      const response = await axios.post(
        "http://localhost:3000/api/listings",
        payload
      );
      console.log("Saved successfully", response.data);
      // Reset form or navigate as needed
    } catch (error) {
      console.error("Error saving data", error);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="max-w-xl mx-auto space-y-8 p-6">
      {/* Selected Category & Property */}
      <div className="border border-gray-300 p-6 rounded-md bg-white">
        <div className="font-bold text-lg mb-1">SELECTED CATEGORY</div>
        <div className="text-sm text-gray-600 mb-5">
          Mobiles / Mobile Phones
          <a href="#" className="text-blue-600 underline ml-1">
            Change
          </a>
        </div>

        <PropertyForm onChange={handlePropertyChange} />

        {/* Title */}
        <label htmlFor="title" className="block font-semibold mt-6">
          Ad title *
        </label>
        <input
          type="text"
          id="title"
          name="title"
          maxLength={70}
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="w-full mt-1 p-2 border border-gray-300 rounded-md text-sm"
        />
        <div className="text-xs text-gray-500 mt-1">
          Mention key features (brand, model, age)
        </div>
        <div className="text-xs text-gray-500 text-right mt-1">
          {title.length} / 70
        </div>

        {/* Description */}
        <label htmlFor="description" className="block font-semibold mt-6">
          Description *
        </label>
        <textarea
          id="description"
          name="description"
          maxLength={4096}
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          className="w-full mt-1 p-2 border border-gray-300 rounded-md text-sm h-28 resize-y"
        />
        <div className="text-xs text-gray-500 mt-1">
          Include condition, features & reason for selling
        </div>
        <div className="text-xs text-gray-500 text-right mt-1">
          {description.length} / 4096
        </div>
      </div>

      {/* Price */}
      <div className="border border-gray-300 p-6 rounded-md bg-white">
        <h3 className="text-lg font-semibold mb-5">SET A PRICE</h3>
        <label htmlFor="price" className="block font-semibold mb-2">
          Price <span className="text-red-500">*</span>
        </label>
        <div className="flex items-center border border-blue-700 rounded px-3 py-2 max-w-xs">
          <span className="text-base mr-1">₹</span>
          <input
            id="price"
            name="price"
            type="text"
            placeholder="1,45,446"
            value={price}
            onChange={handleChange}
            className="w-full border-none outline-none text-base"
          />
        </div>
      </div>

      {/* Images */}
      <ImageUpload onUpload={handleImagesUpload} />

      {/* Location */}
      <div className="border border-gray-300 p-6 rounded-md bg-white">
        <div className="flex justify-between items-center border-b border-gray-300 pb-2 mb-4">
          <h3 className="text-lg font-semibold">CONFIRM YOUR LOCATION</h3>
        </div>
        <div className="flex space-x-4 mb-4 text-sm font-medium text-blue-600">
          <button type="button" className="border-b-2 border-blue-600">
            LIST
          </button>
          <button type="button" className="text-gray-500 hover:text-blue-600">
            CURRENT LOCATION
          </button>
        </div>
        <LocationSelector onSelect={handleLocationSelect} />
      </div>

      {/* Review & Submit */}
      <div className="border border-gray-300 p-6 rounded-md bg-white">
        <h3 className="text-lg font-semibold mb-4">REVIEW YOUR DETAILS</h3>
        <div className="flex items-center space-x-4 mb-4">
          <img
            src="https://via.placeholder.com/50"
            alt="user"
            className="w-12 h-12 rounded-full object-cover"
          />
          <div>
            <label className="text-sm font-semibold block">Name</label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="border border-gray-300 px-3 py-1 rounded w-full text-sm"
            />
            <div className="text-xs text-gray-500 mt-1">13 / 30</div>
          </div>
        </div>
        <div className="mb-3 text-sm">Let’s verify your account</div>
        <p className="text-sm text-gray-600 mb-2">
          We will send you a confirmation code by SMS on the next step.
        </p>
        <label className="block font-semibold text-sm mb-1">
          Mobile Phone Number *
        </label>
        <input
          type="tel"
          placeholder="+91"
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
          className="w-full border border-gray-300 px-3 py-2 rounded"
        />
        <button
          type="submit"
          className="mt-4 bg-green-300 text-white py-2 px-6 rounded"
        >
          Post now
        </button>
      </div>
    </form>
  );
};

export default Form;
