import "reflect-metadata";
import {Entity, PrimaryGeneratedColumn, Column, OneToOne, JoinColumn, Double, OneToMany, ManyToOne, JoinTable} from "typeorm";
import { PassThrough } from "stream";
import { Brewing } from "./Brewing.entity";
import { User } from "./User.entity";

@Entity()
export class Fermentor {

    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    name: string;

    @Column()
    capacity: number;

    @ManyToOne(type => User, owner => owner.fermentors)
    @JoinTable()
    owner: User; 

    @OneToOne(type => Brewing)
    @JoinTable()
    brewing: Brewing;

    @Column()
    temperature: Number;

    @Column()
    token: string;
}
