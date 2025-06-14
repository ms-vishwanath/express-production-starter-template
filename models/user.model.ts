import {
    Entity,
    PrimaryGeneratedColumn,
    Column,
    CreateDateColumn,
    UpdateDateColumn,

  } from "typeorm";

  
  @Entity()
  export class User {
    @PrimaryGeneratedColumn("uuid")
    id: string;
  
    @Column({ type: "varchar", length: 255, nullable: true })
    username: string;
  
    @Column({ type: "varchar", length: 255, nullable: true })
    email: string | null;
  
    @Column({ type: "varchar", length: 255, nullable: true })
    password: string;
  
    @Column({ type: "boolean", default: false })
    isEmailVerified: boolean;
  
    @Column({ type: "boolean", default: true })
    isActive: boolean;
    
    @Column({ type: "boolean", default: false })
    isDeleted: boolean;
  
    @UpdateDateColumn()
    updatedAt: Date;
  
    @CreateDateColumn()
    createdAt: Date;
  }