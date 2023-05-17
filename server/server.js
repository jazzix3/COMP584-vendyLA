const express = require('express');
const cors = require('cors');

const axios = require('axios');
const app = express();

const port = 4000;

app.use(cors());

app.get('/api/yelp', async (req, res) => {
  try {
    const url = 'https://api.yelp.com/v3/businesses/search';
    const apiKey = 'a6JQ3nyVjD9QvYXC8AfPBtDTYDunhAO9dKRwF7ATjP3Mp4nIVttpHgaJeOXZnZBvZZFq6QxCNc_UT6z3xjDlAEi97XQJaoLRjOxrPbDt3Ha8IfPCCB5OrXP7NrtRZHYx';
    const headers = {
      Authorization: `Bearer ${apiKey}`,
    };
    const { location } = req.query;
    const params = {
      location,
      categories: 'streetvendors',
      radius: 4820,   // 3 mi radius
      bounds: '33.677359, -118.562809|34.764463, -117.775136',
      sort_by: 'distance'
    };
    const response = await axios.get(url, { headers, params });
    res.send(response.data);
  } catch (err) {
    console.error(err);
    res.status(500).send('Internal Server Error');
  }
});



app.get('/api/latLng', async (req, res) => {
  try {
    const address = req.query.address;
    const apiKey = 'AIzaSyDI03QBupHJvGDZCOalEGCNVtVjDRhoEAs';
    const url = `https://maps.googleapis.com/maps/api/geocode/json?address=${address}&key=${apiKey}`;

    const response = await axios.get(url);
    res.send(response.data);
  }
  catch (err) {
    console.error(err);
    res.status(500).send('Error fetching /api/latLng');
  }
});

app.listen(port, () => {
  console.log(`Server is listening on port ${port}`);
});