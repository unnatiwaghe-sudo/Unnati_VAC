const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const { MongoMemoryServer } = require('mongodb-memory-server');

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Isolated Database Connection Configuration
async function connectDB() {
  try {
    const mongoServer = await MongoMemoryServer.create();
    const MONGO_URI = mongoServer.getUri();

    await mongoose.connect(MONGO_URI);
    console.log('✅ MongoDB Memory Server Connected Smoothly!');
  } catch (err) {
    console.error('❌ Database Connection Error:', err);
  }
}
connectDB();

// --- Schema Definitions ---
const movieSchema = new mongoose.Schema({
  title: { type: String, required: true },
  director: String,
  year: Number,
  genre: [String],
  watched: { type: Boolean, default: false },
  rating: { type: Number, min: 0, max: 10 }
});

const Movie = mongoose.model('Movie', movieSchema);

// --- API Endpoints & Routes ---

// Test Route
app.get('/api/test', (req, res) => {
  res.json({ message: "Independent CineTrack API is operational!" });
});

// Get all movies in watchlist
app.get('/api/movies', async (req, res) => {
  try {
    const movies = await Movie.find();
    res.json(movies);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Add a new movie to watchlist
app.post('/api/movies', async (req, res) => {
  try {
    const newMovie = new Movie(req.body);
    const savedMovie = await newMovie.save();
    res.status(201).json(savedMovie);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// Toggle watched status or update movie details
app.put('/api/movies/:id', async (req, res) => {
  try {
    const updatedMovie = await Movie.findByIdAndUpdate(
      req.params.id, 
      req.body, 
      { new: true, runValidators: true }
    );
    if (!updatedMovie) return res.status(404).json({ error: "Movie entry not found" });
    res.json(updatedMovie);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// Remove a movie from watchlist
app.delete('/api/movies/:id', async (req, res) => {
  try {
    const deletedMovie = await Movie.findByIdAndDelete(req.params.id);
    if (!deletedMovie) return res.status(404).json({ error: "Movie entry not found" });
    res.json({ message: "Movie successfully removed from CineTrack" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Server Initialization
const PORT = 5000;
app.listen(PORT, () => {
  console.log(`🚀 Independent CineTrack API running on port ${PORT}`);
});