import {Entity, PrimaryGeneratedColumn, Column, OneToOne, JoinColumn, OneToMany} from "typeorm";
import { PassThrough } from "stream";

@Entity()
export class Ingredient {

    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    name: string;

    @Column()
    supplier: string;

    @Column()
    origin: string;

}
