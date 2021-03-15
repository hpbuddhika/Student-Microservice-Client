import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm/dist/typeorm.module";

import { StudentEntity } from "./models/student.entity";
import { StudentsResolver } from "./students.resolver";
import { StudentsService } from "./students.service";


@Module({
    imports: [TypeOrmModule.forFeature([StudentEntity])],
    providers: [StudentsResolver, StudentsService]
})
export class StudentsModule {} 