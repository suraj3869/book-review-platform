import React, { useEffect, useState } from 'react';
import API from '../api';
import { Link } from 'react-router-dom';

function BookList() {
  const [books, setBooks] = useState([]);
  const [page, setPage] = useState(1);
  const [pages, setPages] = useState(1);

  useEffect(() => {
    API.get(`/books?page=${page}`).then(res => {
      setBooks(res.data.books);
      setPages(res.data.pages);
    });
  }, [page]);

  return (
    <div className="max-w-3xl mx-auto mt-10">
      <h2 className="text-xl font-bold mb-4">Book List</h2>
      <Link to="/add-book" className="bg-green-500 text-white px-4 py-2 rounded">Add Book</Link>
      <ul className="mt-4">
        {books.map(book => (
          <li key={book._id} className="mb-4 border-b pb-2">
            <Link to={`/books/${book._id}`} className="text-lg font-semibold">{book.title}</Link>
            <div>Author: {book.author}</div>
            <div>Genre: {book.genre}</div>
            <div>Year: {book.year}</div>
          </li>
        ))}
      </ul>
      <div className="mt-4 flex gap-2">
        <button disabled={page === 1} onClick={() => setPage(page - 1)} className="px-2 py-1 border">Prev</button>
        <span>Page {page} of {pages}</span>
        <button disabled={page === pages} onClick={() => setPage(page + 1)} className="px-2 py-1 border">Next</button>
      </div>
    </div>
  );
}
export default BookList;
