import { Module } from '@nestjs/common';
import { UserModule } from './user/user.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule } from '@nestjs/config';
import { AuthModule } from './auth/auth.module';
import { PostsModule } from './posts/posts.module';


@Module({
  imports: [TypeOrmModule.forRoot({
    type: 'mysql',
    host: 'localhost',
    port: 3306,
    username: 'root',
    password: '',
    database: 'tech-school',
    autoLoadEntities: true,
    synchronize: true
  }), 
  UserModule,
  ConfigModule.forRoot(),
  AuthModule,
  PostsModule,
  ],
})
export class AppModule {}
