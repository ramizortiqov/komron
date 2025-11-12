import { NestFactory } from '@nestjs/core';
import { ValidationPipe } from '@nestjs/common';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { ConfigService } from '@nestjs/config';
import helmet from 'helmet';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const configService = app.get(ConfigService);

  // Security
  app.use(helmet());

  // CORS
  app.enableCors({
    origin: configService.get('FRONTEND_URL') || 'http://localhost:3000',
    credentials: true,
  });

  // Global prefix
  app.setGlobalPrefix('api');

  // Validation pipe
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
      transform: true,
      transformOptions: {
        enableImplicitConversion: true,
      },
    }),
  );

  // Swagger documentation
  if (configService.get('NODE_ENV') !== 'production') {
    const config = new DocumentBuilder()
      .setTitle('TM LIMITED API')
      .setDescription('Premium E-Commerce API Documentation')
      .setVersion('1.0')
      .addBearerAuth()
      .addTag('Auth', 'Authentication endpoints')
      .addTag('Products', 'Product management')
      .addTag('Categories', 'Category management')
      .addTag('Orders', 'Order management')
      .addTag('Payments', 'Payment processing')
      .addTag('Delivery', 'Delivery services')
      .addTag('Admin', 'Admin panel')
      .build();

    const document = SwaggerModule.createDocument(app, config);
    SwaggerModule.setup('api/docs', app, document);
  }

  const port = configService.get('PORT') || 4000;
  await app.listen(port);

  console.log(`
    🚀 TM LIMITED Backend API is running!
    📡 Server: http://localhost:${port}
    📚 API Docs: http://localhost:${port}/api/docs
    🌍 Environment: ${configService.get('NODE_ENV')}
  `);
}

bootstrap();
