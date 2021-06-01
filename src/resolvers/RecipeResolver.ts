import { Arg, Args, Ctx, Mutation, Query, Resolver } from "type-graphql";
import {
  AddRecipeInput,
  GetRecipeArg,
  GetRecipesArgs,
  Recipe,
} from "../models/Recipe";

@Resolver(Recipe)
export class RecipeResolver {
  private recipesCollection: Recipe[] = [];

  @Query(() => [Recipe])
  async recipes(@Args() { title, startIndex, endIndex }: GetRecipesArgs) {
    // sample implementation
    let recipes = this.recipesCollection;
    if (title) {
      recipes = recipes.filter((recipe) => recipe.title === title);
    }
    return recipes.slice(startIndex, endIndex);
  }

  @Query(() => Recipe || undefined)
  async recipe(@Args() { id }: GetRecipeArg) {
    // sample implementation
    let recipe = this.recipesCollection.find((a) => a.id == id);

    if (!recipe) throw new Error("Recipe not found!");

    return recipe;
  }

  @Mutation()
  addRecipe(
    @Arg("data") newRecipeData: AddRecipeInput,
    @Ctx() ctx: any
  ): Recipe {
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
