import React from 'react';
import Alert from './Alert';

interface NutrientData {
    description?: string;
    carbohydrates: number;
    proteins: number;
    fats: number;
    calories: number;
}

interface Props {
    data: NutrientData | null;
}

const NutrientResult: React.FC<Props> = ({ data }) => {
    if (!data) return null;
    if ((Object.keys(data).length) === 0) return <Alert message="Invalid food information input." />

    return (
        <>
            {data.description && <h2 className="text-primary text-2xl">{data.description}</h2>}
            <div className="mt-4">
                <h3 className="text-secondary mb-2">Macronutrients</h3>
                <div className="grid grid-cols-3 gap-4">
                    <div className="bg-accent text-black p-4 rounded-lg text-center">
                        <h4 className="font-bold">Carbohydrates</h4>
                        <p className="text-lg">{data.carbohydrates}g</p>
                    </div>
                    <div className="bg-accent text-black p-4 rounded-lg text-center">
                        <h4 className="font-bold">Proteins</h4>
                        <p className="text-lg">{data.proteins}g</p>
                    </div>
                    <div className="bg-accent text-black p-4 rounded-lg text-center">
                        <h4 className="font-bold">Fats</h4>
                        <p className="text-lg">{data.fats}g</p>
                    </div>
                </div>
            </div>
            <div className="mt-4">
                <h3 className="text-secondary mb-2">Calories</h3>
                <div className="bg-primary text-black p-4 rounded-lg text-center">
                    <p className="text-2xl font-bold">{data.calories} kcal</p>
                </div>
            </div>
        </>
    );
};

export default NutrientResult;
