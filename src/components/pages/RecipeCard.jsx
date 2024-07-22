import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import Footer from '../Footer';

function RecipeCard() {
    const location = useLocation();
    const { recipe } = location.state;
    const navigateBack = useNavigate()

    // console.log(recipe);

    const capitalizeFirstLetter = (str) => {
        if (typeof str !== 'string' || str.length === 0) {
            return '';
        }
        return str.charAt(0).toUpperCase() + str.slice(1);
    };


    return (
        <>
        <div className="flex flex-col items-center m-6">
            <h1 className="text-4xl font-bold mb-4">{recipe.label}</h1>
            {/*here to display what I want from recipe*/}
            <div className="flex flex-col gap-6 items-center m-6">
                <img src={recipe.image} alt={recipe.label} className="w-[400px] rounded-md mb-4"/>
                <div className="text-lg w-1/2 text-center">
                    <p className="font-bold mb-2">Ingredients:</p>
                    <ul className="list-disc list-inside">
                        {recipe.ingredientLines.map((ingredient, index) => (
                            <li key={index}>{ingredient}</li>
                        ))}
                    </ul>
                </div>
                <p className="text-lg">
                    <span className="font-bold">Calories:</span>&nbsp;
                    <span>{Math.round(recipe.calories)} kcal</span>
                </p>
                <p className="text-lg">
                    <span className="font-bold">Cuisine:&nbsp;</span>
                    <span>{recipe.cuisineType.map(cuisine => capitalizeFirstLetter(cuisine)).join(', ')}</span>
                </p>

                <div className="mt-4">
                    <p className="text-red-500 text-lg font-bold">Cautions:</p>
                    <ul className="list-disc list-inside">
                        {recipe.cautions.map((caution, index) => (
                            <li key={index}>{caution}</li>
                        ))}
                    </ul>
                </div>
            </div>
            <button
                onClick={() => navigateBack(-1)}
                className="bg-[#df6f35] hover:bg-amber-700 font-semibold mt-4 px-4 py-2 text-white rounded-md"
            >
                Go Back
            </button>
        </div>
        <Footer />
        </>

    );
}

export default RecipeCard;
