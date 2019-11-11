import {Entity, PrimaryGeneratedColumn, Column, OneToOne, JoinColumn, OneToMany} from "typeorm";
import { PassThrough } from "stream";
import { Ingredient } from "./Ingredient.entity"

@Entity()
export class ReceipeIngredient {

    @PrimaryGeneratedColumn()
    id: number;

    @OneToOne(type => Ingredient)
    @JoinColumn()
    ingredient: Ingredient;

    @Column()
    quantity: number;

    @Column()
    unit: string;
}
