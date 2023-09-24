// Import express, app, method-override, path, dan mongoose
const express = require('express');
const app = express();
const methodOverride = require('method-override')
const path = require('path');
const mongoose = require('mongoose');
const ErrorHandler = require('./ErrorHandler')
// End of imports

// Import model Product
const Product = require('./models/product')
const Garment = require('./models/garment')
// End of imports

// Konfigurasi URL, port, dan nama database MongoDB
const url = '192.168.1.100';
const port = '2626';
const dbName = 'shop_db';
// End of database configuration

// Menghubungkan ke database MongoDB
mongoose.connect(`mongodb://${url}:${port}/${dbName}`).then(() => {
    console.log('Terhubung ke MongoDB');
}).catch((err) => {
    console.log(err);
});
// End of MongoDB connection


//error handling
function wrapAsync(fn) {
    return function (req, res, next) {
        fn(req, res, next).catch(err => next(err))
    }
}
//end

// Setup express
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');
app.use(express.urlencoded({ extended: true }))
app.use(methodOverride('_method'))
// End of express setup

// Express routes //garment
app.get('/garments', wrapAsync( async(req, res) => {
    const garments = await Garment.find({});
    res.render('garments/index', {garments})
}));

app.get('/garments/create', wrapAsync(async(req, res) => {
    res.render('garments/create')
}))

app.post('/garments', wrapAsync( async(req, res) => {
    const garments = new Garment(req.body);
    await garments.save()
    console.log(garments);
    res.redirect('/garments')
}))

app.get('/garments/:id', wrapAsync(async(req, res) => {
    const {id} = req.params
    const garment = await Garment.findById(id).populate('products');
    res.render('garments/show', {garment})
}))

app.get('/garments/:garment_id/product/create', (req, res) => {
    const { garment_id } = req.params
    res.render('products/create', { garment_id })
})

app.post('/garments/:garment_id/product', wrapAsync(async(req, res) => {
    const {garment_id} = req.params
    const garment = await Garment.findById(garment_id)
    const product = new Product(req.body)
    
    garment.products.push(product);
    product.garments = garment


    await garment.save();
    await product.save();
    console.log(garment);
    res.redirect(`/garments/${garment_id}`)
}))


app.delete('/garments/:garment_id/', wrapAsync( async(req, res) => {
    const {garment_id} = req.params
    await Garment.findOneAndDelete({_id : garment_id});
    res.redirect('/garments') 
}))


// Express routes //product
app.get('/', wrapAsync(async (req, res) => {
    // Mengambil semua produk dari database
    const products = await Product.find({});
    console.log('Ada yang mengakses');
    res.render("products/index", { products });
}));

app.get('/product/create', (req, res) => {
    // Menampilkan halaman pembuatan produk
    res.render('products/create')
});

app.post('/product', wrapAsync( async (req, res) => {
    // Membuat dan menyimpan produk baru ke database
    const product = new Product(req.body);
    await product.save();   
    res.redirect(`/product/${product._id}`)
}))

app.get('/product/:id', wrapAsync( async (req, res) => {
    // Menampilkan detail produk berdasarkan ID
    const { id } = req.params;
    const product = await Product.findById(id).populate('garments');
    res.render('products/show', { product });
    // res.send({product})
}));

app.get('/product/:id/edit', wrapAsync(async (req, res) => {
    // Menampilkan halaman pengeditan produk berdasarkan ID
    const { id } = req.params;
    const product =  await Product.findById(id);
    res.render('products/edit',{ product });
})); 

app.put('/product/:id', wrapAsync(async (req, res) => {
    // Mengupdate produk berdasarkan ID
    const id = req.params;
    const product = Product.findByIdAndUpdate(id, req.body, { runValidators: true });
    res.redirect(`/product/${product._id}`);
}));


app.delete('/product/:id', wrapAsync(async (req, res) => {
    // Mendelete produk berdasarkan ID
    const {id} = req.params
    await Product.findByIdAndDelete(id);
    res.redirect('/garments')
}));


const validatorHandler = err => {
    err.status = 400
    err.message = Object.values(err.errors).map(item => item.message)
    return new ErrorHandler(err.message, err.status)
}

app.use((err, req, res, next) => {
    if (err.name === 'ValidationError') err = validatorHandler(err)
    if (err.name === 'CastError') {
        err.status = 404
        err.message = 'Product not found'
    }
    next(err)
})

app.use((err, req, res, next) => {
    const { status = 500, message = 'Something went wrong' } = err
    res.status(status).send(message);
})

app.use((req, res) => {
    res.send('404')
})

// Mendengarkan pada port 1026
app.listen(1020, () => {
    console.log(`Server berjalan di http://192.168.1.8:1026`);
})
// End of express routes
