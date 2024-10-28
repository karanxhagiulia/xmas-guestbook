const express = require('express');
const fs = require('fs');
const path = require('path');
const bodyParser = require('body-parser');

const app = express();
const PORT = 3000;

// Middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));
app.set('view engine', 'ejs');

// Routes
app.get('/', (req, res) => {
    res.render('index');
});

app.get('/guestbook', (req, res) => {
    const messages = JSON.parse(fs.readFileSync('messages.json'));
    res.render('guestbook', { messages });
});

app.get('/newmessage', (req, res) => {
    res.render('newmessage');
});

app.get('/ajaxmessage', (req, res) => {
    res.render('ajaxmessage');
});

// Post route for /newmessage
app.post('/newmessage', (req, res) => {
    const { username, country, message } = req.body;
    if (!username || !country || !message) {
        return res.status(400).send('All fields are required');
    }
    const messages = JSON.parse(fs.readFileSync('messages.json'));
    const newMessage = {
        username,
        country,
        message,
        date: new Date().toISOString(),
    };
    messages.push(newMessage);
    fs.writeFileSync('messages.json', JSON.stringify(messages, null, 2));
    res.redirect('/guestbook');
});

// AJAX route
app.post('/ajaxmessage', (req, res) => {
    const { username, country, message } = req.body;
    const messages = JSON.parse(fs.readFileSync('messages.json'));
    const newMessage = {
        username,
        country,
        message,
        date: new Date().toISOString(),
    };
    messages.push(newMessage);
    fs.writeFileSync('messages.json', JSON.stringify(messages, null, 2));
    res.json(messages); // Sends all messages back as a JSON array
});

app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});
