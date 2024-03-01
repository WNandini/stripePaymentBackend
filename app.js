const express = require("express");
const app = express();
const cors = require("cors");
const stripe = require("stripe")("sk_test_51Kl4flSDZlNeYvugVJQ9Rj2S4AnWtraRuyqtdPwK23MoVXxbijC8K6vIutg6hksgChpUne1wSusgnaKJY5usduOo00U8fYNGNI");
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
        success_url: 'https://65e1b7998e48cebc6896d20c--preeminent-buttercream-e1f1d9.netlify.app/success',
        cancel_url: 'https://65e1b7998e48cebc6896d20c--preeminent-buttercream-e1f1d9.netlify.app/cancel' 
    })

    res.json({id: session.id})
})

app.listen(PORT, () => {
    console.log('Server Start')
})