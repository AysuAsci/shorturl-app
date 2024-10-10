
import React, { useState } from 'react';
import { signUpUser, addUrl } from '../../supabase'; 

const Register = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [url, setUrl] = useState('');

  const handleSignUp = async (e) => {
    e.preventDefault();
    const user = await signUpUser(email, password); 

    if (user) {
      await addUrl(url); 
      alert('Kullanıcı kaydedildi ve URL eklendi!');
    }
  };

  return (
    <div>
      <h2>Kayıt Ol</h2>
      <form onSubmit={handleSignUp}>
        <input
          type="email"
          placeholder="E-posta"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <input
          type="password"
          placeholder="Şifre"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <input
          type="text"
          placeholder="Ekleyeceğiniz URL"
          value={url}
          onChange={(e) => setUrl(e.target.value)}
          required
        />
        <button type="submit">Kayıt Ol ve URL Ekle</button>
      </form>
    </div>
  );
};

export default Register;