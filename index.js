const express = require('express');
const fs = require('fs');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3000;

// Route that your loadstring will hit
app.get('/script', (req, res) => {
    const filePath = path.join(__dirname, 'script.lua');
    
    fs.readFile(filePath, 'utf8', (err, data) => {
        if (err) {
            console.error(err);
            return res.status(500).send('-- Error: Script file missing or unreadable');
        }
        
        // CRITICAL: Must be text/plain so executors parse the raw code correctly
        res.setHeader('Content-Type', 'text/plain');
        res.send(data);
    });
});

// Basic fallback route for the home page
app.get('/', (req, res) => {
    res.send('Luau Loader API is online.');
});

app.listen(PORT, () => {
    console.log(`Loader server is running on port ${PORT}`);
});
