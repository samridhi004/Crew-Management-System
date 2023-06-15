import { DataTypes, Model } from "sequelize";

export default class User extends Model {
  static init(sequelize) {
    return super.init(
      {
        name: {
          type: DataTypes.STRING,
            // allowNull: false,
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
        password:{
            type:DataTypes.STRING,
            // allowNull:false

        },
        dob:{
            type:DataTypes.DATE,
            // allowNull:false

        },
        groupid:{
            type:DataTypes.INTEGER
        },
        role:{
            type:DataTypes.ENUM('Owner','User','Mentor'),
            defaultValues:'User'
        }
      },
      {
        sequelize,
        paranoid: true,
        underscored: true,
      }
    );
  }
}
