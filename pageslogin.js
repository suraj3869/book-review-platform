import React, { useState, useContext } from 'react';
import API from '../api';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';

function Login() {
  const [form, setForm] = useState({ email: '', password: '' });
  const [msg, setMsg] = useState('');
  const nav = useNavigate();
  const { login } = useContext(AuthContext);

  const handleChange = e => setForm({ ...form, [e.target.name]: e.target.value });
  const handleSubmit = async e => {
    e.preventDefault();
    try {
      const { data } = await API.post('/users/login', form);
      login(data.user, data.token);
      setMsg('Login successful!');
      nav('/');
    } catch (err) {
      setMsg(err.response?.data?.message || 'Error occurred.');
    }
  };

  return (
    <div className="max-w-md mx-auto mt-10 p-4 border rounded">
      <h2 className="text-xl font-bold mb-4">Login</h2>
      <form onSubmit={handleSubmit}>
        <input name="email" type="email" placeholder="Email" required value={form.email} onChange={handleChange} className="w-full mb-2 p-2 border"/>
        <input name="password" type="password" placeholder="Password" required value={form.password} onChange={handleChange} className="w-full mb-2 p-2 border"/>
        <button type="submit" className="w-full bg-blue-500 text-white p-2 rounded">Login</button>
      </form>
      {msg && <div className="mt-2 text-red-500">{msg}</div>}
    </div>
  );
}
export default Login;
