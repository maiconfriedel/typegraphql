import "reflect-metadata";
import { buildSchema } from "type-graphql";
import { ApolloServer } from "apollo-server";
import { Container } from "typedi";

async function bootstrap() {
  const schema = await buildSchema({
    resolvers: [__dirname + "/resolvers/**/*.{ts,js}"],
    container: Container,
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
