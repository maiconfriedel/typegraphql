import "reflect-metadata";
import { buildSchema } from "type-graphql";
import { RecipeResolver } from "./resolvers/RecipeResolver";
import { ApolloServer } from "apollo-server";

async function bootstrap() {
  const schema = await buildSchema({
    resolvers: [RecipeResolver],
  });

  // Create the GraphQL server
  const server = new ApolloServer({
    schema,
    playground: true,
    cors: true,
  });

  // Start the server
  const { url } = await server.listen(3333);
  console.log(`Server is running, GraphQL Playground available at ${url}`);
}

bootstrap();
