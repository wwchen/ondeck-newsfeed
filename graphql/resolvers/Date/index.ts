import { GraphQLScalarType, Kind } from "graphql";

// src: https://www.apollographql.com/docs/apollo-server/schema/custom-scalars/
export default new GraphQLScalarType({
  name: 'Date',
  description: 'Date custom scalar type',
  serialize(value) {
    return value.getTime(); // Convert outgoing Date to integer for JSON
  },
  parseValue(value) {
    return new Date(value); // Convert incoming integer to Date
  },
  parseLiteral(ast) {
    if (ast.kind === Kind.INT) {
      return new Date(parseInt(ast.value, 10)); // Convert hard-coded AST string to integer and then to Date
    }
    if (ast.kind === Kind.STRING) {
      return new Date(ast.value);
    }
    return null; // Invalid hard-coded value (not an integer)
  },
});