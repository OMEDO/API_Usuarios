import { BaseEntity, BeforeInsert, BeforeUpdate, Column, CreateDateColumn, Entity, OneToMany, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import { SesionUsuario } from "./sesiones_usuario.entity";
import { IsEmail, IsNotEmpty, Length, Matches } from "class-validator";
import * as bcrypt from 'bcrypt'

@Entity("usuarios")
export class Usuario extends BaseEntity{
    @PrimaryGeneratedColumn()
    id!: number;

    @Column({type: 'nvarchar', length: 100, unique: true })
    @IsNotEmpty({message:"El valor de nombre es obligatorio"})
    nombre!: string;

    @Column({type: 'nvarchar', length: 100, unique: true })
    @IsNotEmpty({message:"El valor de apellido es obligatorio"})
    apellido!: string;

    @Column({type: 'nvarchar', length: 10, unique: true })
    @IsNotEmpty({message:"El valor de teléfono es obligatorio"})
    @Length(10, 10, { message: "El teléfono debe tener exactamente 10 caracteres" })
    telefono!: string;

    @Column({type: 'nvarchar', length: 255, unique: true })
    @IsNotEmpty({message:"El valor de correo es obligatorio"})
    @IsEmail({}, { message: "El correo debe tener un formato válido" })
    correo!: string;

    @Column({type: 'nvarchar', length: 255 })
    @IsNotEmpty({message:"El valor de password es obligatorio"})
    @Matches(/^(?=.*[A-Z])(?=.*\d)(?=.*[\W_]).{8,}$/, { 
        message: "La contraseña debe contener al menos una mayúscula, un número y un carácter especial"
    })
    password!: string;

    @CreateDateColumn({ type: "datetime", default: () => "GETDATE()"})
    fecha_registro!: Date;

    @UpdateDateColumn({type: "datetime", default: () => "GETDATE()", onUpdate: "GETDATE()"})
    fecha_actualizacion!: Date;

    @Column({type: 'bit', default: () => '1'})
    activo!: boolean;

    @Column({type: 'nvarchar', length: 255, nullable: true })
    token!: string 


    @OneToMany(() => SesionUsuario, (sesion) => sesion.usuario, {  cascade: true, onDelete: 'CASCADE' })
    sesiones!: SesionUsuario;
    

    @BeforeInsert()
    @BeforeUpdate()
    convierteMinusculas(){
        if (this.nombre) this.nombre = this.nombre.toLowerCase();
        if (this.apellido) this.apellido = this.apellido.toLowerCase();
        if (this.correo) this.correo = this.correo.toLowerCase();
        
    }

    hashPassword(): void{
        const salt = bcrypt.genSaltSync(10)
        this.password = bcrypt.hashSync(this.password, salt)
    }

    checkPassword(password: string): boolean {
        return bcrypt.compareSync(password, this.password);
    }
}