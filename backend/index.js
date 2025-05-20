// server.js
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const bodyParser = require('body-parser');

const app = express();
app.use(cors());
app.use(bodyParser.json());

// MongoDB connection with error handling
mongoose.connect('mongodb://localhost:27017/persondb', {
  useNewUrlParser: true,
  useUnifiedTopology: true
}).then(() => {
  console.log('Connected to MongoDB');
}).catch((error) => {
  console.error('MongoDB connection error:', error);
});

// Define Person Schema
const personSchema = new mongoose.Schema({
  Name: {
    type: String,
    required: [true, 'Name is required'],
    trim: true
  },
  Age: {
    type: Number,
    required: [true, 'Age is required'],
  
    min: [0, 'Age cannot be negative']
  },
  Gender: {
    type: String,
    required: [true, 'Gender is required'],
    enum:["Male","Female"],
    trim: true
  },
  "Mobile number": {
    type: String,
    required: [true, 'Mobile number is required'],
    trim: true
  }
});

const Person = mongoose.model('Person', personSchema);

// Error handling middleware
const errorHandler = (err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({
    message: 'Something went wrong!',
    error: process.env.NODE_ENV === 'development' ? err.message : {}
  });
};

// REST API Endpoints

// GET all people
app.get('/person', async (req, res, next) => {
  try {
    const people = await Person.find();
    res.json(people);
  } catch (error) {
    next(error);
  }
});

// GET single person
app.get('/person/:id', async (req, res, next) => {
  try {
    const person = await Person.findById(req.params.id);
    if (!person) {
      return res.status(404).json({ message: 'Person not found' });
    }
    res.json(person);
  } catch (error) {
    next(error);
  }
});

// POST create person
app.post('/person', async (req, res, next) => {
  try {
    const person = new Person(req.body);
    const savedPerson = await person.save();
    res.status(201).json(savedPerson);
  } catch (error) {
    if (error.name === 'ValidationError') {
      return res.status(400).json({ message: error.message });
    }
    next(error);
  }
});

// PUT update person
app.put('/person/:id', async (req, res, next) => {
  try {
    const person = await Person.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    );
    if (!person) {
      return res.status(404).json({ message: 'Person not found' });
    }
    res.json(person);
  } catch (error) {
    if (error.name === 'ValidationError') {
      return res.status(400).json({ message: error.message });
    }
    next(error);
  }
});

// DELETE person
app.delete('/person/:id', async (req, res, next) => {
  try {
    const person = await Person.findByIdAndDelete(req.params.id);
    if (!person) {
      return res.status(404).json({ message: 'Person not found' });
    }
    res.json({ message: 'Person deleted successfully' });
  } catch (error) {
    next(error);
  }
});

// Root endpoint
app.get('/', (req, res) => {
  res.send('Welcome to the Person API');
});

// Apply error handling middleware
app.use(errorHandler);

// Start server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
