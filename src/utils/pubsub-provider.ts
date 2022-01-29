import { FactoryProvider } from "@nestjs/common";
import { PubSub } from "graphql-subscriptions";

const PubSubProvider: FactoryProvider<PubSub> = {
  provide: "PUB_SUB",
  useFactory: () => new PubSub(),
};

export default PubSubProvider;
