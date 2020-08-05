import {Entity, PrimaryGeneratedColumn, Column, OneToOne, JoinColumn, OneToMany} from "typeorm";
import { PassThrough } from "stream";
import { Ingredient } from "./Ingredient.entity";

@Entity()
export class ReceipeIngredient {

    @PrimaryGeneratedColumn()
    public id: number;

    @OneToOne(type => Ingredient)
    @JoinColumn()
    public ingredient: Ingredient;

    @Column()
    public quantity: number;

    @Column()
    public unit: string;
}
