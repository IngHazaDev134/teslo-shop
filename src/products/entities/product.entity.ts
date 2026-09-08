import { BeforeInsert, BeforeUpdate, Column, Entity, OneToMany, OneToOne, PrimaryGeneratedColumn } from "typeorm";
import { ProductImage } from "./product.image.entity";

@Entity()
export class Product {

    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column('text', {unique: true})
    title: string;

    @Column('float', {default: 0 })
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
    @Column('text', { array: true, default: [] })
    tags: string[];

    //* images
    @OneToMany(
        () => ProductImage, 
        (productImage) => productImage.product, 
        { cascade: true, eager: true }
    )
    images?: ProductImage[];

    //* Este parocion de código es pera poder insertar un slug en caso de que no se haya insertado uno 
    @BeforeInsert()
    checkSlugInsert() {
        if (!this.slug) {
            this.slug = this.title;
        }
        this.slug = this.slug.toLocaleLowerCase().replaceAll(' ', '_').replaceAll("'", '');
    }

    //*BeforuUpdate
    @BeforeUpdate()
    checkSlugUpdate() {
        this.slug = this.slug.toLowerCase().replaceAll(' ', '_').replaceAll("'", '');
    }
}
