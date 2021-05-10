const router = require("express").Router();
const dealerRoutes = require("./dealerRoutes");
const userRoutes = require("./userRoutes");

router.use("/dealer", dealerRoutes);
router.use("/user", userRoutes);

module.exports = router;
