import { NestFactory } from '@nestjs/core';
import { ApiGatewayModule } from './api-gateway.module';
import * as path from "path"
import * as swaggerUi from 'swagger-ui-express';
import * as fs from 'fs';

async function bootstrap() {
  const app = await NestFactory.create(ApiGatewayModule, {bodyParser: false});
  const globalPrefix = 'api';
  app.setGlobalPrefix(globalPrefix);

  const swaggerDocument = JSON.parse(fs.readFileSync(path.join(__dirname, '..', 'public', 'swagger.json'), 'utf8'));
  app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

  app.enableCors({
    origin: 'http://localhost:4000', 
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE,OPTIONS',
    credentials: true,
  });

  await app.listen(3001, () => {
    console.log("Api gateway server is listening..");
  });
}
bootstrap();
