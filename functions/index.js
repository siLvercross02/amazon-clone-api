const express = require('express');
const cors = require('cors');
const { response } = require('express');
const stripe = require('stripe')('sk_test_51I7ZtwJfIWiE56ZraREu1D0FeObnBDVPhuTmBTtGkVTH40MNJuvyRgGVauqXfzAMXjbLyl2jnHr4MPyNJmnp0K2M00qqBjWAVk');

// port
let port = process.env.PORT || 8080;


// API

// App Config
const app = express();

// Middleware
app.use(cors({ origin: true }));
app.use(express.json());

// API Test Routes 1
app.get('/', (request, response) => response.status(200).send('Test Routes'));

app.get('/test', (request, response) => response.status(200).send(console.log('test 1')));

app.post('/test-post', async (request, response ) => {
    console.log('test post');
});

app.post('/payments/create', async (request, response) => {
    const total = request.query.total;

    console.log('Payment Request Received + ', total);

    const paymentIntent =  await stripe.paymentIntents.create({
        amount: total,
        currency: 'usd',
    });

   // Ok - created
    response.status(201).send({
        clientSecret: paymentIntent.client_secret,
    });

});

app.listen(port, () => console.log('Server Starting on Port 8080'))

module.exports = app;