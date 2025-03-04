"use client";
import { useState } from "react";

const compressImage = (
  file,
  maxWidth = 500,
  maxHeight = 500,
  quality = 0.7
) => {
  return new Promise((resolve) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = (event) => {
      const img = new Image();
      img.src = event.target.result;
      img.onload = () => {
        const canvas = document.createElement("canvas");
        let width = img.width;
        let height = img.height;

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
    };
  });
};

const UploadFile = ({ onChange }) => {
  const [fileName, setFileName] = useState("");
  const [preview, setPreview] = useState("");

  const handleFileChange = async (event) => {
    const selectedFile = event.target.files[0];

    if (selectedFile) {
      setFileName(selectedFile.name);

      // Compress the image before converting to Base64
      const compressedBase64 = await compressImage(selectedFile);

      // Remove the prefix to store only raw Base64
      const base64String = compressedBase64.split(",")[1];

      // Update state and pass Base64 to parent
      setPreview(compressedBase64); // Show preview
      onChange(base64String);
    }
  };

  return (
    <div className="rounded-lg shadow-md mb-5">
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
    </div>
  );
};

export default UploadFile;
