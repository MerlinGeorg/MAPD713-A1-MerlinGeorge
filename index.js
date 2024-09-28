import express from 'express';

const app = express();
app.use(express.json())

let datastore = {
    products: []
}


app.get('/products', (req,res)=>{
    res.json(datastore.products)
})

app.post('/product', (req, res)=>{
    const productData = req.body;
    if(!productData || !productData.productName || !productData.quantity){
        return res.status(400).json({error:"Invalid Data"});
    }
    datastore.products.push(userData);
    res.status(201).json(productData)
})