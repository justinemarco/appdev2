// routers/bookRouter.js
const express = require('express');
const router = express.Router();
const bookController = require('../controllers/bookController');
const authenticateToken = require('../middlewares/authMiddleware');

router.get('/', authenticateToken, bookController.getAllBooks);
router.get('/:id', authenticateToken, bookController.getBookById);
router.post('/', authenticateToken, bookController.createBook);
router.patch('/:id', authenticateToken, bookController.updateBook);
router.delete('/:id', authenticateToken, bookController.deleteBook);

module.exports = router;
