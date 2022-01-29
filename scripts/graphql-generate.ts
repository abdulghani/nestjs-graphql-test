import { GraphQLDefinitionsFactory } from "@nestjs/graphql";
import path from "path";

async function generate() {
  console.log("GENERATING GRAPHQL TYPE DEFINITIONS...");
  const factory = new GraphQLDefinitionsFactory();

  const rootDir = process.cwd();
  await factory.generate({
    typePaths: [`${rootDir}/src/**/*.graphql`],
    path: path.join(rootDir, "./src/grapqhl.schema.ts"),
    outputAs: "interface",
    emitTypenameField: true,
    enumsAsTypes: false,
    watch: false,
    debug: false,
    federation: false,
    skipResolverArgs: false,
    customScalarTypeMapping: {
      DateTime: "string",
    },
  });

  console.log("GENERATING GRAPHQL TYPE DEFINITIONS DONE");
}

generate();
