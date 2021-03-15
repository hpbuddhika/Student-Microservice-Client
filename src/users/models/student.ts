import { Field, Int, ObjectType} from "@nestjs/graphql";
import { IsNotEmpty, IsOptional } from "class-validator";

@ObjectType()
export class Student {

    @Field()
    id: number;

    @Field()
    name: string;  

    @Field({nullable:true})
    email: string;

    @Field(() => Int)
    age: number;

    @Field()
    dataofBirth: Date


    constructor(id,name,email,age,dateofBirth){
        this.id = id,
        this.name = name,
        this.email = email,
        this.age = age,
        this.dataofBirth = dateofBirth
    }
}