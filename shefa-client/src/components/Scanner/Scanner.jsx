import React from "react";
import Tesseract from "tesseract.js";
import { extractMedicineInfo } from "../../utils/extractMedicineInfo"; // ✅ FIX

const Scanner = ({ setResult }) => {
  const preprocessImage = (file) => {
    return new Promise((resolve) => {
      const img = new Image();
      img.src = URL.createObjectURL(file);

      img.onload = () => {
        const canvas = document.createElement("canvas");
        const ctx = canvas.getContext("2d");

        canvas.width = img.width;
        canvas.height = img.height;

        ctx.drawImage(img, 0, 0);

        const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
        const data = imageData.data;

        for (let i = 0; i < data.length; i += 4) {
          const avg = (data[i] + data[i + 1] + data[i + 2]) / 3;
          data[i] = data[i + 1] = data[i + 2] = avg;
        }

        ctx.putImageData(imageData, 0, 0);

        canvas.toBlob((blob) => resolve(blob));
      };
    });
  };

  const handleImage = async (e) => {
    const file = e.target.files[0];
    if (!file) return; // ✅ safety

    const processed = await preprocessImage(file);

    const { data: { text } } = await Tesseract.recognize(processed, "eng", {
      tessedit_char_whitelist:
        "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789.-",
    });

    console.log("OCR Text:", text);

    const extracted = extractMedicineInfo(text);

    console.log("Extracted:", extracted); // ✅ debug

    setResult(extracted);
  };

  return (

        <input
      type="file"
      accept="image/*"
      capture="environment"
      onChange={handleImage}
    />

  );
};

export default Scanner;