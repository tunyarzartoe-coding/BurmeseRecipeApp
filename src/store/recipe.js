import { makeAutoObservable } from 'mobx';
import recipesData from '../assets/recipes.json';

class RecipeStore {
  recipes = [];
  searchQuery = '';
  currentPage = 1;
  pageSize = 8;

  constructor() {
    makeAutoObservable(this);
    this.recipes = recipesData; 
  }

  get filteredRecipes() {
    if (this.searchQuery.trim() === '') {
      return this.recipes;
    }
    return this.recipes.filter(recipe =>
      recipe.name.toLowerCase().includes(this.searchQuery.toLowerCase())
    );
  }

  setSearchQuery(query) {
    this.searchQuery = query;
  }

  setPage(page) {
    this.currentPage = page;
  }

  get paginatedRecipes() {
    const startIndex = (this.currentPage - 1) * this.pageSize;
    return this.filteredRecipes.slice(startIndex, startIndex + this.pageSize);
  }

  get totalPages() {
    return Math.ceil(this.filteredRecipes.length / this.pageSize);
  }
}

export default new RecipeStore();
