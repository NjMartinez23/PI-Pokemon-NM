const { DataTypes } = require('sequelize');
// Exportamos una funcion que define el modelo
// Luego le injectamos la conexion a sequelize.
module.exports = (sequelize) => {
  // defino el modelo
  sequelize.define('pokemon', {
    id:{
      type:DataTypes.UUID,
      primaryKey: true,
      defaultValue: DataTypes.UUIDV4
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      set(value){
        // combierte el nombre que le llegue a minuscula antes de guardarlo en la db
        this.setDataValue("name", value.toLowerCase());
      },
      //valida lo que se le coloque en los parametros 
      validate:{
        //len proporciona un rango de existencia del tipo de dato
        len: {
          args:[3,12],
          msg: 'please enter a name containig 3 to 12 characters'
        }
      }
    },
    image:{
      type: DataTypes.STRING
    },
    hp:{
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 0,
      validate:{
        min: 0,
        max: 999
      }
    },
    attack:{
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 0,
      validate:{
        min: 0,
        max: 999
      }
    },
    defense:{
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 0,
      validate:{
        min: 0,
        max: 999
      }
    },
    speed:{
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 0,
      validate:{
        min: 0,
        max: 999
      }
    },
    height:{
      type: DataTypes.INTEGER,
      allowNull: true,
      defaultValue: 0,
      validate:{
        min: 0,
        max: 999
      }
    },
    weight:{
      type: DataTypes.INTEGER,
      allowNull: true,
      defaultValue: 0,
      validate:{
        min: 0,
        max: 999
      }
    },

    /*flag*/
    createdInDb: {
      type : DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: true,
      set(value){
        // Comvierte el balor en un booleano
        const boolValue = !!value;
        this.setDataValue('createdInDb',boolValue);
      }
    }
  },{
    timestamps: false, freezeTableName: true,
  });
};
