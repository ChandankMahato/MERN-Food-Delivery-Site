const { requireAdminSignin, adminMiddleware } = require("../../common-middleware");
const { getCustomerOrders, adminUpdateOrder } = require("../../controller/admin/order.admin");

const router = require("express").Router();

router.post(`/admin/getOrder`, requireAdminSignin, adminMiddleware, getCustomerOrders);
router.post(`/admin/order/update`, requireAdminSignin, adminMiddleware, adminUpdateOrder);

module.exports = router;