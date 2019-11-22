module.exports = function(sequelize, DataTypes) {
    var Person_missing = sequelize.define("Person_missing", {

      text: DataTypes.STRING,

      complete: DataTypes.BOOLEAN



    });
    return Person_missing;
  };
  

  module.exports = function(sequelize, DataTypes) {
    var Post = sequelize.define("Post", {
      title: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          len: [1]
        }
      },
      body: {
        type: DataTypes.TEXT,
        allowNull: false,
        validate: {
          len: [1]
        }
      },
      category: {
        type: DataTypes.STRING,
        defaultValue: "Personal"
      }
    });
    return Post;
  };
  