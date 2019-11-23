module.exports = function(sequelize, DataTypes) {
  var Person_missing = sequelize.define("Person_missing", {

    Current_Age_From : {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    City_Of_Last_Contact : {
      type: DataTypes.STRING(255),
    },
    First_Name : {
      type: DataTypes.STRING(255),
    },
    Modified_Date_Time : {
      type: DataTypes.STRING(255),
    },
    Middle_Name : {
      type : DataTypes.STRING(255),
    },
    Last_Name : {
      type : DataTypes.STRING(255),
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
      type : DataTypes.STRING(255),
    },
    id_Formatted : {
      type : DataTypes.STRING(255),
    },
    Race_Ethnicity : {
      type : DataTypes.STRING(255),
    },
    Gender : {
      type : DataTypes.STRING(255),
    },
    Date_Of_Last_Contact : {
      type: DataTypes.STRING(255),
    },
    State_Of_Last_Contact : {
      type : DataTypes.STRING(255),
    },
    Link : {
      type : DataTypes.STRING(255),
    },
    namus2Number : {
      type : DataTypes.STRING(255),
    },
    Geo_Shape : {
      type : DataTypes.STRING(255),
    },
    Latitude : {
      type : DataTypes.STRING(255),
    },
    Longitude : {
      type : DataTypes.STRING(255),
    }
  },
  {
    timestamps : false,
  });
  return Person_missing;
};