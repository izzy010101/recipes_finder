import React, {useState, useEffect, useCallback} from 'react';
import {useNavigate} from 'react-router-dom';
import debounce from 'lodash.debounce';
import Footer from '../Footer.jsx';

function Recipes() {
    const [mealName, setMealName] = useState('');
    const [recipes, setRecipes] = useState([]);
    const [showDropdown, setShowDropdown] = useState(false);
    const [noResults, setNoResults] = useState(false);
    const [rateLimitExceeded, setRateLimitExceeded] = useState(false);

    const appId = import.meta.env.VITE_EDAMAM_APP_ID;
    const appKey = import.meta.env.VITE_EDAMAM_API_KEY;
    const navigate = useNavigate();


    const fetchRecipes = useCallback(debounce(async (query) => {
        try {
            const response = await fetch(`https://api.edamam.com/search?q=${query}&app_id=${appId}&app_key=${appKey}`);
            if (response.status === 429) {
                setRateLimitExceeded(true);
                return;
            }
            const data = await response.json();
            // console.log(data.hits);
            if (data.hits.length > 0) {
                setRecipes(data.hits.map(hit => hit.recipe));
                setShowDropdown(true);
                setNoResults(false);
                setRateLimitExceeded(false);
            } else {
                setRecipes([]);
                setShowDropdown(false);
                setNoResults(true);
            }
        } catch (error) {
            console.error('Error:', error);
            setShowDropdown(false);
            setNoResults(true);
        }
    }, 300), []);

    useEffect(() => {
        if (mealName.length > 0) {
            fetchRecipes(mealName);
        } else {
            setShowDropdown(false);
            setNoResults(false);
            setRateLimitExceeded(false);
        }
    }, [mealName, fetchRecipes]);


    const handleRecipeClick = (recipe) => {
        navigate(`${encodeURIComponent(recipe.uri)}`, {state: {recipe}});
    }

    return (
        <>
            <h1 className="text-2xl text-bold text-center m-4">Search for best recipe:</h1>
            <div className="h-screen flex flex-col items-center mt-4">
                <input
                    type="text"
                    value={mealName}
                    onChange={(e) => setMealName(e.target.value)}
                    placeholder="Search for a meal"
                    className="border border-gray-300 p-2 rounded-md w-1/4"
                />
                {noResults && <p className="text-red-500 mt-2">No recipes found. Please try another search.</p>}
                {showDropdown && (
                    <div
                        className="bg-white border border-gray-300 rounded-md mt-1 w-1/4 max-h-60 overflow-y-auto shadow-lg z-10">
                        {recipes.map((recipe, index) => (

                            <div key={index} className="p-2 hover:bg-gray-200 cursor-pointer"
                                 onClick={() => handleRecipeClick(recipe)}>
                                <h2 className="font-bold">{recipe.label}</h2>
                                <img src={recipe.image} alt={recipe.label} className="w-16 h-16 rounded-md"/>
                            </div>
                        ))}
                    </div>
                )}
            </div>
            <Footer/>
        </>

    );
}

export default Recipes;