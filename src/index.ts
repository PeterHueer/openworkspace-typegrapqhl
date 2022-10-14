import { ApolloServer } from "@apollo/server";
import { startStandaloneServer } from "@apollo/server/standalone";
import "reflect-metadata";
// A schema is a collection of type definitions (hence "typeDefs")
// that together define the "shape" of queries that are executed against
// your data.
const typeDefs = `#graphql
scalar Date
# Comments in GraphQL strings (such as this one) start with the hash (#) symbol.

# This "Recipe" type defines the queryable fields for every recipe in our data source.
type Recipe {
    id: ID!
    title: String!
    description: String
    creationDate: Date!
    ingredients: [String!]!
}

# The "Query" type is special: it lists all of the available queries that
# clients can execute, along with the return type for each. In this
# case, the "recipes" query returns an array of zero or more Recipes (defined above).
type Query {
    books: [Book]
    recipes: [Recipe!]! 
}
`;

const recipes = [
  {
    description: "Desc 1",
    title: "Recipe 1",
    ratings: [0, 3, 1],
    creationDate: new Date("2018-04-11"),
  },
  {
    description: "Desc 2",
    title: "Recipe 2",
    ratings: [4, 2, 3, 1],
    creationDate: new Date("2018-04-15"),
  },
  {
    description: "Desc 3",
    title: "Recipe 3",
    ratings: [5, 4],
    creationDate: new Date(),
  },
];

// Resolvers define the technique for fetching the types defined in the
// schema. This resolver retrieves recipes from the "recipes" array above.
const resolvers = {
  Query: {
    recipes: () => recipes,
  },
};

// The ApolloServer constructor requires two parameters: your schema
// definition and your set of resolvers.
const server = new ApolloServer({
  typeDefs,
  resolvers,
});

const { url } = await startStandaloneServer(server, { listen: { port: 4000 } });

console.log(`🚀 Server listening at: ${url}`);
