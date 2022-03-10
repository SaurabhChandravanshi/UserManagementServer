const router = require('express').Router();
const controller = require('../controllers/userController')

router.route('/user').post(controller.new);

router.route('/user/:ownerId').get(controller.view)

router.route('/user/:id').delete(controller.delete).put(controller.update);

module.exports = router;