import {Entity, PrimaryGeneratedColumn, Column, OneToOne, JoinColumn, OneToMany, JoinTable} from "typeorm";
import { PassThrough } from "stream";
import { User } from "./User.entity";
import { ReceipeIngredient } from "./ReceipeIngredient.entity";

@Entity()
export class Receipe {

    @PrimaryGeneratedColumn()
    public id: number;

    @Column()
    public name: string;

    @OneToOne(type => User)
    @JoinColumn()
    public author: User;

    @Column()
    public creationDate: string;

    @OneToOne(type => ReceipeIngredient)  
    public ingredients: ReceipeIngredient[];

    @Column()
    public dayFermenting: number;

    @Column()
    public dayBotteling: number;
}
