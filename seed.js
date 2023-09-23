const mongoose = require('mongoose');

//models
const Product = require('./models/product')
//end

//url port and db name for connect to  mongodb
const url = '192.168.1.10';
const port = '2626';
const dbName = 'shop_db';
//end

//connect To Mongo DB
mongoose.connect(`mongodb://${url}:${port}/${dbName}`).then(() => {
    console.log('connected to mongodb');
}).catch((err) => {
    console.log(err);
});
//end

const seedProduct = [
    {
        "name": "Kemeja Flanel",
        "brand": "Hollister",
        "price": 750000,
        "color": "biru muda",
        "category": "Baju",
        "description": "Kemeja flanel dengan warna yang cerah, terbuat dari bahan flanel yang nyaman dan berkualitas tinggi.",
        "condition": "baru",
        "stock": 25,
    },
    {
        "name": "Celana Chino",
        "brand": "Levi's",
        "price": 900000,
        "color": "krem",
        "category": "Celana",
        "description": "Celana chino dengan warna yang cerah dan desain yang simpel, terbuat dari bahan katun yang nyaman dipakai.",
        "condition": "baru",
        "stock": 15,

    },
    {
        "name": "Sweater",
        "brand": "Gap",
        "price": 650000,
        "color": "merah muda",
        "category": "Jaket",
        "description": "Sweater berkualitas tinggi dengan warna yang cerah dan desain yang simpel, cocok untuk kegiatan sehari-hari.",
        "condition": "baru",
        "stock": 20,
    },
    {
        "name": "Sepatu Sneakers",
        "brand": "Nike",
        "price": 1200000,
        "color": "putih",
        "category": "Aksesoris",
        "description": "Sepatu sneakers dengan desain yang sporty dan modern, terbuat dari bahan sintetis yang berkualitas tinggi.",
        "condition": "baru",
        "stock": 10,
    },
    {
        "name": "Tas Ransel",
        "brand": "Herschel",
        "price": 1500000,
        "color": "biru",
        "category": "Aksesoris",
        "description": "Tas ransel dengan desain yang stylish dan modern, terbuat dari bahan polyester yang ringan dan tahan lama.",
        "condition": "baru",
        "stock": 5,
    },
    {
        "name": "Kacamata Aviator",
        "brand": "Ray-Ban",
        "price": 2000000,
        "color": "emas",
        "category": "Aksesoris",
        "description": "Kacamata aviator dengan desain yang elegan dan klasik, terbuat dari bahan logam berkualitas tinggi.",
        "condition": "baru",
        "stock": 8,

    },
    {
        "name": "Baju Renang",
        "brand": "Speedo",
        "price": 500000,
        "color": "biru tua",
        "category": "Baju",
        "description": "Baju renang dengan desain yang sporty dan ergonomis, terbuat dari bahan spandex yang nyaman dan tahan lama.",
        "condition": "baru",
        "stock": 12,
    },
    {
        "name": "Topi Baseball",
        "brand": "New Era",
        "price": 350000,
        "color": "hitam",
        "category": "Aksesoris",
        "description": "Topi baseball dengan desain yang simpel dan elegan, terbuat dari bahan katun berkualitas tinggi.",
        "condition": "baru",
        "stock": 18,
    },
    {
        "name": "Rompi",
        "brand": "Zara",
        "price": 850000,
        "color": "abu-abu",
        "category": "Jaket",
        "description": "Rompi dengan desain yang stylish dan modern, terbuat dari bahan wol yang nyaman dan berkualitas tinggi.",
        "condition": "baru",
        "stock": 7,

    },
    {
        "name": "Jas",
        "brand": "Hugo Boss",
        "price": 4500000,
        "color": "hitam",
        "category": "Jaket",
        "description": "Jas dengan desain yang elegan dan klasik, terbuat dari bahan wol yang nyaman dan berkualitas tinggi.",
        "condition": "baru",
        "stock": 3,
    },
    {
        "name": "Sepatu Loafers",
        "brand": "Gucci",
        "price": 8000000,
        "color": "coklat",
        "category": "Aksesoris",
        "description": "Sepatu loafers dengan desain yang mewah dan elegan, terbuat dari bahan kulit yang berkualitas tinggi.",
        "condition": "baru",
        "stock": 6,

    }
];

Product.insertMany(seedProduct).then((result) => {
    console.log(result);
}).catch((err) => {
    console.log(err);
});