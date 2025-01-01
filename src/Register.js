import React, { useState } from 'react';
import axios from 'axios';

function Register() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false); 

  const handleRegister = async () => {
    if (password !== confirmPassword) {
      setError('Passwords do not match');
      return;
    }

    setError('');
    setLoading(true); 
    try {
      const response = await axios.post('http://localhost:5000/api/auth/register', {
        email,
        password,
      });
      alert('Registration successful! You can now log in.');
      window.location.href = '/login'; 
    } catch (err) {
      console.error(err);
      setError(err.response?.data?.msg || 'An error occurred during registration');
    } finally {
      setLoading(false); 
    }
  };

  return (
    <div style={{ maxWidth: '400px', margin: '50px auto', textAlign: 'center' }}>
      <h2>Register</h2>
      <div>
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Enter your email"
          style={{ width: '100%', padding: '10px', margin: '10px 0' }}
        />
      </div>
      <div>
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Enter your password"
          style={{ width: '100%', padding: '10px', margin: '10px 0' }}
        />
      </div>
      <div>
        <input
          type="password"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
          placeholder="Confirm your password"
          style={{ width: '100%', padding: '10px', margin: '10px 0' }}
        />
      </div>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      <button
        onClick={handleRegister}
        disabled={loading} 
        style={{
          padding: '10px 20px',
          background: loading ? '#a0c4ff' : '#1976D2',
          color: 'white',
          border: 'none',
          borderRadius: '5px',
          cursor: loading ? 'not-allowed' : 'pointer',
        }}
      >
        {loading ? 'Registering...' : 'Register'}
      </button>
    </div>
  );
}

export default Register;
