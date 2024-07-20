const express = require('express');
const bodyParser = require('body-parser');
const bcrypt = require('bcrypt');
const path = require('path');

const app = express();
const port = 4000;

app.use(bodyParser.json());
app.use(express.static(path.join(__dirname)));
const users = [
    {
        email: 'nnavyasree393@gmail.com',
        hashedPassword: bcrypt.hashSync('harry@123', 8)
    }
];

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'index.html'));
});

app.post('/login', async (req, res) => {
    const { email, password } = req.body;
    console.log('Login attempt with:', email, password);

    try {
        const user = users.find(user => user.email === email);
        if (user && await bcrypt.compare(password, user.hashedPassword)) {
            console.log('Login successful!');
            res.json({ success: true });
        } else {
            console.log('Login failed!');
            res.json({ success: false });
        }
    } catch (error) {
        console.error('Error during login:', error);
        res.status(500).json({ success: false, error: 'Internal server error' });
    }
});

app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});
