const prisma = require('../config/db');
const AppError = require('../utils/appError');

exports.createBookService = async ({
  title,
  author,
  description,
  price,
  imageUrl,
}) => {
  if (!title || price === undefined) {
    throw new AppError('Title and price are required.', 400);
  }

  try {
    const newBook = await prisma.books.create({
      data: {
        title,
        author: author || null,
        description: description || null,
        price,
        imageUrl: imageUrl || null,
      },
    });

    return newBook;
  } catch (e) {
    throw new AppError('Error creating book.', 500);
  }
};

exports.getAllBooksService = async () => {
  try {
    const books = await prisma.books.findMany({
      select: {
        id: true,
        title: true,
        author: true,
        imageUrl: true,
      },
    });

    return books;
  } catch (e) {
    throw new AppError('Could not retrieve books.', 500);
  }
};

exports.getBookService = async (id) => {
  try {
    const book = await prisma.books.findUnique({
      where: { id: Number(id) },
      select: {
        id: true,
        title: true,
        author: true,
        description: true,
        price: true,
        imageUrl: true,
      },
    });

    if (!book) {
      throw new AppError('Book not found.', 404);
    }

    return book;
  } catch (e) {
    throw new AppError('Error retrieving book details.', 500);
  }
};
