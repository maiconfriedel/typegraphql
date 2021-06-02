import { Max, Min } from "class-validator";
import { ArgsType, Field, ID, InputType, Int, ObjectType } from "type-graphql";

@ObjectType()
export class Recipe {
  @Field((type) => ID)
  id: number;

  @Field()
  title: string;

  @Field({ nullable: true })
  description?: string;

  @Field()
  creationDate: Date;

  @Field((type) => [String])
  ingredients: string[];
}

@ArgsType()
export class GetRecipesArgs {
  @Field((type) => Int, { defaultValue: 0 })
  @Min(0)
  skip: number;

  @Field((type) => Int)
  @Min(1)
  @Max(50)
  take = 25;

  @Field({ nullable: true })
  title?: string;

  // helpers - index calculations
  get startIndex(): number {
    return this.skip;
  }
  get endIndex(): number {
    return this.skip + this.take;
  }
}

@ArgsType()
export class GetRecipeArg {
  @Field(() => Int, { nullable: false })
  id: number;
}

@InputType({ description: "New recipe data" })
export class AddRecipeInput implements Partial<Recipe> {
  @Field()
  title: string;

  @Field({ nullable: true })
  description?: string;
}
