import React, { useState, useEffect } from "react";
import { v4 as uuidv4 } from "uuid";
import { DndProvider, useDrag, useDrop } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";

/**
 * DraggableImage
 * Props:
 *  - image: { id, file, url, type }
 *  - index: number
 *  - moveImage(fromIdx, toIdx)
 *  - handleRemoveImage(id)
 */
const DraggableImage = ({ image, index, moveImage, handleRemoveImage }) => {
  const [{ isDragging }, drag] = useDrag({
    type: "image",
    item: { index },
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
  });

  const [, drop] = useDrop({
    accept: "image",
    hover: (dragged) => {
      if (dragged.index !== index) {
        moveImage(dragged.index, index);
        dragged.index = index;
      }
    },
  });

  return (
    <div
      ref={(node) => drag(drop(node))}
      className={`relative w-24 h-24 border border-gray-300 rounded overflow-hidden flex items-center justify-center bg-white ${
        isDragging ? "opacity-50" : ""
      }`}
    >
      <img
        src={image.url}
        alt={image.type}
        className="w-full h-full object-cover"
      />

      <button
        onClick={(e) => {
          e.stopPropagation();
          handleRemoveImage(image.id);
        }}
        className="absolute top-1 right-1 bg-gray-500 text-white rounded-full text-xs px-2"
      >
        ×
      </button>

      {image.type === "cover" && (
        <div className="absolute bottom-1 left-1 bg-blue-800 text-white text-xs px-1 py-0.5 rounded">
          Cover
        </div>
      )}
    </div>
  );
};

/**
 * ImageUploadGrid
 * Props:
 *  - onUpload: (imagesArray) => void
 */
const ImageUploadGrid = ({ onUpload }) => {
  const [images, setImages] = useState([]);

  // Assign “cover” to the first, “simple” to the rest
  const retype = (list) =>
    list.map((img, idx) => ({
      ...img,
      type: idx === 0 ? "cover" : "simple",
    }));

  // Notify parent whenever images change
  useEffect(() => {
    onUpload?.(images);
  }, [images, onUpload]);

  // Handle new uploads
  const handleImageUpload = (e) => {
    const files = Array.from(e.target.files).slice(0, 12 - images.length);
    const newImgs = files.map((file, idx) => ({
      id: uuidv4(),
      file,
      url: URL.createObjectURL(file),
      // If no existing images and this is the first new file, mark cover
      type: images.length === 0 && idx === 0 ? "cover" : "simple",
    }));

    setImages((prev) => retype([...prev, ...newImgs]));
    e.target.value = ""; // reset so same file can be reselected
  };

  // Remove an image
  const handleRemoveImage = (id) => {
    setImages((prev) => retype(prev.filter((img) => img.id !== id)));
  };

  // Drag & drop reorder
  const moveImage = (fromIdx, toIdx) => {
    setImages((prev) => {
      const copy = [...prev];
      const [moved] = copy.splice(fromIdx, 1);
      copy.splice(toIdx, 0, moved);
      return retype(copy);
    });
  };

  return (
    <DndProvider backend={HTML5Backend}>
      <div className="p-6">
        <h2 className="text-lg font-semibold mb-4">Upload up to 12 photos</h2>
        <div className="grid grid-cols-4 gap-4">
          {images.map((img, idx) => (
            <DraggableImage
              key={img.id}
              image={img}
              index={idx}
              moveImage={moveImage}
              handleRemoveImage={handleRemoveImage}
            />
          ))}

          {images.length < 12 &&
            Array.from({ length: 12 - images.length }).map((_, idx) =>
              idx === 0 ? (
                <label
                  key="uploader"
                  htmlFor="image-upload"
                  className="w-24 h-24 border-2 border-dashed border-gray-300 rounded flex flex-col items-center justify-center cursor-pointer hover:bg-gray-50"
                >
                  <span className="text-2xl">📷+</span>
                  <span className="text-xs">Add Photo</span>
                  <input
                    id="image-upload"
                    type="file"
                    accept="image/*"
                    multiple
                    onChange={handleImageUpload}
                    className="hidden"
                  />
                </label>
              ) : (
                <div
                  key={idx}
                  className="w-24 h-24 border border-gray-200 rounded bg-gray-100"
                />
              )
            )}
        </div>

        {images.length === 0 && (
          <p className="text-sm text-red-500 mt-2">
            At least one photo is required
          </p>
        )}
      </div>
    </DndProvider>
  );
};

export default ImageUploadGrid;
