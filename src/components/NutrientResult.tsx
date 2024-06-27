import React from 'react';

interface NutrientData {
    carbohydrates: number;
    proteins: number;
    fats: number;
    calories: number;
}

interface Props {
    data: NutrientData | null;
}

const NutrientResult: React.FC<Props> = ({ data }) => {
    if (!data) return <p>No data to display.</p>;

    return (
        <div className="card w-96 bg-base-100 shadow-xl">
            <div className="card-body">
                <h2 className="card-title">Nutrient Breakdown</h2>
                <p>Carbohydrates: {data.carbohydrates}g</p>
                <p>Proteins: {data.proteins}g</p>
                <p>Fats: {data.fats}g</p>
                <p>Calories: {data.calories} kcal</p>
            </div>
        </div>
    );
};

export default NutrientResult;
