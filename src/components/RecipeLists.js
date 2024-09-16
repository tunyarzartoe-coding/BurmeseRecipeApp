import React, { useEffect } from 'react';
import { observer } from 'mobx-react-lite';
import RecipeStore from '../store/recipe';

const RecipeList = observer(() => {
  const { recipes, fetchRecipes, searchQuery, setSearchQuery } = RecipeStore;

  useEffect(() => {
    fetchRecipes(); // Fetch the recipes when the component mounts
  }, [fetchRecipes]);

  return (
    <div className="container my-5">
      <div className="row">
        {recipes.length ? ( // Use `recipes` array instead of `fetchRecipes` function
          recipes.map((recipe) => (
            <div className="col-12 col-sm-6 col-md-4 col-lg-3 mb-4" key={recipe.Guid}>
              <div className="card shadow-sm" style={{ height: '320px', borderRadius: '0.75rem' }}>
                <img
                  src={`images/${recipe.Name}.jpg`}
                  alt={`Recipe Image for ${recipe.Name}`}
                  onError={(e) => { e.target.src = 'images/default.png'; }} 
                  className="recipe-image card-img-top"
                  style={{ maxHeight: '200px', objectFit: 'cover' }}
                />
                <div className="card-body d-flex flex-column p-3">
                  <h5 className="recipe-title mb-2 text-truncate">{recipe.Name}</h5>
                  <a href={`/recipe-details/${recipe.Guid}`} className="btn mt-auto" style={{ backgroundColor: 'rgba(63, 195, 128, 1)' }}>
                    View Recipe
                  </a>
                </div>
              </div>
            </div>
          ))
        ) : (
          <div className="text-center mt-5 col-12">
            <h5>No recipes found</h5>
          </div>
        )}
      </div>
    </div>
  );
});

export default RecipeList;
