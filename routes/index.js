const express = require('express');
const fs = require('fs');
const path = require('path');
const router = express.Router();
const dataPath = path.join(__dirname, '../data/messages.json');

function getMessages() {
    const json = fs.readFileSync(dataPath, 'utf-8');
    return JSON.parse(json);
}

function saveMessages(messages) {
    fs.writeFileSync(dataPath, JSON.stringify(messages, null, 2));
}

const messages = [
    { text: "Hi there!", user: "Amando", added: new Date() },
    { text: "Hello World!", user: "Charles", added: new Date() }
];

router.get('/', (req, res) => {
    const messages = getMessages();
    res.render('index', { title: "Mini Messageboard", messages: messages });
});

// new message display
router.get('/new', (req, res) => {
    res.render('form', { title: 'New Message' });
});

// new message submit
router.post('/new', (req, res) => {
    const messages = getMessages();

    const messageUser = req.body.messageUser || 'Anonymous';
    const messageText = req.body.messageText;

    // don't register an empty message
    if (!messageText || messageText.trim() === '') {
        return res.redirect('/new');
    }

    messages.push({
        user: messageUser,
        text: messageText,
        added: new Date()
    });

    res.redirect('/');
});

// message by user
router.get('/messages/:id', (req, res) => {
    const id = parseInt(req.params.id, 10);
    const message = messages[id];

    if (!message) {
        return res.status(404).send('Message not found');
    }

    res.render('message', { title: `Message from ${message.user}`, message });
});

// delete message
router.get('/messages/:id/delete', (req, res) => {
    const messages = getMessages();
    const id = parseInt(req.params.id, 10);

    if (id < 0 || id >= messages.length) {
        return res.status(404).send('Message not found');
    }

    messages.splice(id, 1);
    saveMessages(messages);
    res.redirect('/');
});

// edit message display
router.get('/messages/:id/edit', (req, res) => {
    const id = parseInt(req.params.id, 10);
    const message = messages[id];

    if (!message) {
        return res.status(404).send('Message not found');
    }

    res.render('edit', { title: `Edit Message from ${message.user}`, message, id });
});

// edit message submit
router.post('/messages/:id/edit', (req, res) => {
    const messages = getMessages();
    const id = parseInt(req.params.id, 10);

    if (!messages[id]) {
        return res.status(404).send('Message not found');
    }

    const messageUser = req.body.messageUser || 'Anonymous';
    const messageText = req.body.messageText;

    if (!messageText || messageText.trim() === '') {
        return res.redirect(`/messages/${id}/edit`);
    }

    message.user = messageUser;
    message.text = messageText;
    message.added = new Date()

    saveMessages(message);
    res.redirect('/');
});

module.exports = router;
