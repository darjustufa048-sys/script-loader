const express = require('express');
const fs = require('fs');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3000;

app.get('/script', (req, res) => {
    const filePath = path.join(__dirname, 'EGirlHub_Monochrome-obfuscated.lua');
    
    fs.readFile(filePath, 'utf8', (err, data) => {
        if (err) {
            console.error(err);
            return res.status(500).send('-- Error: Script file missing or unreadable');
        }
        
        // Essential so your executor reads the raw Luau text cleanly
        res.setHeader('Content-Type', 'text/plain');
        res.send(data);
    });
});

app.get('/', (req, res) => {
    res.send('Loader API is online.');
});

app.listen(PORT, () => {
    console.log(`Loader server is running on port ${PORT}`);
});
