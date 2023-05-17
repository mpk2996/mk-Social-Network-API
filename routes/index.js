const router = require('express').Router();
const apiRoutes = require('./api');
"/api/users/17"

router.use('/api', apiRoutes);
router.use((req, res) => res.send('Wrong route!'));

module.exports = router;