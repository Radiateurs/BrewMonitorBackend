import { Entity, PrimaryGeneratedColumn, Column, OneToOne, JoinColumn, OneToMany } from "typeorm";
import { PassThrough } from "stream";

@Entity()
export class Ingredient {

    @PrimaryGeneratedColumn()
    public id: number;

    @Column()
    public name: string;

    @Column()
    public supplier: string;

    @Column()
    public origin: string;
}
