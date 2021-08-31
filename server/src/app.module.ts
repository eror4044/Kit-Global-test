import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ProductsModule } from './products/products.module';
import { MongooseModule } from '@nestjs/mongoose';
import { UserModule } from './users/user.module';
import { AuthModule } from './auth/auth.module';
import { UserController } from './users/user.controller';
import { APP_GUARD } from '@nestjs/core';
import { RolesGuard } from './auth/guards/roles.guard';
import { CleaningModule } from './cleaning/cleaning.module';

@Module({
  imports: [
    UserModule,
    AuthModule,
    ProductsModule,
    MongooseModule.forRoot(
      'mongodb+srv://user:S2QNq98vUW2KkmZP@cluster0.ytkel.mongodb.net/NestTesst?retryWrites=true&w=majority',
    ),
    CleaningModule,
    
  ],
  controllers: [AppController, UserController],
  providers: [
    AppService,
    {
      provide: APP_GUARD,
      useClass: RolesGuard,
    },
  ],
})
export class AppModule {}
