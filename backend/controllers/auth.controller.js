const bcrypt = require("bcrypt");

const getUserFromDB = async () => {
  const passwordPlain = "admin123";
  const passwordHash = await bcrypt.hash(passwordPlain, 10);

  return {
    username: "admin",
    passwordHash,
  };
};

exports.loginUser = async (req, res) => {
  const { username, password } = req.body;

  const USER = await getUserFromDB();

  if (username !== USER.username) {
    return res.status(401).json({ success: false, message: "Invalid username" });
  }

  const isValid = await bcrypt.compare(password, USER.passwordHash);
  if (!isValid) {
    return res.status(401).json({ success: false, message: "Invalid password" });
  }

  req.session.user = username;
  return res.status(200).json({ success: true, message: "Login successful" });
};

exports.logoutUser = (req, res) => {
  req.session.destroy((err) => {
    if (err) return res.status(500).json({ success: false, message: "Logout failed" });
    res.clearCookie("connect.sid");
    res.json({ success: true, message: "Logged out" });
  });
};

exports.checkAuth = (req, res) => {
  if (req.session.user) {
    return res.status(200).json({ authenticated: true, user: req.session.user });
  } else {
    return res.status(401).json({ authenticated: false });
  }
};
