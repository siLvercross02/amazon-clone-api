const express = require('express');
const cors = require('cors');
const { response } = require('express');
const stripe = require('stripe')('sk_test_51I7ZtwJfIWiE56ZraREu1D0FeObnBDVPhuTmBTtGkVTH40MNJuvyRgGVauqXfzAMXjbLyl2jnHr4MPyNJmnp0K2M00qqBjWAVk');

// API

// App Config
const app = express();

// Middleware
app.use(cors({ origin: true }));
app.use(express.json());

// API Test Routes
app.get('/', (request, response) => response.status(200).send('Test Routes'));

app.post('/payments/create', async(request, response) => {
    const total = request.query.total;

    console.log('Payment Request Received', total);

    const paymentIntent = await stripe.paymentIntent.create({
        amount: total,
        currency: 'usd',
    });

    // Ok - created
    response.status(201).send({
        clientSecret: paymentIntent.client_secret,
    });
});

app.listen(5000, () => console.log('Server Starting on Port 5000'))

module.exports = app;