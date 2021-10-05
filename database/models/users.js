
module.exports = (sequelize,DataTypes) =>{
const User = sequelize.define('User', {
  // Model attributes are defined here
  intUserID: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    allowNull: false,
    autoIncrement: true
  },
  strName: {
    type: DataTypes.STRING,
    allowNull: false,
    // allowNull defaults to true
  },
  strEmail: {
    type: DataTypes.STRING,
    unique: true,
  },
  strPassword: {
    type: DataTypes.STRING,
    allowNull: false,
    
  },
  dtmDOB: {
    type: DataTypes.DATE ,
    
    
  },

   blnIsActive: {
    type: DataTypes.BOOLEAN,
    defaultValue: true
    
    
  },
  
  
}, {
    
    tableName: 'tbluser',
    timestamps: false
  // Other model options go here
});
console.log(User === sequelize.models.User); // true
return User;
// `sequelize.define` also returns the model

}
