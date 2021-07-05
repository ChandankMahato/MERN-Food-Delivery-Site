const { requireAdminSignin, adminMiddleware } = require("../../common-middleware");
const { getCustomerOrders, adminUpdateOrder, adminUpdateDBStatus } = require("../../controller/admin/order.admin");

const router = require("express").Router();

router.post(`/admin/getOrder`, requireAdminSignin, adminMiddleware, getCustomerOrders);
router.post(`/admin/order/update`, requireAdminSignin, adminMiddleware, adminUpdateOrder);
router.post(`/admin/order/update/dbStatus`, requireAdminSignin, adminMiddleware, adminUpdateDBStatus);

module.exports = router;