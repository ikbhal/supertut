const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const path = require('path');

const app = express();
const PORT = 7000;

app.use(cors());
app.use(bodyParser.json());

// Serve static files from the public directory
app.use(express.static(path.join(__dirname, 'public')));

app.get('/ping', (req, res) => {
  res.send('Pong!');
});


app.get('/teachers/', (req, res) =>{
  // return teachers.json at ../data/teachers.json
  res.sendFile(path.join(__dirname, '../data/teachers.json'));
});

app.post('/data', (req, res) => {
  const requestData = req.body;
  console.log('Received JSON data:', requestData);
  res.json({ message: 'Data received successfully' });
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
