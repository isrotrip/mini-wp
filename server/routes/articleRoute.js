const router = require('express').Router();
const verifyUser = require('../middlewares/verifyUser.js');
const ArticleController = require('../controllers/articleController.js');

router.get('/', ArticleController.read);
router.post('/', ArticleController.create);
router.use('/:id', verifyUser.authorization);
router.put('/:id', ArticleController.edit);
router.delete('/:id', ArticleController.remove);

module.exports = router;