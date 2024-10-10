import { useState } from 'react';
import { supabase } from '../../supabase';

export const signUpUser = async (email, password) => {
  const { user, error } = await supabase.auth.signUp({
    email,
    password,
  });

  if (error) {
    console.error('Kayıt hatası:', error.message);
    return null;
  } else {
    console.log('Kullanıcı kaydedildi:', user);
    return user;
  }
};

const Register = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [successMessage, setSuccessMessage] = useState('');

  const handleRegister = async (e) => {
    e.preventDefault();

    const user = await signUpUser(email, password);
    if (!user) {
      setErrorMessage('Kayıt işlemi başarısız oldu. Lütfen tekrar deneyin.');
      setSuccessMessage('');
    } else {
      setErrorMessage('');
      setSuccessMessage('Kayıt işlemi başarılı! Giriş yapabilirsiniz.');
    
      console.log('Kullanıcı kaydı başarılı:', user);
    }
  };

  return (
    <div>
      <h2>Kayıt Ol</h2>
      <form onSubmit={handleRegister}>
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
        <button type="submit">Kayıt Ol</button>
      </form>
      {errorMessage && <p style={{ color: 'red' }}>{errorMessage}</p>}
      {successMessage && <p style={{ color: 'green' }}>{successMessage}</p>}
    </div>
  );
};

export default Register;