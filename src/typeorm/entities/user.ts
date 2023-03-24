import { Entity, Column, PrimaryGeneratedColumn, OneToOne, JoinColumn } from 'typeorm';
import { Profile } from './profile';

@Entity('users')
export class User{
    @PrimaryGeneratedColumn({type:'bigint'})
    id:String

    @Column({unique:true})
    email:string

    @Column()
    password:string

    @Column()
    createdAt:Date

    @Column({nullable:true})
    Role:String

    @OneToOne(()=>Profile)
    @JoinColumn()
    profile:Profile
   

}