import { Model, PrimaryKey, BelongsTo, DataType, Table, Column, HasMany, HasOne } from 'sequelize-typescript';
import { DeletedAt, CreatedAt, UpdatedAt, BelongsToMany, ForeignKey } from 'sequelize-typescript';
import { json } from 'sequelize';
@Table({
    timestamps: true,
    paranoid: true,
})
export class users extends Model<users> {
    @PrimaryKey
    @Column({
        allowNull: false,
        type: DataType.UUID,
    })
    public user_id: string;

    @Column({
        unique: true,
        allowNull: false,
        type: DataType.STRING,
    })
    public email: string;

    @CreatedAt public createdAt: Date;

    @UpdatedAt public updatedAt: Date;

    @DeletedAt public deletedAt: Date;
}
