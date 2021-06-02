import { Arg, Args, Ctx, Mutation, Query, Resolver } from "type-graphql";
import {
  AddRecipeInput,
  GetRecipeArg,
  GetRecipesArgs,
  Recipe,
} from "../models/Recipe";
import { Service } from "typedi";
import { RecipeService } from "../services/RecipeService";

@Service()
@Resolver(Recipe)
export class RecipeResolver {
  constructor(private readonly recipeService: RecipeService) {}

  @Query(() => [Recipe])
  async recipes(@Args() { title, startIndex, endIndex }: GetRecipesArgs) {
    return this.recipeService.getAll(title, startIndex, endIndex);
  }

  @Query(() => Recipe || undefined)
  async recipe(@Args() { id }: GetRecipeArg) {
    return this.recipeService.getOne(id);
  }

  @Mutation(() => Recipe)
  async addRecipe(
    @Arg("data") newRecipeData: AddRecipeInput,
    @Ctx() ctx: any
  ): Promise<Recipe> {
    return this.recipeService.create(newRecipeData);
  }
}
