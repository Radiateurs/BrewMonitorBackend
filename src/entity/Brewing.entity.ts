import {Entity, PrimaryGeneratedColumn, Column, OneToOne, JoinColumn, CreateDateColumn, JoinTable} from "typeorm";
import { PassThrough } from "stream";
import { Receipe } from "./Receipe.entity";
import { User } from "./User.entity";
import { Fermentor } from "./Fermentor.entity";

@Entity()
export class Brewing {

    @PrimaryGeneratedColumn()
    id: number;

    @OneToOne(type => Fermentor, fermentor => fermentor.brewing)
    @JoinTable()
    fermentor: Fermentor;

    @OneToOne(type => Receipe)
    @JoinColumn()
    @Column({ nullable: true })
    receipe: Receipe;

    @Column()
    @CreateDateColumn()
    started: Date;

    @OneToOne(type => User)
    @JoinColumn()
    owner: User;
}
