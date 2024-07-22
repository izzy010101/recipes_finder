import { useState, useEffect, useCallback } from 'react';

const appId = import.meta.env.VITE_EDAMAM_APP_ID;
const appKey = import.meta.env.VITE_EDAMAM_API_KEY;

const useRecipes = (initialQuery = 'salad') => {
    const [recipes, setRecipes] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const fetchRecipes = useCallback(async (query) => {
        setLoading(true);
        setError(null);

        try {
            const response = await fetch(`https://api.edamam.com/search?q=${query}&app_id=${appId}&app_key=${appKey}&from=0&to=30`);
            if (response.status === 429) {
                setError('Rate limit exceeded. Please try again later.');
                return;
            }
            const data = await response.json();
            const { hits } = data;

            if (hits.length > 0) {
                const fetchedRecipes = hits.map(hit => hit.recipe);
                localStorage.setItem('recipes', JSON.stringify(fetchedRecipes));
                setRecipes(fetchedRecipes);
            } else {
                setRecipes([]);
            }
        } catch (error) {
            console.error('Error:', error);
            setError('An error occurred while fetching recipes.');
        } finally {
            setLoading(false);
        }
    }, []);

    useEffect(() => {
        const storedRecipes = localStorage.getItem('recipes');
        if (storedRecipes) {
            setRecipes(JSON.parse(storedRecipes));
            setLoading(false);
        } else {
            fetchRecipes(initialQuery);
        }
    }, [fetchRecipes, initialQuery]);

    return { recipes, loading, error };
};

export default useRecipes;
