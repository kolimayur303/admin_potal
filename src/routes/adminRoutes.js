const router = require("express").Router();
const adminController = require('../controllers/adminController');
const auth = require('../middleware/auth');
const adminValidator = require('../middleware/middleware')

router.post("/register",adminValidator.valUserRegister, adminController.register);
router.post("/login",adminValidator.valUserLogin,auth.auth, adminController.login);
router.get("/",auth.auth, adminController.allAdmins);

module.exports = router;
