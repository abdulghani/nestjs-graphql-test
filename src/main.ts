import { ConfigService } from "@nestjs/config";
import { NestFactory } from "@nestjs/core";
import { FastifyAdapter } from "@nestjs/platform-fastify";
import AppModule from "./app.module";

async function main() {
  const app = await NestFactory.create(AppModule, new FastifyAdapter());
  const configService = app.get(ConfigService);
  const PORT = configService.get<string>("PORT")!;

  app.listen(PORT);
}

main();
