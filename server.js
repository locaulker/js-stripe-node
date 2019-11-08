if (process.env.NODE_ENV !== 'production') {
  require('dotenv').load()
}


const stripeSecretKey = process.env.STRIPE_SECRET_KEY
const stripePublicKey = process.env.STRIPE_PUBLIC_KEY
console.log(stripeSecretKey, stripePublicKey);


const express = require('express');
const app = express();

// Use 'ejs' to handle views
app.set('view engine', 'ejs');

// The 'public' folder serves 'staic files' of the application
app.use(express.static('public'));

// Access the application at: localhost:3000
app.listen(3000);