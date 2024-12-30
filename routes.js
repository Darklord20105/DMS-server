const express = require('express')
const router = express.Router()
const userController = require('./controller/userController')
const debtController = require('./controller/debtController')
const paymentController = require('./controller/paymentController')

router.get('/', (req, res) => {
    res.status(200);
    res.send("Welcome to root URL of Server");
});

router.get('/api/get/userList', userController.user_list )
router.get('/api/get/getUser/:id', userController.user_view )
router.post('/api/post/postNewUser' , userController.user_create )
router.delete('/api/delete/deleteUser/:id', userController.user_delete )
///
router.get('/api/get/getDebtforUser/:id', debtController.debt_get_all)
router.post('/api/post/postNewDebtForUser', debtController.debt_post_new)
router.delete('/api/delete/deleteDebtItem', debtController.debt_delete_item)
///
router.get('/api/get/getPaymentforUser/:id', paymentController.payment_get_all)
router.post('/api/post/postNewPaymentForUser', paymentController.payment_post_new)
router.delete('/api/delete/deletePaymentItem', paymentController.payment_delete_item)


module.exports = router;
