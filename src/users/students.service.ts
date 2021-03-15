import { Injectable } from "@nestjs/common";
import { ClientProxy, ClientProxyFactory, Transport } from "@nestjs/microservices";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm"; 
import { v4 as uuidv4 } from 'uuid';
import { GetUserArgs } from "./dto/args/get-user.args";
import { GetUsersArgs } from "./dto/args/get-users.args";
import { CreateUserInput } from "./dto/input/create-user.input";
import { DeleteStudentInput } from "./dto/input/delete-user.input";
import { UpdateStudentInput } from "./dto/input/update-user.input";
import { Student } from "./models/student";
import { StudentEntity } from "./models/student.entity";

@Injectable()
export class StudentsService {


    public client: ClientProxy;

    constructor(
        @InjectRepository(StudentEntity)
        private studentRepository: Repository<StudentEntity>,
    ) {

        
    }
 
    
    async getStudents(): Promise<Student[]> {
        const students = await this.studentRepository.find();
        console.log("students:  " + JSON.stringify(students))
        return students;
        return null;
    }


    async updateStudent(updateUserData: UpdateStudentInput): Promise<Student> {
        const student = { ...updateUserData };
        const updatedStudent: Student = await this.studentRepository.save(student);
        const studentById: Student = await this.studentRepository.findOne(updatedStudent.id);
        return studentById;
    }

    async deleteStudent(deleteStudentInput: DeleteStudentInput): Promise<Student> {
        const studentToDelete = await this.studentRepository.findOne(deleteStudentInput.id)
        const deletedStudent = await this.studentRepository.remove(studentToDelete);
        const returnStudent = { ...deletedStudent, id: deleteStudentInput.id }
        return returnStudent;
    }







}