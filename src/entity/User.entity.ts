import {Entity, PrimaryGeneratedColumn, Column, OneToOne, OneToMany} from "typeorm";
import { PassThrough } from "stream";
import { Fermentor } from "./Fermentor.entity";

@Entity()
export class User {

    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    firstName: string;

    @Column()
    lastName: string;

    @Column()
    dateOfBirth: string;

    @Column({ nullable: true })
    pass: string;

    @Column({ nullable: true })
    email: string;

    @OneToMany(type => Fermentor, fermentor => fermentor.owner)
    fermentors: Fermentor[];
}
