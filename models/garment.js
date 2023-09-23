const mongoose = require('mongoose');

const garmentSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'Nama tidak boleh kosong']
    },
    location: {
        type: String,
    },
    contact: {
        type: String,
        required: [true, 'kontak tidak boleh kosong'],
    },
    products: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Product'
        }
    ]
});


const Garment = mongoose.model('Garmen', garmentSchema)

module.exports = Garment;
