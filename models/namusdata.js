module.exports = function(sequelize, DataTypes) {
    var Person_missing = sequelize.define("Person_missing", {

      item_id : {
        type: DataTypes.INTEGER,
        allowNull: false,
        primarykey : true,
      },
      Current_Age_From : {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      City_Of_Last_Contact : {
        type: DataTypes.STRING(100),
      },
      First_Name : {
        type: DataTypes.STRING(15),
      },
      Modified_Date_Time : {
        type: DataTypes.DATE,
      },
      Middle_Name : {
        type : DataTypes.STRING(15),
      },
      Last_Name : {
        type : DataTypes.STRING(25),
      },
      img : {
        type : DataTypes.STRING(255),
      },
      Current_Age_To : {
        type : DataTypes.INTEGER,
      },
      Computed_Missing_Max_Age : {
        type : DataTypes.INTEGER,
      },
      Computed_Missing_Min_Age : {
        type : DataTypes.INTEGER,
      },
      County_Of_Last_Contact : {
        type : DataTypes.STRING(100),
      },
      id_Formatted : {
        type : DataTypes.STRING(15),
      },
      Race_Ethnicity : {
        type : DataTypes.STRING(50),
      },
      Date_Of_Last_Contact : {
        type: DataTypes.DATE,
      },
      State_Of_Last_Contact : {
        type : DataTypes.STRING(3),
      },
      Link : {
        type : DataTypes.STRING(10),
      },
      namus2Number : {
        type : DataTypes.INTEGER,
      },
      Geo_Shape : {
        type : DataTypes.STRING(255),
      },
      Geo_Point_2D : {
        type : DataTypes.STRING(255),
      },


    },
    {
      timestamps : false,
    });
    return Person_missing;
  };
  