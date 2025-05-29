const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const apiRoutes = require('./routes/api');

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(bodyParser.json());
app.use('/api', apiRoutes);

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

const cors = require('cors');
app.use(cors({
  origin: 'http://car-rental-frontend-yong.s3-website-us-east-1.amazonaws.com' 
}));
