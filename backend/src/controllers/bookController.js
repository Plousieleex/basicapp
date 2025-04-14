const handleAsync = require('../utils/handleAsync');
const bookService = require('../services/bookServices');

exports.createBook = handleAsync(async (req, res, next) => {
  // Create Book
  const newBook = await bookService.createBookService({
    title: req.body.title,
    author: req.body.author,
    description: req.body.description,
    price: req.body.price,
    imageUrl: req.body.imageUrl,
  });

  res.status(201).json({
    status: 'success',
    data: {
      newBook,
    },
  });
});

exports.getAllBooks = handleAsync(async (req, res, next) => {
  // List all books --> title, author, imageUrl
  const books = await bookService.getAllBooksService();

  res.status(200).json({
    status: 'success',
    data: books,
  });
});

exports.getBook = handleAsync(async (req, res, next) => {
  // Get book by ID, returns all details
  const { id } = req.params;
  const book = await bookService.getBookService(id);

  res.status(200).json({
    status: 'success',
    data: book,
  });
});
