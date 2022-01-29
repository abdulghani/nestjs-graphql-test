import { Inject } from "@nestjs/common";
import { Args, Query, Resolver, Subscription } from "@nestjs/graphql";
import { ClientProxy } from "@nestjs/microservices";
import { PubSub } from "graphql-subscriptions";
import AppService from "./app.service";

@Resolver()
class AppResolver {
  constructor(
    private readonly appService: AppService,
    @Inject("NATS_SERVICE") private readonly natsClient: ClientProxy,
    @Inject("PUB_SUB") private readonly pubSub: PubSub
  ) {}

  @Query("hello")
  public async hello() {
    return this.appService.getHello();
  }

  @Query("now")
  public async now() {
    return new Date();
  }

  @Query("input")
  public async input(@Args("data") data: string) {
    this.natsClient.emit("inputUpdated", { inputUpdated: data });
    return data;
  }

  @Subscription("inputUpdated")
  public async inputUpdated() {
    const res = this.pubSub.asyncIterator("inputUpdated");
    return res;
  }
}

export default AppResolver;
