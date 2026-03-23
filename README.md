# Diary App

A simple diary application built with React for users to write and manage their personal diary entries.

## Overview
The Diary App allows users to securely log in, create, read, update, and delete diary entries. It provides a clean and intuitive interface for managing personal thoughts and reflections.

## Features
- User authentication with token-based login/logout
- Create, read, update, and delete diary entries
- Responsive design for seamless user experience

## Tech Stack / Built With
- JavaScript
- React
- Vite
- Axios

## Installation & Setup
```bash
git clone https://github.com/CodeName-R4M/diary-app.git
cd diary-app
npm install
npm run dev
```

## Usage
```javascript
// Handle user login
const handleLogin = async (token) => {
  if (!token) return;
  try {
    setAuthToken(token);
    const me = await getMe();
    setUser(me);
  } catch (e) {
    setAuthToken(null);
    localStorage.removeItem('diary_token');
    alert('Authentication failed');
  }
};
```

## Project Structure
```
├── .env
├── .github
├── .gitignore
├── index.html
├── node_modules
├── package-lock.json
├── package.json
├── public
├── src
│   ├── App.css
│   ├── App.jsx
│   ├── api.js
│   ├── components
│   ├── index.css
│   └── main.jsx
├── start.bat
└── vite.config.js
```

## Contributing
Contributions are welcome! Feel free to open issues and submit pull requests.

## License
This project is licensed under the ISC License.