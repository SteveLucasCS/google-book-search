const router = require("express").Router();
const booksController = require("../../controllers/booksController");

// Matches with "/api/books"
router.route("/")
  .get(booksController.findAll)

// Matches with "/api/books/:id"
router
  .route("/:id")
  .get(booksController.findById)
  .delete(booksController.remove);

// Matches with "/api/books/:title"
router
  .route("/:title")
  .get(booksController.findById)
  .delete(booksController.remove);

module.exports = router;
