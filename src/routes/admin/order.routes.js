const { requireSignin, adminMiddleware } = require("../../common-middleware");
const { getCustomerOrders } = require("../../controller/admin/order.admin");

const router = require("express").Router();

router.post(`/admin/getOrder`, requireSignin, adminMiddleware, getCustomerOrders);

module.exports = router;