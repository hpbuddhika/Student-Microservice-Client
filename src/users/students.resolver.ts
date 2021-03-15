import { Logger } from "@nestjs/common";
import { Resolver, Query, Args, Mutation } from "@nestjs/graphql";
import { ClientProxy, ClientProxyFactory, Transport } from "@nestjs/microservices";
import { Observable } from "rxjs";
import { GetUserArgs } from "./dto/args/get-user.args";
import { GetUsersArgs } from "./dto/args/get-users.args";
import { CreateUserInput } from "./dto/input/create-user.input";
import { DeleteStudentInput } from "./dto/input/delete-user.input";
import { UpdateStudentInput } from "./dto/input/update-user.input";

import { Student } from "./models/student";
import { StudentsService } from "./students.service";

@Resolver(() => Student)
export class StudentsResolver {

    public client: ClientProxy;
    private logger = new Logger('StudentsResolver')

    constructor(private readonly studentsService: StudentsService) {
        this.client = ClientProxyFactory.create({
            transport: Transport.TCP,
            options: {
                host: '127.0.0.1',
                port: 8877,
            },
        });
    }


    @Query(() => [Student], { name: 'students' })
    async getStudents() {
        let studentsArray: Student[] = []
        const rawStudents = await this.fetchStudents();
        for (let i of rawStudents) {
            let student: Student = {
                id: null,
                name: null,
                email: null,
                age: null,
                dataofBirth: null
            }

            student.id = i.id;
            student.name = i.name; 
            student.email = i.email;
            student.age = i.age;
            student.dataofBirth = new Date(i.dataofBirth)

            studentsArray.push(student)

        }
        return studentsArray 
    }

    public async fetchStudents() {
        const observable = await this.client.send<Student[], any>('getAllStudents', 'test')
        return observable.toPromise() 

    }

    @Mutation(() => Student)
    async updateStudent(@Args('updateStudentData') updateUserData: UpdateStudentInput): Promise<Student> {
        // return this.studentsService.updateStudent(updateUserData);
        let student:Student = await this.UpdateStudent(updateUserData)
        student.dataofBirth = new Date(student.dataofBirth) 
        return student; 
    }

    public async UpdateStudent(updateUserData) {
        const observable = await this.client.send<Student, any>('updateStudent',updateUserData)
        return observable.toPromise() 

    }

    @Mutation(() => Student)
    async deleteStudent(@Args('deleteStudent') deleteStudentInput: DeleteStudentInput): Promise<Student> {
      //  return await this.studentsService.deleteStudent(deleteStudentInput);
        let student:Student = await this.removeStudent(deleteStudentInput)
        console.log("deleted studetn:::: " + JSON.stringify(student))
        student.dataofBirth = new Date(student.dataofBirth)  
        return student; 
    }

    public async removeStudent(deleteStudentInput) {
        const observable = await this.client.send<Student, any>('removeStudent',deleteStudentInput)
        return observable.toPromise() 

    }
}