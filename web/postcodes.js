import fetch from 'node-fetch';
import express from 'express';
import { APIKEY } from './APIkey.js';

const app = express();
const PORT = 3000;

app.use(express.json());

// Define the deg2rad function
function deg2rad(degrees) {
    return degrees * (Math.PI / 180);
}

// Define the calculateDistance function
function calculateDistance(lat1, lon1, lat2, lon2) {
    const earthRadiusKm = 6371;

    const dLat = deg2rad(lat2 - lat1);
    const dLon = deg2rad(lon2 - lon1);

    lat1 = deg2rad(lat1);
    lat2 = deg2rad(lat2);

    const a = Math.sin(dLat / 2) * Math.sin(dLat / 2) +
        Math.cos(lat1) * Math.cos(lat2) * Math.sin(dLon / 2) * Math.sin(dLon / 2);

    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));

    const distanceKm = earthRadiusKm * c;
    return distanceKm.toFixed(1); // Return distance rounded to 1 decimal place
}

// Define the getInfo function
function getInfo(data, lati2, longi2) {
    console.log(data.latitude);
    console.log(data.longitude);
    const distance = calculateDistance(data.latitude, data.longitude, lati2, longi2);
    console.log(`Distance: ${distance} km`);
    return distance;
}

// Define the endpoint to fetch postcode data and calculate distance
app.get('/postcode/:postcode', async (req, res) => {
    try {
        const postcode = req.params.postcode;
        const myHeaders = {
            'token': APIKEY, // Replace 'YOUR_TOKEN_HERE' with your actual token
            // Add other headers if needed (e.g., Content-Type)
        };

        const response = await fetch(`https://json.api-postcode.nl?postcode=${postcode}&number=1`, {
            method: 'GET',
            headers: myHeaders,
        });

        if (!response.ok) {
            console.log(response);
            throw new Error('Failed to fetch data');
            
        }

        // Extract lati2 and longi2 from request query parameters
        const { lati2, longi2 } = req.query;

        const data = await response.json();
        const distance = getInfo(data, lati2, longi2);
        res.json({ distance });
    } catch (error) {
        console.error('Error fetching data:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
