import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { Posts } from "./post";



@Entity('images')
export class Images{
    @PrimaryGeneratedColumn()
    id:string

    @Column()
    name:string

    @ManyToOne(()=>Posts)
    posts:Posts
}