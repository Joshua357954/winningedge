"use client";
import { useState, useEffect } from "react";

const compressImage = (
  file,
  maxWidth = 500,
  maxHeight = 500,
  quality = 0.7
) => {
  return new Promise((resolve, reject) => {
    if (!file) return reject("No file provided");

    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = (event) => {
      const img = new Image();
      img.src = event.target.result;
      img.onload = () => {
        const canvas = document.createElement("canvas");
        let { width, height } = img;

        // Resize image
        if (width > maxWidth || height > maxHeight) {
          if (width > height) {
            height *= maxWidth / width;
            width = maxWidth;
          } else {
            width *= maxHeight / height;
            height = maxHeight;
          }
        }

        canvas.width = width;
        canvas.height = height;
        const ctx = canvas.getContext("2d");
        ctx.drawImage(img, 0, 0, width, height);

        // Convert to compressed Base64
        const compressedBase64 = canvas.toDataURL("image/jpeg", quality);
        resolve(compressedBase64);
      };
      img.onerror = () => reject("Image load error");
    };
    reader.onerror = () => reject("File reading error");
  });
};

const UploadFile = ({ value, onChange }) => {
  const [fileName, setFileName] = useState("");

  useEffect(() => {
    if (!value) setFileName(""); // Clear file name if value is reset
  }, [value]);

  const handleFileChange = async (event) => {
    const selectedFile = event.target.files[0];

    if (!selectedFile) return;

    if (!selectedFile.type.startsWith("image/")) {
      alert("Please select a valid image file.");
      return;
    }

    setFileName(selectedFile.name);

    try {
      const compressedBase64 = await compressImage(selectedFile);
      const base64String = compressedBase64.split(",")[1];

      onChange(base64String); // Pass Base64 to parent
    } catch (error) {
      console.error("Error compressing image:", error);
    }
  };

  return (
    <div className="rounded-lg shadow-md mb-3 ">
      <p className="text-md text-red-600 my-3">
        Upload the receipt of your deposit
      </p>
      <input
        type="file"
        accept="image/*"
        onChange={handleFileChange}
        className="mb-2"
      />
      {fileName && (
        <p className="text-sm text-gray-600">Selected: {fileName}</p>
      )}
      {/* {value && (
        <img
          src={`data:image/jpeg;base64,${value}`}
          alt="Preview"
          className="mt-2 w-32 h-32 object-cover rounded"
        />
      )} */}
    </div>
  );
};

export default UploadFile;
