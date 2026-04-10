const express = require('express');
const fs = require('fs');
const app = express();

app.use(express.json());

const FILE = 'data.json';

// Read data
function readData() {
    return JSON.parse(fs.readFileSync(FILE));
}

// Write data
function writeData(data) {
    fs.writeFileSync(FILE, JSON.stringify(data, null, 2));
}

// Add credentials
app.post('/add', (req, res) => {
    const data = readData();
    data.push(req.body);
    writeData(data);
    res.send("Added");
});

// View credentials
app.get('/view', (req, res) => {
    res.json(readData());
});

// Delete credentials
app.delete('/delete/:id', (req, res) => {
    let data = readData();
    data = data.filter((_, i) => i != req.params.id);
    writeData(data);
    res.send("Deleted");
});

// ✅ UPDATE (v2 FEATURE)
app.put('/update/:index', (req, res) => {
    let data = readData();

    const index = req.params.index;
    const { site, username, password } = req.body;

    if (data[index]) {
        data[index] = { site, username, password };
        writeData(data);
        res.send("Updated");
    } else {
        res.send("Invalid index");
    }
});

// Start server (KEEP AT END)
app.listen(3000, () => console.log("Running on port 3000"));