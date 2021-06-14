const express = require('express')
const mongoose = require('mongoose');
const cors = require('cors');

const app = express()
const port = 3000

const uri = 'mongodb://127.0.0.1:27017/MernStack';
mongoose.set('useFindAndModify', false);
mongoose.connect(uri, {useNewUrlParser: true, useUnifiedTopology: true});

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
  // we're connected!
});

app.use(express.json());
app.use(cors());

// Initialize routes
app.use('/api/users', require('./controllers/userController'));

app.get('/', (req, res) => {
  res.send('Hello World!')
})

app.listen(port, () => {
  console.log(`Express server listening at http://localhost:${port}`)
})