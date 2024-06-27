import React, { useState } from 'react';

interface Props {
    onSubmit: (description: string) => void;
}

const FoodForm: React.FC<Props> = ({ onSubmit }) => {
    const [description, setDescription] = useState('');

    const handleSubmit = (event: React.FormEvent) => {
        event.preventDefault();
        onSubmit(description);
    };

    return (
        <div className="form-control w-full">
            <form onSubmit={handleSubmit}>
                <label className="label" htmlFor="food-input">
                    <span className="label-text">Enter your food description:</span>
                </label>
                <textarea
                    id="food-input"
                    className="input input-bordered w-full max-w-xs"
                    value={description}
                    onChange={e => setDescription(e.target.value)}
                    required
                />
                <button type="submit" className="btn btn-primary mt-4">
                    Analyze
                </button>
            </form>
        </div>
    );
};

export default FoodForm;
