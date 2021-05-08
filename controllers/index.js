const router = require("express").Router();
const dealerRoutes = require("./dealerRoutes");

router.use("/dealer", dealerRoutes);

module.exports = router;
