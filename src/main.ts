import { NestFactory } from "@nestjs/core";
import { MicroserviceOptions, Transport } from "@nestjs/microservices";
import { FastifyAdapter } from "@nestjs/platform-fastify";
import dotenv from "dotenv";
import AppModule from "./app.module";

async function main() {
  dotenv.config();
  const app = await NestFactory.create(AppModule, new FastifyAdapter());

  // NESTJS HYBRID APP
  // https://docs.nestjs.com/faq/hybrid-application#hybrid-application
  app.connectMicroservice<MicroserviceOptions>({
    transport: Transport.NATS,
    options: {
      servers: [process.env.NATS_SERVER!],
    },
  });
  app.startAllMicroservices();
  app.listen(process.env.PORT!);
}

main();
