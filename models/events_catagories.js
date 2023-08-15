const mongoose = require('mongoose');

const Schema  = mongoose.Schema;

const CategorySchema = new Schema({
    id_:{type:'string', required: true},
    title: {type:'string', required: true},
    description: {type:'string', required: true},
    image: {type:'string', required: true}
},
{
    timestamps:true
});

const Category = mongoose.model('Category', CategorySchema);
module.exports = Category;