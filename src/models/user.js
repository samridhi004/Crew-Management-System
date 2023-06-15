import { DataTypes, Model } from "sequelize";

export default class User extends Model {
  static init(sequelize) {
    return super.init(
      {
        name: {
          type: DataTypes.STRING,
          //   allowNull: false,
        },
        email: {
          type: DataTypes.STRING,
          //   allowNull: false,
          unique: true,
        },
        // id: {
        //   type: DataTypes.INTEGER,
        //   autoIncrement: true,
        //   primaryKey: true,
        // },
        // password:{
        //     type:DataTypes.STRING,
        //     allowNull:false

        // },
        // DOB:{
        //     type:DataTypes.DATE,
        //     allowNull:false

        // },
        // GroupID:{
        //     type:DataTypes.INTEGER
        // },
        // Role:{
        //     type:DataTypes.ENUM('Owner','User','Mentor'),
        //     defaultValues:'User'
        // }
      },
      {
        sequelize,
        paranoid: true,
        underscored: true,
      }
    );
  }
}
