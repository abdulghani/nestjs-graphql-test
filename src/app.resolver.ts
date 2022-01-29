import { Args, Query, Resolver } from "@nestjs/graphql";
import AppService from "./app.service";

@Resolver()
class AppResolver {
  constructor(private readonly appService: AppService) {}

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
    console.log("DATA", { data });
    return data;
  }
}

export default AppResolver;
