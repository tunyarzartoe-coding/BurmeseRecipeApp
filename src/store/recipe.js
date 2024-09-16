import { makeAutoObservable, runInAction } from 'mobx';
import recipesData from '../data/BurmeseRecipes.json'; 

class RecipeStore {
  recipes = [];
  searchQuery = '';

  constructor() {
    makeAutoObservable(this);
    this.fetchRecipes = this.fetchRecipes.bind(this); 
  }

  async fetchRecipes() {
    try {
      const fetchedRecipes = await new Promise((resolve) => {
        setTimeout(() => resolve(recipesData), 500); 
      });

      runInAction(() => {
        this.recipes = fetchedRecipes;
      });
    } catch (error) {
      console.error('Failed to fetch recipes:', error);
    }
  }

  get filteredRecipes() {
    if (this.searchQuery.trim() === '') {
      return this.recipes;
    }
    return this.recipes.filter(recipe =>
      recipe.Name.toLowerCase().includes(this.searchQuery.toLowerCase())
    );
  }

  setSearchQuery(query) {
    this.searchQuery = query;
  }
}

export default new RecipeStore();
