const express = require('express');

const Goods = require('./goods.routes');
const Mypages = require("./mypages.routes");
const Reviews = require("./reviews.routes")
const Requests = require("./requests.routes")
const Users = require("./user.routes")

const router = express.Router();

router.use('/', Users);
router.use('/goods', Goods);
router.use('/mypages/', Mypages);
router.use('/reviews/', Reviews);
router.use('/requests/', Requests)

module.exports = router;
