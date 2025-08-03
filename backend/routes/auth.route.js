const express = require('express');
const {loginUser, logoutUser, checkAuth} = require("../controllers/auth.controller");

const router = express.Router();

router.post("/login", loginUser);
router.post("/logout", logoutUser);
router.post("/check-auth", checkAuth);

module.exports = router;