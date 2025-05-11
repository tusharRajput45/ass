import React, { useState, useEffect } from "react";

const locationData = {
  "Himachal Pradesh": {
    Bhota: ["Morsu", "Bazaar Road"],
    Shimla: ["Lakkar Bazar", "Mall Road"],
  },
  Delhi: {
    "South Delhi": ["Saket", "Hauz Khas"],
    "Central Delhi": ["Connaught Place", "Karol Bagh"],
  },
  Maharashtra: {
    Mumbai: ["Andheri", "Bandra", "Dadar"],
    Pune: ["Kothrud", "Hinjewadi"],
  },
  Karnataka: {
    Bengaluru: ["Indiranagar", "Whitefield", "Koramangala"],
    Mysuru: ["VV Mohalla", "Chamundi Hill"],
  },
};

/**
 * Props:
 * - onSelect: function({ state, city, neighborhood })
 */
const LocationSelector = ({ onSelect }) => {
  const [state, setState] = useState("");
  const [city, setCity] = useState("");
  const [neighborhood, setNeighborhood] = useState("");

  // Notify parent whenever selection changes
  useEffect(() => {
    if (onSelect) {
      onSelect({ state, city, neighborhood });
    }
  }, [state, city, neighborhood, onSelect]);

  const handleStateChange = (e) => {
    setState(e.target.value);
    setCity("");
    setNeighborhood("");
  };

  const handleCityChange = (e) => {
    setCity(e.target.value);
    setNeighborhood("");
  };

  return (
    <div className="space-y-4">
      {/* State */}
      <div>
        <label className="block font-semibold mb-1">State *</label>
        <select
          value={state}
          onChange={handleStateChange}
          className="w-full border border-gray-300 rounded px-3 py-2"
        >
          <option value="">Select State</option>
          {Object.keys(locationData).map((stateName) => (
            <option key={stateName} value={stateName}>
              {stateName}
            </option>
          ))}
        </select>
      </div>

      {/* City */}
      {state && (
        <div>
          <label className="block font-semibold mb-1">City *</label>
          <select
            value={city}
            onChange={handleCityChange}
            className="w-full border border-gray-300 rounded px-3 py-2"
          >
            <option value="">Select City</option>
            {Object.keys(locationData[state]).map((cityName) => (
              <option key={cityName} value={cityName}>
                {cityName}
              </option>
            ))}
          </select>
        </div>
      )}

      {/* Neighborhood */}
      {city && (
        <div>
          <label className="block font-semibold mb-1">Neighbourhood *</label>
          <select
            value={neighborhood}
            onChange={(e) => setNeighborhood(e.target.value)}
            className="w-full border border-gray-300 rounded px-3 py-2"
          >
            <option value="">Select Neighbourhood</option>
            {locationData[state][city].map((hood) => (
              <option key={hood} value={hood}>
                {hood}
              </option>
            ))}
          </select>
        </div>
      )}
    </div>
  );
};

export default LocationSelector;
