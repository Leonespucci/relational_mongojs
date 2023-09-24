const mongoose = require('mongoose');


const productScema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    brand: {
        type: String,
        require: true,
    },
    price: {
        type: Number,
        min: [0, 'min stock 0 no minus'],
        required: true
    },
    color: {
        type: String,
        required: true
    },
    category: [{
        type: String,
        enum: ['Baju', 'Celana', 'Aksesoris', 'Jaket'],
        required: true
    }],
    description: {
        type: String,
        maxLength: 150,
        required: true
    },
    condition: {
        type: String,
        enum: ['baru', 'bekas'],
        default: 'baru',
        required: true
    },
    stock: {
        type: Number,
        min: [0, 'min stock 0 no minus'],
        required: true
    },
    garments: [
        {
        type: mongoose.Schema.Types.ObjectId,
        ref:'Garment'
        }
]
});


const Product = mongoose.model('Product', productScema);

module.exports = Product;
