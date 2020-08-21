import "reflect-metadata";
import { Entity, PrimaryGeneratedColumn, Column, OneToOne, JoinColumn, Double, OneToMany, ManyToOne, JoinTable } from "typeorm";
import { PassThrough } from "stream";
import { Brewing } from "./Brewing.entity";
import { User } from "./User.entity";

@Entity()
export class Fermentor {

    @PrimaryGeneratedColumn()
    public id: number;

    @Column()
    public name: string;

    @Column()
    public capacity: number;

    @ManyToOne(type => User, owner => owner.fermentors)
    public owner: User; 

    @Column()
    public temperature: number;

    @Column()
    public token: string;

    @OneToOne(type => Brewing, { eager: true })
    @JoinColumn()
    public brewing: Brewing;
}
