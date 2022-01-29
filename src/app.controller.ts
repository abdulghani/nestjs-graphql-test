import { Controller, Inject } from "@nestjs/common";
import { EventPattern } from "@nestjs/microservices";
import { PubSub } from "graphql-subscriptions";

@Controller()
class AppController {
  constructor(@Inject("PUB_SUB") private readonly pubSub: PubSub) {}

  @EventPattern("inputUpdated")
  async inputUpdated(data: any) {
    this.pubSub.publish("inputUpdated", data);
  }
}

export default AppController;
