require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const bodyParser = require('body-parser');

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// MongoDB Connection
mongoose.connect('mongodb://localhost:27017/hospital_db', {
    useNewUrlParser: true,
    useUnifiedTopology: true
})
.then(() => console.log('Connected to MongoDB'))
.catch(err => console.error('MongoDB connection error:', err));

// Routes
app.use('/api/users', require('./routes/users'));
app.use('/api/appointments', require('./routes/appointments'));
app.use('/api/diseases', require('./routes/diseases'));
app.use('/api/admin', require('./routes/admin'));
app.use('/api/contact-us', require('./routes/contactUs'));
app.use('/api/reviews', require('./routes/reviews'));
app.use('/api/reviews', require('./routes/reviews'));

// Basic route
app.get('/', (req, res) => {
    res.json({ message: 'Hospital Management System API' });
});

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
