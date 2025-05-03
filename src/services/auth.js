const API_URL = import.meta.env.VITE_COUNTRY_APP_API_URL || 'http://localhost:5000/api';

function getStoredUsers() {
  const raw = localStorage.getItem('mock_users');
  return raw ? JSON.parse(raw) : [];
}

function setStoredUsers(users) {
  localStorage.setItem('mock_users', JSON.stringify(users));
}

function delay(ms = 300) {
  return new Promise(res => setTimeout(res, ms));
}

export async function registerUser({ name, email, password }) {
  await delay();
  const users = getStoredUsers();
  if (users.some(u => u.email === email)) {
    throw new Error('Email already registered');
  }
  const newUser = {
    id: Date.now().toString(),
    name,
    email,
    password   
  };
  users.push(newUser);
  setStoredUsers(users);
  // Return user without password
  const { password: _, ...safe } = newUser;
  return safe;
}

export async function loginUser({ email, password }) {
  await delay();
  const users = getStoredUsers();
  const found = users.find(u => u.email === email && u.password === password);
  if (!found) throw new Error('Invalid email or password');
  const { password: _, ...safe } = found;
  return safe;
}
