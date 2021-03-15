import { Field, InputType } from "@nestjs/graphql";
import { IsNotEmpty, IsOptional } from "class-validator";

@InputType()
export class UpdateStudentInput {
    @Field()
    @IsNotEmpty()
    id: number;

    @Field({nullable:true})
    @IsOptional()
    @IsNotEmpty()
    name?: string;

    @Field({nullable:true})
    @IsOptional()
    @IsNotEmpty()
    age?: number;

    @Field({nullable:true})
    @IsOptional()
    @IsNotEmpty()
    dataofBirth?: Date;
}