import { NextResponse, NextRequest } from "next/server";
import books from "../../../../public/assets/products/Books.json"; 

export const GET = async (req: NextRequest) => {
  const { searchParams } = new URL(req.url);

  let filteredBooks = [...books];

  const bookTitle = searchParams.get("title");
  if (bookTitle) {
    filteredBooks = filteredBooks.filter(book =>
      book.title.toLowerCase().includes(bookTitle.toLowerCase())
    );
  }

  const genre = searchParams.get("genre");
  if (genre) {
    filteredBooks = filteredBooks.filter(book =>
      book.genre.toLowerCase().includes(genre.toLowerCase())
    );
  }

  const year = searchParams.get("year");
  if (year && Number(year)) {
    filteredBooks = filteredBooks.filter(book => book.year === Number(year));
  }

  const id = searchParams.get("id");
  if (id && Number(id)) {
    filteredBooks = filteredBooks.filter(book => book.id === Number(id));
  }

  if (filteredBooks.length === 0) {
    return NextResponse.json({
      message: 'No books found with the specified criteria.'
    }, { status: 404 });
  }

  return NextResponse.json({
    books: filteredBooks
  });
};
