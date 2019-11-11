import {Entity, PrimaryGeneratedColumn, Column, OneToOne, JoinColumn, OneToMany, JoinTable} from "typeorm";
import { PassThrough } from "stream";
import { User } from "./User.entity"
import { ReceipeIngredient } from "./ReceipeIngredient.entity"

@Entity()
export class Receipe {

    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    name: string;

    @OneToOne(type => User)
    @JoinColumn()
    author: User;

    @Column()
    creationDate: string;

    @OneToOne(type => ReceipeIngredient)  
    ingredients: ReceipeIngredient[];

    @Column()
    dayFermenting: number;

    @Column()
    dayBotteling: number;
}
