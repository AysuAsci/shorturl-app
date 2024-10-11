import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

export const supabase = createClient(supabaseUrl, supabaseAnonKey);
// Kullanıcı kaydı 
export const signUpUser = async (email, password) => {
  const { user, error } = await supabase.auth.signUp({
    email,
    password,
  });

  if (error) {
    console.error('Kayıt hatası:', error.message);
    return null; 
  }
  return user; 
};

// URL ekleme
export const addUrl = async (url) => {
  const { data, error } = await supabase
    .from('urls') 
    .insert([
      { url, user_id: supabase.auth.user()?.id }, 
    ]);

  if (error) {
    console.error('URL eklenirken hata:', error.message);
  } else {
    console.log('URL eklendi:', data);
  }
};


export const signInUser = async (email, password) => {
  const { user, error } = await supabase.auth.signIn({
    email,
    password,
  });

  if (error) {
    console.error('Giriş hatası:', error.message);
    return null; 
  return user; 
};
}