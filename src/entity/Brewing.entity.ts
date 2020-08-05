import {Entity, PrimaryGeneratedColumn, Column, OneToOne, JoinColumn, CreateDateColumn, JoinTable} from "typeorm";
import { PassThrough } from "stream";
import { Receipe } from "./Receipe.entity";
import { User } from "./User.entity";
import { Fermentor } from "./Fermentor.entity";

@Entity()
export class Brewing {

    @PrimaryGeneratedColumn()
    public id: number;

    @OneToOne(type => Fermentor, fermentor => fermentor.brewing)
    @JoinTable()
    public fermentor: Fermentor;

    @OneToOne(type => Receipe)
    @JoinColumn()
    public receipe: Receipe;

    @Column()
    @CreateDateColumn()
    public started: Date;

    @OneToOne(type => User)
    @JoinColumn()
    public owner: User;
}
