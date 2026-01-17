import 'dotenv/config';
import express from 'express';
import cors from 'cors';
import { registerUser } from "./modules/register.js";
import { loginUser } from "./modules/login.js";
import { myself } from "./modules/myself.js";
import { extractTokenFromHeader } from "./modules/jwt.js";

const app = express();
const port = process.env.PORT || 8000;

app.use(cors({
  origin: ['http://127.0.0.1:5173', 'http://localhost:5173'],
  credentials: true
}));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get("/", (req, res) => {
  res.json({ message: "Personal Diary API", status: "running" });
});

app.post('/api/auth/register', async (req, res) => {
  try {
    const result = await registerUser(req.body);
    res.json({ access_token: result.token, token_type: "bearer" });
  } catch (error) {
    if (error.message === "EMAIL_EXISTS") {
      return res.status(400).json({ detail: "Email already registered" });
    }
    res.status(500).json({ detail: error.message });
  }
});

app.post('/api/auth/login', async (req, res) => {
  try {
    const result = await loginUser(req.body);
    res.json({ access_token: result.token, token_type: "bearer" });
  } catch (error) {
    if (error.message === "USER_NOT_FOUND" || error.message === "INVALID_PASSWORD") {
      return res.status(400).json({ detail: "Invalid email or password" });
    }
    res.status(500).json({ detail: error.message });
  }
});

app.get('/api/auth/me', async (req, res) => {
  try {
    const token = extractTokenFromHeader(req);
    if (!token) {
      return res.status(401).json({ detail: "No token provided" });
    }
    const user = await myself({ token });
    res.json(user);
  } catch (error) {
    res.status(401).json({ detail: "Invalid authentication credentials" });
  }
});

app.listen(port, () => {
  console.log(`Server is running on http://127.0.0.1:${port}`);
});