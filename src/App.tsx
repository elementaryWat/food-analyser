import React, { useEffect, useState } from 'react';
import NutrientResult from './components/NutrientResult';
import axios from 'axios';

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
          console.log(fileInput.files);
          formData.append(
            "photo",
            fileInput.files[0],
            fileInput.files[0].name
          );
        }
      } else {
        formData = JSON.stringify({ description });
      }
      const data = (await axios.post("http://localhost:3000/api/analyze-food", formData)).data;
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
