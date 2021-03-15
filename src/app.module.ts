import { Module } from '@nestjs/common';
import { GraphQLModule } from '@nestjs/graphql';
import { TypeOrmModule } from '@nestjs/typeorm';
import { StudentsModule } from './users/students.module';

@Module({
  imports: [
    GraphQLModule.forRoot({
      autoSchemaFile: true,
      buildSchemaOptions: {
        dateScalarMode: 'isoDate', 
      }
    }),
    TypeOrmModule.forRoot({ 
      type: 'postgres',
      host: 'localhost',
      port: 5432,
      username: 'user',
      password: 'password123',
      database: 'studentDB',
      entities: ['dist/**/*.entity{.ts,.js}'],
      logging: true,
      synchronize: true,  
    }),
    StudentsModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
