import React, { useState } from 'react';
import NutrientResult from './components/NutrientResult';

const App: React.FC = () => {
  const [description, setDescription] = useState("");
  const [nutrientData, setNutrientData] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const handleFoodAnalysis = async () => {
    try {
      setIsLoading(true);
      const response = await fetch('http://localhost:3000/api/analyze-food', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ description }),
      });
      const data = await response.json();
      console.log(data);
      setNutrientData(data);
    } catch (error) {
      console.error('Failed to fetch nutrient data:', error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-background p-4">
      <h1 className="text-3xl font-bold mb-4 text-foreground">Macronutrient Breakdown</h1>
      <div className="card w-full bg-card shadow-lg">
        <div className="card-body p-6">
          <h2 className="card-title text-primary text-xl mb-4">Food Description</h2>
          <textarea
            className="w-full p-2 mb-4 border border-input rounded-lg bg-background text-foreground"
            placeholder="Enter the description of the plate"
            onChange={(e) => setDescription(e.target.value)}
          >
          </textarea>
          <button className="btn btn-primary mt-4" onClick={handleFoodAnalysis} disabled={isLoading || !description}>
            {isLoading ? <span className="spinner" /> : "Analyze"}
          </button>
          <NutrientResult data={nutrientData} />
        </div>
      </div>
    </div>
  );
};

export default App;
