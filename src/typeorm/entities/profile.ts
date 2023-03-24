import { Column, Entity, JoinColumn, OneToMany, OneToOne, PrimaryGeneratedColumn } from "typeorm";



@Entity('profiles')
export class Profile{
    @PrimaryGeneratedColumn()
    id:String
    @Column()
    firstname:String
    @Column()
    lastname:String
    @Column()
    dob:String
    @Column({default:false})
    premium:Boolean
    
    
}