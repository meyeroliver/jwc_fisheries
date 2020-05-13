import mongoose from 'mongoose';
import {
    productSchema
} from "../models/product.mjs"
import express from "express";
var router = express.Router();

router.get('/', async function (req, res) {

    try {
       
        const Product = mongoose.model('product', productSchema);
        var query = Product.find({takeAway: true});
        const result = await query.exec();
        res.send(result);
    } catch (error) {
        res.status(500);
        res.send("500 - Internal Server Error")
        console.log(error);
    }

});

router.post('/create', async function (req, res) {
    try {
        var Product = mongoose.model('product', productSchema);
        var doc = new Product({
            code: req.body.code,
            item: req.body.item,
            price: req.body.price,
            category: req.body.category,
            takeAway: req.body.takeAway    

        });
        var saved = await doc.save();
        res.send(saved);
    } catch (error) {
        res.status(500);
        res.send("500 - Internal Server Error");
        console.log(error)
    }
})

router.put('/update/category/:id', async function (req, res) {
    try {
        var id = req.params.id;
        const query = {
            _id: id
        };
        const Product = mongoose.model('product', productSchema)
        const result = await Product.updateOne(query, {
            category: req.body.category
        });
        res.send(result);
    } catch (error) {
        res.status(500);
        res.send("500 - Internal Server Error")
    }
})

router.put('/update/takeaway/:id', async function (req, res) {
    try {
        var id = req.params.id;
        const query = {
            _id: id
        };
        const Product = mongoose.model('product', productSchema)
        const result = await Product.updateOne(query, {
            takeaway: req.body.takeaway
        });
        res.send(result);
    } catch (error) {
        res.status(500);
        res.send("500 - Internal Server Error")
    }
})

router.put('/update/price/:id', async function (req, res) {
    try {
        var id = req.params.id;
        const query = {
            _id: id
        };
        const Product = mongoose.model('product', productSchema)
        const result = await Product.updateOne(query, {
            takeAway: req.body.takeAway
        });
        res.send(result);
    } catch (error) {
        res.status(500);
        res.send("500 - Internal Server Error")
    }
})


router.delete('/delete', async function (req, res) {
    res.send('deleting product');
});

export default router;