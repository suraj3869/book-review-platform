import React, { useState, useEffect, useContext } from 'react';
import API from '../api';
import { useNavigate, useParams } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';

function AddEditBook() {
  const { id } = useParams();
  const nav = useNavigate();
  const { user } = useContext(AuthContext);

  const [form, setForm] = useState({ title: '', author: '', description: '', genre: '', year: '' });
  const [msg, setMsg] = useState('');

  useEffect(() => {
    if (id) {
      API.get(`/books/${id}`).then(res => setForm(res.data.book));
    }
  }, [id]);

  const handleChange = e => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async e => {
    e.preventDefault();
    try {
      if (id) {
        await API.put(`/books/${id}`, form);
        setMsg('Book updated!');
      } else {
        await API.post('/books', form);
        setMsg('Book added!');
      }
      nav('/');
    } catch (err) {
      setMsg(err.response?.data?.message || 'Error occurred.');
    }
  };

  if (!user) return <div className="mt-10 text-center">Login required to add/edit books.</div>;

  return (
    <div className="max-w-md mx-auto mt-10 p-4 border rounded">
      <h2 className="text-xl font-bold mb-4">{id ? 'Edit Book' : 'Add Book'}</h2>
      <form onSubmit={handleSubmit}>
        <input name="title" type="text" placeholder="Title" required value={form.title} onChange={handleChange} className="w-full mb-2 p-2 border"/>
        <input name="author" type="text" placeholder="Author" required value={form.author} onChange={handleChange} className="w-full mb-2 p-2 border"/>
        <input name="genre" type="text" placeholder="Genre" value={form.genre} onChange={handleChange} className="w-full mb-2 p-2 border"/>
        <input name="year" type="number" placeholder="Published Year" value={form.year} onChange={handleChange} className="w-full mb-2 p-2 border"/>
        <textarea name="description" placeholder="Description" value={form.description} onChange={handleChange} className="w-full mb-2 p-2 border"/>
        <button type="submit" className="w-full bg-green-500 text-white p-2 rounded">{id ? 'Update' : 'Add'}</button>
      </form>
      {msg && <div className="mt-2 text-green-500">{msg}</div>}
    </div>
  );
}
export default AddEditBook;
