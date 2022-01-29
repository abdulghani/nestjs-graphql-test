import { Injectable } from "@nestjs/common";

@Injectable()
class AppService {
  getHello(): string {
    return "hello from service";
  }
}

export default AppService;
