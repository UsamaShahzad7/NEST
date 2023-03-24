import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { Profile } from "./profile";



@Entity('posts')
export class Posts{
    @PrimaryGeneratedColumn()
    id:string

    @Column()
    createdAt:Date

    @Column()
    Caption:string

    @ManyToOne(()=>Profile)
    profile:Profile
    

}
