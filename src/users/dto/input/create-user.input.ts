import { DateScalarMode, Field, InputType } from "@nestjs/graphql";
import { IsEmail, IsNotEmpty } from "class-validator";

@InputType()
export class CreateUserInput {
   
    @Field()
    @IsNotEmpty()
    userName: string;

    @Field()
    @IsNotEmpty()
    @IsEmail()
    email: string;

    @Field()
    @IsNotEmpty()
    age: number;

    @Field()
    @IsNotEmpty()
    dateOfBirth:DateScalarMode

}