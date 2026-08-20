import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

function Dashboard() {
  const role = localStorage.getItem('role');
  const token = localStorage.getItem('token');
  const navigate = useNavigate();
  const API_URL = import.meta.env.VITE_API_URL;

  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  
  const [visaData, setVisaData] = useState({
    userId: '',
    familyName: '',
    givenNames: '',
    documentNumber: '',
    visaClassSubclass: '',
    visaApplicant: 'Primary',
    visaGrantDate: '',
    visaExpiryDate: '',
    location: '',
    visaStatus: 'In Effect',
    visaGrantNumber: '',
    entriesAllowed: 'Multiple',
    mustNotArriveAfter: '',
    enterBeforeDate: '',
    periodOfStay: 'Indefinite',
    visaType: 'Temporary',
    dateOfBirth: '',
    nationality: ''
  });

  const [usersList, setUsersList] = useState([]);
  
  useEffect(() => {
    if (role === 'admin' || role === 'employe') {
      fetch(`${API_URL}/api/auth/users`, {
        headers: { 'Authorization': `Bearer ${token}` }
      })
      .then(async res => {
        if (res.status === 401) {
          localStorage.removeItem('token');
          localStorage.removeItem('role');
          window.location.href = '/lusc/login';
          return null;
        }
        return res.json();
      })
      .then(data => {
        if(data && Array.isArray(data)) setUsersList(data);
      })
      .catch(err => console.error(err));
    }
  }, [role, token]);

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('role');
    navigate('/lusc/login');
  };

  const handleCreateAccount = async (type) => {
    try {
      const endpoint = type === 'employe' ? '/api/auth/employe' : '/api/auth/user';
      const response = await fetch(`${API_URL}${endpoint}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({ username, password })
      });
      if (response.ok) {
        alert(`${type} created successfully!`);
        setUsername('');
        setPassword('');
      } else if (response.status === 401) {
        handleLogout();
      } else {
        const error = await response.json();
        alert(`Failed to create ${type}: ${error.message}`);
      }
    } catch (error) {
      alert('Error creating account');
      console.error(error);
    }
  };

  const handleVisaChange = (e) => {
    setVisaData({ ...visaData, [e.target.name]: e.target.value });
  };

  const handleCreateVisa = async (e) => {
    e.preventDefault();
    try {
      const payload = { ...visaData };
      if (!payload.userId) {
        delete payload.userId; // Let it be null
      }
      const response = await fetch(`${API_URL}/api/visas`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(payload)
      });
      if (response.ok) {
        alert('Visa created successfully!');
        // Reset form or keep values based on preference
      } else if (response.status === 401) {
        handleLogout();
      } else {
        const error = await response.json();
        alert(`Failed to create visa: ${error.message}`);
      }
    } catch (error) {
      alert('Error creating visa');
      console.error(error);
    }
  };

  return (
    <div style={{ padding: '2rem', maxWidth: '800px', margin: '0 auto' }}>
      <h1>Dashboard ({role})</h1>
      <button onClick={handleLogout} style={{ marginBottom: '2rem' }}>Logout</button>

      {(role === 'admin' || role === 'employe') && (
        <div style={{ marginBottom: '2rem', padding: '1rem', border: '1px solid #ccc' }}>
          <h2>Create Account</h2>
          <div style={{ marginBottom: '1rem' }}>
            <label>Username: </label>
            <input value={username} onChange={e => setUsername(e.target.value)} />
          </div>
          <div style={{ marginBottom: '1rem' }}>
            <label>Password: </label>
            <input type="password" value={password} onChange={e => setPassword(e.target.value)} />
          </div>
          {role === 'admin' && (
            <button onClick={() => handleCreateAccount('employe')} style={{ marginRight: '1rem' }}>Create Employe</button>
          )}
          <button onClick={() => handleCreateAccount('user')}>Create User</button>
        </div>
      )}

      {(role === 'admin' || role === 'employe') && (
        <div style={{ padding: '1rem', border: '1px solid #ccc' }}>
          <h2>Create Visa</h2>
          <form onSubmit={handleCreateVisa} style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
            {Object.keys(visaData).map(key => (
              <div key={key}>
                <label style={{ display: 'block' }}>{key}</label>
                {key === 'userId' ? (
                  <select
                    name={key}
                    value={visaData[key]}
                    onChange={handleVisaChange}
                    style={{ width: '100%', padding: '0.5rem' }}
                  >
                    <option value="">Unassigned (None)</option>
                    {usersList.map(u => (
                      <option key={u._id} value={u._id}>{u.username}</option>
                    ))}
                  </select>
                ) : (
                  <input
                    type={key.toLowerCase().includes('date') || key === 'mustNotArriveAfter' ? 'date' : 'text'}
                    name={key}
                    value={visaData[key]}
                    onChange={handleVisaChange}
                    style={{ width: '100%', padding: '0.5rem' }}
                    placeholder={`Enter ${key}`}
                    required={!['userId', 'visaClassSubclass', 'visaGrantDate', 'visaExpiryDate', 'location', 'visaGrantNumber', 'mustNotArriveAfter', 'enterBeforeDate', 'periodOfStay', 'visaType'].includes(key)}
                  />
                )}
              </div>
            ))}
            <div style={{ gridColumn: 'span 2' }}>
              <button type="submit" style={{ padding: '0.5rem 1rem', width: '100%' }}>Create Visa</button>
            </div>
          </form>
        </div>
      )}
    </div>
  );
}

export default Dashboard;
