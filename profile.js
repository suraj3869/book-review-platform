import React, { useContext, useEffect, useState } from 'react';
import API from '../api';
import { AuthContext } from '../context/AuthContext';

function Profile() {
  const { user } = useContext(AuthContext);
  const [books, setBooks] = useState([]);
  const [reviews, setReviews] = useState([]);

  useEffect(() => {
    if (user) {
      API.get(`/books`).then(res => {
        setBooks(res.data.books.filter(b => b.addedBy._id === user.id));
      });
      API.get(`/books`).then(res => {
        const allBooks = res.data.books;
        Promise.all(allBooks.map(b => API.get(`/books/${b._id}`)))
          .then(resArr => {
            let allReviews = resArr.flatMap(res => res.data.reviews || []);
            setReviews(allReviews.filter(r => r.userId._id === user.id));
          });
      });
    }
  }, [user]);

  if (!user) return <div className="mt-10 text-center">Login required.</div>;

  return (
    <div className="max-w-2xl mx-auto mt-10">
      <h2 className="text-xl font-bold mb-4">Profile</h2>
      <div>Name: {user.name}</div>
      <div>Email: {user.email}</div>
      <hr className="my-4"/>
      <h3 className="text-lg font-bold">My Added Books</h3>
      <ul>{books.map(b => <li key={b._id}>{b.title} ({b.year})</li>)}</ul>
      <h3 className="text-lg font-bold mt-4">My Reviews</h3>
      <ul>{reviews.map(r => <li key={r._id}>On Book: {r.bookId} | Rating: {r.rating} | Text: {r.reviewText}</li>)}</ul>
    </div>
  );
}
export default Profile;
