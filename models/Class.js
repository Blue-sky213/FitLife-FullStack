const { DataTypes } = require('sequelize');
// ** สำคัญ: เช็คในกลุ่มว่าไฟล์เชื่อมต่อ DB ชื่ออะไรแน่ ใช่ index ป่ะ? หรือ Folder ชื่อ  "database" หรอ? **
const sequelize = require('./index'); // สมมติว่าไฟล์เชื่อม DB อยู่ที่ models/index.js
const User = require('./User'); // ดึงโมเดล User มาเพื่อทำ Trainer

const Class = sequelize.define('Class', {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  className: {
    type: DataTypes.STRING(200),
    allowNull: false,
  },
  description: {
    type: DataTypes.TEXT,
    allowNull: true,
  },
  scheduleTime: {
    type: DataTypes.STRING(100),
    allowNull: false, 
  },
  capacity: {
    type: DataTypes.INTEGER,
    allowNull: false,
    defaultValue: 20, 
  }
}, {
  timestamps: true // ให้ระบบสร้างวันที่เพิ่ม/แก้ไขอัตโนมัติ
});

// กำหนดความสัมพันธ์ One-to-Many
User.hasMany(Class, { foreignKey: 'trainerId', as: 'classes' });
Class.belongsTo(User, { foreignKey: 'trainerId', as: 'trainer' });

module.exports = Class;