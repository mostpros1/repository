import { NestFactory } from '@nestjs/core';
import { AppModule } from './modules/app.module';
import { ValidationPipe } from '@nestjs/common';
import Amplify from 'aws-amplify';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(new ValidationPipe({transform: true}));
  app.enableCors();
  app.setGlobalPrefix('v1')
  await app.listen(3000);
  // Configure Amplify
  Amplify.configure({
    Auth: {
      // Your AWS Amplify Auth configuration here
      // For example:
      region: 'YOUR_AWS_REGION',
      userPoolId: 'YOUR_USER_POOL_ID',
      userPoolWebClientId: 'YOUR_USER_POOL_WEB_CLIENT_ID',
    },
  // Add other Amplify categories if required
  });
}
bootstrap();
