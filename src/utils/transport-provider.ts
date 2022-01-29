import { FactoryProvider } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import {
  ClientProxy,
  ClientProxyFactory,
  Transport,
} from "@nestjs/microservices";

const TransportProvider: FactoryProvider<ClientProxy> = {
  provide: "NATS_SERVICE",
  inject: [ConfigService],
  useFactory: (configService: ConfigService) =>
    ClientProxyFactory.create({
      transport: Transport.NATS,
      options: {
        servers: [configService.get("NATS_SERVER")],
      },
    }),
};

export default TransportProvider;
