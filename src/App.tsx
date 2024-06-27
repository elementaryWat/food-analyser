import React, { useState } from 'react';
import FoodForm from './components/FoodForm';
import NutrientResult from './components/NutrientResult';

const App: React.FC = () => {
  const [nutrientData, setNutrientData] = useState(null);

  const handleFoodAnalysis = async (description: string) => {
    try {
      const response = await fetch('http://localhost:3000/api/analyze-food', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ description }),
      });
      const data = await response.json();
      console.log(data);
      // setNutrientData(data);
    } catch (error) {
      console.error('Failed to fetch nutrient data:', error);
    }
  };

  return (
    <div className="flex justify-center items-center h-screen w-screen">
      <div className="p-6 flex flex-col items-center">
        <h1 className="text-3xl font-bold underline">
          Food Nutrient Analyzer
        </h1>
        <FoodForm onSubmit={handleFoodAnalysis} />
        <NutrientResult data={nutrientData} />
      </div>
    </div>
  );
};

export default App;
