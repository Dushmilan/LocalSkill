const { Router } = require("express");
const userController = require("../controllers/userController");

const router = Router();
// signup
router.post('/signup', userController.signup);
// login
router.post('/login', userController.login);

module.exports = router;


