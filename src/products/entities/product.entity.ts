import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Product {

    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column('text', {unique: true})
    title: string;

    @Column('numeric', { precision: 10, scale: 2, default: 0 })
    price: number;

    @Column({ type: 'text', nullable: true })
    description: string;

    @Column('text', { unique: true })
    slug: string;

    @Column('int', { default: 0 })
    stock: number;

    @Column('text', { array: true, default: [] })
    size: string[];

    @Column('text')
    gender: string;

    //* tags
    //* omages
}
