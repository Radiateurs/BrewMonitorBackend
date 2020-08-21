import { Entity, PrimaryGeneratedColumn, Column, OneToOne, JoinColumn, ManyToOne } from "typeorm";
import { PassThrough } from "stream";
import { Ingredient } from "./Ingredient.entity";
import { Receipe } from "./Receipe.entity";

@Entity()
export class ReceipeIngredient {

    @PrimaryGeneratedColumn()
    public id: number;

    @ManyToOne(type => Receipe, receipe => receipe.ingredients)
    public receipe: Receipe;

    // OneToOne because ReceipeIngredient reference only one ingredient at a time.
    @OneToOne(type => Ingredient)
    @JoinColumn()
    public ingredient: Ingredient;

    @Column()
    public quantity: number;

    @Column()
    public unit: string;
}
