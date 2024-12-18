// imports and the setup, using expressm fs for reading and writing
const express = require('express');
const fs = require('fs');
const path = require('path');
const bodyParser = require('body-parser');

const app = express();
const PORT = 3000;

// using bodyParser for parsing incoming request 
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));
app.set('view engine', 'ejs');

// Utility function to load messages and returns and empty array if it's not read correctly
function loadMessages() {
    try {
        const data = fs.readFileSync('messages.json', 'utf8');
        return JSON.parse(data || '[]');
    } catch (error) {
        console.error('Error reading messages.json:', error);
        return [];
    }
}

// Routes
app.get('/', (req, res) => {
    res.render('index');
});

app.get('/guestbook', (req, res) => {
    const messages = loadMessages();
    res.render('guestbook', { messages });
});

app.get('/newmessage', (req, res) => {
    res.render('newmessage');
});

app.get('/ajaxmessage', (req, res) => {
    res.render('ajaxmessage');
});

// Post route for /newmessage
//Validates all the required fields so everything is filled
//reads existing messages, adds the new messages, saves the updated list back to messages.json (if the saving doesn't work it will give an error)
//Redirects to guestbook once the message is submitted correctly
app.post('/newmessage', (req, res) => {
    const { username, country, message } = req.body;
    if (!username || !country || !message) {
        return res.status(400).send('All fields are required');
    }
    const messages = loadMessages();
    const newMessage = {
        username,
        country,
        message,
        date: new Date().toISOString(),
    };
    messages.push(newMessage);
    
    fs.writeFile('messages.json', JSON.stringify(messages, null, 2), (err) => {
        if (err) {
            console.error('Error saving message:', err);
            return res.status(500).send('Internal Server Error');
        }
        res.redirect('/guestbook');
    });
});

// AJAX route for /ajaxmessage
//Similar to previous but it will make a request to the server without reloading the page
app.post('/ajaxmessage', (req, res) => {
    //basic validation to ensure all fields are filled
    const { username, country, message } = req.body;
    if (!username || !country || !message) {
        return res.status(400).json({ error: 'All fields are required' });
    }
    //load the existing messages
    const messages = loadMessages();
    // Create a new message object with a timestamp

    const newMessage = {
        username,
        country,
        message,
        date: new Date().toISOString(),
    };
    //Add the new message to the array
    messages.push(newMessage);
    //save the updated array back to messages.json
    fs.writeFile('messages.json', JSON.stringify(messages, null, 2), (err) => {
        if (err) {
            console.error('Error saving message:', err);
            return res.status(500).json({ error: 'Internal Server Error' });
        }
        res.json(messages); //sends all messages back as a JSON array
    });
});

app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});
