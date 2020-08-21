import { Entity, PrimaryGeneratedColumn, Column, OneToOne, ManyToOne, JoinColumn, CreateDateColumn, JoinTable } from "typeorm";
import { PassThrough } from "stream";
import { Receipe } from "./Receipe.entity";
import { User } from "./User.entity";

@Entity()
export class Brewing {

    @PrimaryGeneratedColumn()
    public id: number;

    @OneToOne(type => Receipe, { eager: true })
    @JoinColumn()
    public receipe: Receipe;

    @Column()
    @CreateDateColumn()
    public started: Date;

    @ManyToOne(type => User, user => user.brewings)
    public owner: User;
}
