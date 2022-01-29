import { Module } from "@nestjs/common";
import { ConfigModule } from "@nestjs/config";
import { GraphQLModule } from "@nestjs/graphql";
import AppResolver from "./app.resolver";
import AppService from "./app.service";
import DateTimeScalar from "./scalars/datetime-scalar";

@Module({
  imports: [
    ConfigModule.forRoot({ expandVariables: true }),
    GraphQLModule.forRoot({
      typePaths: ["./src/**/*.graphql"],
      playground: true,
    }),
  ],
  controllers: [],
  providers: [AppService, AppResolver, DateTimeScalar],
})
class AppModule {}

export default AppModule;
