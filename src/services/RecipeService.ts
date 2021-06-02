import { Service } from "typedi";
import { AddRecipeInput, Recipe } from "../models/Recipe";

@Service()
export class RecipeService {
  private recipesCollection: Recipe[] = [];

  async getAll(
    title: string | undefined,
    startIndex: number,
    endIndex: number
  ) {
    // sample implementation
    let recipes = this.recipesCollection;
    if (title) {
      recipes = recipes.filter((recipe) => recipe.title === title);
    }
    return recipes.slice(startIndex, endIndex);
  }

  async getOne(id: number) {
    let recipe = this.recipesCollection.find((a) => a.id === id);

    if (!recipe) throw new Error("Recipe not found!");

    return recipe;
  }

  async create(newRecipeData: AddRecipeInput) {
    // sample implementation
    const recipe = new Recipe();

    recipe.id = Math.floor(Math.random() * (10000 - 1) + 1);
    recipe.title = newRecipeData.title;
    recipe.description = newRecipeData.description;
    recipe.creationDate = new Date();

    this.recipesCollection.push(recipe);
    return recipe;
  }
}
