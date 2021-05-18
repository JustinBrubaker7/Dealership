const router = require("express").Router();
const dealerRoutes = require("./dealerRoutes");
const userRoutes = require("./userRoutes");
const userapi = require("./userAPI");
const loginRoutes = require("./loginRoutes");
const homeRoutes = require("./homeRoutes");

router.use("/dealer", dealerRoutes);
router.use("/user", userRoutes);
router.use("/userapi", userapi);
router.use("/log", loginRoutes);
router.use("/", homeRoutes);

module.exports = router;
