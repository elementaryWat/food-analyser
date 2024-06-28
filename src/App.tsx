import React, { useEffect, useState } from 'react';
import NutrientResult from './components/NutrientResult';
import axios from 'axios';
import imageCompression from 'browser-image-compression';

async function compressImage(file: File) {
  const options = {
    maxSizeMB: 1, // (max file size in MB)
    maxWidthOrHeight: 1920, // (compressed files will scale down by width or height, keeping the aspect ratio)
    useWebWorker: true, // (optional, use multi-threading for better performance)
  };

  try {
    const compressedFile = await imageCompression(file, options);
    console.log('Compressed file:', compressedFile);
    console.log('File size before compression:', file.size);
    console.log('File size after compression:', compressedFile.size);
    return compressedFile; // Return the compressed image file
  } catch (error) {
    console.error('Error during image compression:', error);
    throw error; // Rethrow or handle error as needed
  }
}

const App: React.FC = () => {
  const [description, setDescription] = useState("");
  const [isDisabled, setIsDisabled] = useState(false);
  const [nutrientData, setNutrientData] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isPhotoMode, setIsPhotoMode] = useState(false);
  const [photoFile, setPhotoFile] = useState<File | null>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files && e.target.files[0];
    if (file && (file.type === 'image/png' || file.type === 'image/jpeg')) {
      setPhotoFile(file);
    } else {
      setPhotoFile(null);
      throw new Error('Invalid file format. Only PNG and JPEG files are allowed.');
    }
  };


  const handleFoodAnalysis = async () => {
    try {
      setIsLoading(true);
      let formData;
      if (isPhotoMode) {
        formData = new FormData();
        const fileInput = document.getElementById('photo-upload') as HTMLInputElement;
        if (fileInput && fileInput.files && fileInput.files[0]) {
          const file = fileInput.files[0];
          if (file.size > 1024 * 1024) {
            const compressedFile = await compressImage(file);
            formData.append("photo", compressedFile, compressedFile.name);
          } else {
            formData.append("photo", file, file.name);
          }
        }
      } else {
        formData = JSON.stringify({ description });
      }
      const data = (await axios.post("https://food-analyser-api.vercel.app/api/analyze-food", formData)).data;
      setNutrientData(data);
    } catch (error) {
      console.error('Failed to fetch nutrient data:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleToggle = () => {
    if (isPhotoMode) {
      setPhotoFile(null);
    }
    setIsPhotoMode(!isPhotoMode);
  };


  useEffect(() => {
    setIsDisabled(isLoading || (!isPhotoMode && !description) || (isPhotoMode && !photoFile));
  }, [isLoading, isPhotoMode, description, photoFile]);




  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-background p-4">
      <h1 className="text-3xl font-bold mb-4 text-foreground">Macronutrient Breakdown</h1>
      <div className="card w-full bg-card shadow-lg">
        <div className="card-body p-6">
          <h2 className="card-title text-primary text-xl mb-4">Food Description</h2>
          <div className="form-control">
            <label className="label cursor-pointer">
              <span className="label-text">Enable Photo Mode</span>
              <input type="checkbox" className="toggle" defaultChecked={isPhotoMode} onChange={handleToggle} />
            </label>
          </div>
          {isPhotoMode ? (
            <div id="photo-input" className="w-full mb-4">
              <input
                type="file" id="photo-upload"
                className="w-full p-2 border border-input rounded-lg bg-background text-foreground"
                accept=".png, .jpg, .jpeg"
                onChange={handleFileChange} />
            </div>
          ) : (
            <div id="text-input" className="w-full mb-4">
              <textarea
                className="w-full p-2 border border-input rounded-lg bg-background text-foreground"
                placeholder="Enter the description of the plate"
                onChange={(e) => setDescription(e.target.value)}
              ></textarea>
            </div>
          )}
          <button className="btn btn-primary mt-4" onClick={handleFoodAnalysis} disabled={isDisabled}>
            {isLoading ? <span className="spinner" /> : "Analyze"}
          </button>
          <NutrientResult data={nutrientData} />
        </div>
      </div>
    </div>
  );
};

export default App;
