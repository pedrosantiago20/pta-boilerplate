import { Entity, PrimaryGeneratedColumn, Column } from "typeorm"

@Entity()
export class Restaurante {

    @PrimaryGeneratedColumn()
    id: number

    @Column()
    nome: string

    @Column()
    rua: string

    @Column()
    tipodecomida: string

}