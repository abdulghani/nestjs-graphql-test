import { Module } from "@nestjs/common";
import { ConfigModule } from "@nestjs/config";
import { GraphQLModule } from "@nestjs/graphql";
import AppController from "./app.controller";
import AppResolver from "./app.resolver";
import AppService from "./app.service";
import DateTimeScalar from "./scalars/datetime-scalar";
import PubSubProvider from "./utils/pubsub-provider";
import TransportProvider from "./utils/transport-provider";

@Module({
  imports: [
    ConfigModule.forRoot({ expandVariables: true }),
    GraphQLModule.forRoot({
      typePaths: ["./src/**/*.graphql"],
      installSubscriptionHandlers: true,
      subscriptions: {
        "graphql-ws": true,
        "subscriptions-transport-ws": true,
      },
      playground: !["prod", "production"].includes(
        process.env.NODE_ENV?.toLowerCase?.() ?? ""
      ),
    }),
  ],
  controllers: [AppController],
  providers: [
    AppService,
    AppResolver,
    DateTimeScalar,
    TransportProvider,
    PubSubProvider,
  ],
})
class AppModule {}

export default AppModule;
