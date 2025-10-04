import React, { useEffect, useState, useContext } from 'react';
import API from '../api';
import { useParams, Link } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';

function BookDetails() {
  const { id } = useParams();
  const [data, setData] = useState({ book: {}, reviews: [], avgRating: 0 });
  const { user } = useContext(AuthContext);
  const [reviewForm, setReviewForm] = useState({ rating: 5, reviewText: '' });
  const [msg, setMsg] = useState('');

  useEffect(() => {
    API.get(`/books/${id}`).then(res => setData(res.data));
  }, [id]);

  const handleReviewSubmit = async e => {
    e.preventDefault();
    try {
      await API.post('/reviews', { bookId: id, ...reviewForm });
      setMsg('Review added!');
      API.get(`/books/${id}`).then(res => setData(res.data));
    } catch (err) {
      setMsg(err.response?.data?.message || 'Error occurred.');
    }
  };

  return (
    <div className="max-w-2xl mx-auto mt-10">
      <h2 className="text-2xl font-bold mb-2">{data.book.title}</h2>
      <div>Author: {data.book.author}</div>
      <div>Genre: {data.book.genre}</div>
      <div>Year: {data.book.year}</div>
      <div>Description: {data.book.description}</div>
      <div className="mt-2 font-semibold">Average Rating: {data.avgRating}</div>
      {user && data.book.addedBy && data.book.addedBy._id === user.id && (
        <Link to={`/edit-book/${id}`} className="bg-yellow-500 text-white px-2 py-1 rounded">Edit Book</Link>
      )}
      <hr className="my-4"/>
      <h3 className="text-lg font-bold mb-2">Reviews</h3>
      <ul>
        {data.reviews.map(r => (
          <li key={r._id} className="mb-3 border-b pb-2">
            <div>Rating: {r.rating}</div>
            <div>{r.reviewText}</div>
            <div>By: {r.userId.name}</div>
          </li>
        ))}
      </ul>
      {user && (
        <form onSubmit={handleReviewSubmit} className="mt-4 border p-2 rounded">
          <h4 className="font-semibold">Add a Review</h4>
          <select name="rating" value={reviewForm.rating} onChange={e => setReviewForm({ ...reviewForm, rating: e.target.value })} className="mb-2 p-1">
            {[1,2,3,4,5].map(n => <option key={n} value={n}>{n} Star{n > 1 ? 's' : ''}</option>)}
          </select>
          <textarea name="reviewText" placeholder="Your review" required value={reviewForm.reviewText} onChange={e => setReviewForm({ ...reviewForm, reviewText: e.target.value })} className="w-full mb-2 p-2 border"/>
          <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded">Submit</button>
        </form>
      )}
      {msg && <div className="mt-2 text-green-500">{msg}</div>}
    </div>
  );
}
export default BookDetails;
