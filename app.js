const express = require("express");
const app = express();
const cors = require("cors");
const stripe = require("stripe")(process.env.STRIPE_KEY);
const PORT = process.env.PORT || 7000

app.use(express.json());
app.use(cors());

// Checkout API
app.post("/api/create-checkout-session", async(req, res) => {
    const {products} = req.body;

    const lineItems = [{
        price_data:{
            currency: "inr",
            product_data: {
                name: products.name
            },
            unit_amount: products.price
        },
        quantity: products.qty
    }]

    const session = await stripe.checkout.sessions.create({
        payment_method_types: ["card"],
        line_items: lineItems,
        mode: 'payment',
        success_url: 'https://65e319561a90c3b278a465d9--chic-praline-5d82a9.netlify.app/success',
        cancel_url: 'https://65e319561a90c3b278a465d9--chic-praline-5d82a9.netlify.app/cancel' 
    })

    res.json({id: session.id})
})

app.listen(PORT, () => {
    console.log('Server Start')
})