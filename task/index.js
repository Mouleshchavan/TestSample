const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const cors = require('cors');
const axios = require('axios');


const app = express();
const port = 3000;

app.use(bodyParser.json());
app.use(cors());
//HV9Sod16nlKoxyc1
mongoose.connect('mongodb+srv://mouleshchavan:HV9Sod16nlKoxyc1@cluster0.bre08n6.mongodb.net/?retryWrites=true&w=majority', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

// User Schema
const userSchema = new mongoose.Schema({
  username: { type: String, unique: true },
  password: String,
});

const User = mongoose.model('User', userSchema);

const jwtSecret = 'your-secret-key';

// Middleware for verifying JWT
const blacklistedTokens = []; // Define the array at a higher scope

// Logout API
app.post('/api/logout', (req, res) => {
  const token = req.headers.authorization;

  if (!token) {
    return res.status(401).json({ message: 'Unauthorized' });
  }

  // Add the token to the blacklist with an expiration time
  const expirationTime = Date.now() + 300 * 1000; // 300 seconds
  blacklistedTokens.push({ token, expirationTime });

  res.status(200).json({ message: 'Logged out successfully' });
});

// Modify the verifyToken middleware to use blacklistedTokens
const verifyToken = (req, res, next) => {
  const token = req.headers.authorization;
  if (!token) {
    return res.status(401).json({ message: 'Unauthorized' });
  }

  // Check if the token is blacklisted or expired
  const blacklistedToken = blacklistedTokens.find((entry) => entry.token === token);

  if (blacklistedToken && Date.now() < blacklistedToken.expirationTime) {
    return res.status(401).json({ message: 'Token is blacklisted or expired' });
  }

  jwt.verify(token, jwtSecret, (err, decoded) => {
    if (err) {
      return res.status(401).json({ message: 'Unauthorized' });
    }
    req.user = decoded;
    next();
  });
};

// Registration API
app.post('/api/signup', async (req, res) => {
  try {
    let { username, password } = req.body;

    // Validation: Check for missing or empty username and password
    if (!username || !password) {
      return res.status(400).json({ message: 'Missing username or password' });
    }

    // Remove leading and trailing whitespace in username and password
    username = username.trim();
    password = password.trim();

    // Validation: Check for valid username (only alphabetic characters, no spaces or numbers)
    if (!/^[a-zA-Z]+$/.test(username)) {
      return res.status(400).json({ message: 'Invalid username format' });
    }

    // Validation: Check for valid password length (minimum 10 characters)
    if (password.length < 10) {
      return res.status(400).json({ message: 'Password should be at least 10 characters long' });
    }

    // Validation: Check for strong password (contains capital letter, small letter, number, and special character)
    if (!/(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])/.test(password)) {
      return res.status(400).json({ message: 'Password is not strong enough' });
    }

    // Validation: Check for duplicate username
    const existingUser = await User.findOne({ username });
    if (existingUser) {
      return res.status(400).json({ message: 'Username already exists' });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = new User({ username, password: hashedPassword });
    await newUser.save();

    // Set token expiration to 10 minutes (600 seconds)
    const token = jwt.sign({ username }, jwtSecret, { expiresIn: '600s' });

    // Modify the response to return a success message and the user object
    return res.status(200).json({ message: 'Registration successful', user: newUser });
  } catch (error) {
    return res.status(500).json({ message: 'Internal server error' });
  }
});


// Login API
app.post('/api/login', async (req, res) => {
  try {
    const { username, password } = req.body;

    // Validation: Check for missing fields
    if (!username || !password) {
      return res.status(400).json({ message: 'Missing username or password' });
    }

    const user = await User.findOne({ username });

    if (!user) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);

    if (!isPasswordValid) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }

    // Return a JWT token with a 5-second expiration after successful login
    const token = jwt.sign({ username }, jwtSecret, { expiresIn: '100000000s' });
    return res.status(200).json({ token });
  } catch (error) {
    return res.status(500).json({ message: 'Internal server error' });
  }
});


// Logout API
app.post('/api/logout', (req, res) => {
  const token = req.headers.authorization;

  if (!token) {
    return res.status(401).json({ message: 'Unauthorized' });
  }

  // Add the token to the blacklist with an expiration time
  // In this example, we set the token to expire in 5 minutes (300 seconds)
  const expirationTime = Date.now() + 300 * 1000; // 300 seconds
  blacklistedTokens.push({ token, expirationTime });

  res.status(200).json({ message: 'Logged out successfully' });
});


// Protected Products API
app.get('/api/products', verifyToken, (req, res) => {
  const externalApiUrl = 'https://dummyjson.com/products';

  // Use Axios to fetch data from the external API
  axios.get(externalApiUrl)
    .then((response) => {
      // Handle the response data and return it as a response
      let products = response.data.products;

      // Filtering based on query parameters
      if (req.query.id) {
        products = products.filter(product => product.id == req.query.id);
      }
      if (req.query.title) {
        products = products.filter(product => product.title.includes(req.query.title));
      }
      if (req.query.description) {
        products = products.filter(product => product.description.includes(req.query.description));
      }
      if (req.query.price) {
        products = products.filter(product => product.price === parseFloat(req.query.price));
      }
      if (req.query.discountPercentage) {
        products = products.filter(product => product.discountPercentage === parseFloat(req.query.discountPercentage));
      }
      if (req.query.rating) {
        products = products.filter(product => product.rating === parseFloat(req.query.rating));
      }
      if (req.query.stock) {
        products = products.filter(product => product.stock === parseInt(req.query.stock));
      }
      if (req.query.brand) {
        products = products.filter(product => product.brand === req.query.brand);
      }
      if (req.query.category) {
        products = products.filter(product => product.category === req.query.category);
      }

      res.status(200).json(products);
    })
    .catch((error) => {
      // Handle any errors that occurred during the request
      console.error('Error:', error.message);
      res.status(500).json({ message: 'Failed to fetch external data' });
    });
});


app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
