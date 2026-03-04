// ไฟล์: controllers/classController.js
const Class = require('../models/Class');
const User = require('../models/User'); // เพื่อดึงเทรนเนอร์

// 1. อ่านทั้งหมด (GET /classes)
exports.getAllClasses = async (req, res) => {
  try {
    const classes = await Class.findAll({ include: 'trainer' });
    res.render('classes/index', { classes });
  } catch (err) {
    res.status(500).send(err.message);
  }
};

// 2. ฟอร์มเพิ่มใหม่ (GET /classes/new)
exports.createForm = async (req, res) => {
  try {
    // ** ต้องตกลงกับเพื่อนที่ทำ User ว่าต้องมีฟิลด์ role = 'trainer' นะ **
    const trainers = await User.findAll({ where: { role: 'trainer' } });
    res.render('classes/create', { trainers });
  } catch (err) {
    res.status(500).send(err.message);
  }
};

// 3. บันทึกใหม่ (POST /classes)
exports.createClass = async (req, res) => {
  try {
    await Class.create(req.body);
    // แจ้งเตือนสำเร็จ (ถ้ากลุ่มคุณใช้ flash) -> req.flash('success', 'Class created!');
    res.redirect('/classes');
  } catch (err) {
    res.status(500).send(err.message);
  }
};

// 4. ดูรายละเอียด (GET /classes/:id)
exports.getClass = async (req, res) => {
  try {
    const classItem = await Class.findByPk(req.params.id, { include: 'trainer' });
    if (!classItem) return res.status(404).send('Not Found');
    res.render('classes/show', { classItem });
  } catch (err) {
    res.status(500).send(err.message);
  }
};

// 5. ฟอร์มแก้ไข (GET /classes/:id/edit)
exports.editForm = async (req, res) => {
  try {
    const classItem = await Class.findByPk(req.params.id);
    const trainers = await User.findAll({ where: { role: 'trainer' } });
    if (!classItem) return res.status(404).send('Not Found');
    res.render('classes/edit', { classItem, trainers });
  } catch (err) {
    res.status(500).send(err.message);
  }
};

// 6. อัปเดต (PUT /classes/:id)
exports.updateClass = async (req, res) => {
  try {
    const classItem = await Class.findByPk(req.params.id);
    await classItem.update(req.body);
    res.redirect(`/classes/${req.params.id}`);
  } catch (err) {
    res.status(500).send(err.message);
  }
};

// 7. ลบ (DELETE /classes/:id)
exports.deleteClass = async (req, res) => {
  try {
    const classItem = await Class.findByPk(req.params.id);
    await classItem.destroy();
    res.redirect('/classes');
  } catch (err) {
    res.status(500).send(err.message);
  }
};