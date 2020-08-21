import { Entity, PrimaryGeneratedColumn, Column, OneToOne, OneToMany, JoinColumn, JoinTable } from "typeorm";
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

    @OneToMany(type => ReceipeIngredient, receipeingredient => receipeingredient.receipe, { eager: true })
    public ingredients: ReceipeIngredient[];

    @Column()
    public dayFermenting: number;

    @Column()
    public dayBotteling: number;
}
