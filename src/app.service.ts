import { Inject, Injectable } from "@nestjs/common";
import { ClientProxy } from "@nestjs/microservices";

@Injectable()
class AppService {
  constructor(@Inject("NATS_SERVICE") private readonly client: ClientProxy) {}

  getHello(): string {
    return "hello from service";
  }

  publish() {
    this.client.emit("inputUpdated", {});
  }
}

export default AppService;
