import React from 'react';
import useRecipes from './hooks/useRecipes';
import backgroundImage from './assets/images/home_bg.jpg';
import './index.css';
import Footer from './components/Footer';

const App = () => {
    const {recipes, loading, error} = useRecipes('salad');
    // console.log(recipes);

    return (<>
            <div className="App">
                <div
                    className="flex h-80 w-full bg-white bg-contain bg-no-repeat"
                    style={{
                        backgroundImage: `url(${backgroundImage})`, backgroundPosition: 'right'
                    }}
                >

                <span className="text-lg text-center flex flex-col gap-4  px-10 w-2/3 justify-center">
                    <h1 className="font-playwrite text-4xl p-6">Recipe Finder</h1>
                    The recipe finder app helps users discover various recipes and displays them in a grid layout, allowing easy browsing. Each recipe card includes an image, ingredients, and calorie information, making it simple to find and prepare new dishes. It’s a convenient tool for meal planning and exploring culinary options.
                </span>
                    {/*<span className="w-1/2"></span>*/}
                </div>


                <div className="bg-[#ffdca3] pt-8 pb-8">
                    <h1 className="mt-6 mb-16 font-bold text-4xl text-center">Our Popular Salad Recipes:</h1>
                    {loading && <p className="text-center">Loading...</p>}
                    {error && <p className="text-red-500 text-center">{error}</p>}
                    <div
                        className="bg-[#ffdca3] recipe-list grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 m-4 place-items-center">
                        {recipes.map((recipe, index) => (<div key={index}
                                                              className="recipe-card bg-white p-4 rounded-lg shadow-md flex flex-col justify-between h-[400px] w-[300px] overflow-hidden">
                                <h2 className="font-semibold text-xl text-center truncate">{recipe.label}</h2>
                                <img
                                    src={recipe.image}
                                    alt={recipe.label}
                                    className="w-full h-40 object-cover rounded-md mt-2"
                                />
                                <div className="flex-grow text-sm px-2">
                                    <p className="font-bold mb-2 text-center">Ingredients:</p>
                                    <ul className="list-disc list-inside overflow-y-auto max-h-24">
                                        {recipe.ingredientLines.map((ingredient, index) => (
                                            <li key={index}>{ingredient}</li>))}
                                    </ul>
                                </div>
                                <p className="text-sm text-center">
                                    <span className="font-bold">Calories:</span>&nbsp;
                                    <span>{Math.round(recipe.calories)} kcal</span>
                                </p>
                            </div>))}
                    </div>
                </div>
            </div>
            <Footer/>
        </>
    );
};

export default App;
