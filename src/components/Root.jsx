import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navigation from "./Navigation.jsx";
import App from "../App.jsx";
import Recipes from "./pages/Recipes.jsx";
import RecipeCard from "./pages/RecipeCard.jsx";
import {useState} from "react";

function Root() {
    const [recipes, setRecipes] = useState([]);

    const routes = [
        {path: '/', name: 'Home', Component: App},
        {path: '/recipe', name: 'Recipe', Component: () => <Recipes setRecipes={setRecipes} />},
        {path: '/recipe/:id', name: 'RecipeCard', Component: () => <RecipeCard recipes={recipes} />},

    ]
    return (
        <Router>
            <div className="todo-app-container">
                <Navigation />

                <div className="content">
                    <Routes>
                        {routes.map(({path, Component}) => (
                            <Route key={path}
                                   path={path}
                                   element={<Component />} />
                        ))}
                    </Routes>
                </div>
            </div>
        </Router>
    );
}

export default Root;