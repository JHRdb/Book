const mongoose = require('mongoose') 
const book = require('./Book')

const userSchema = mongoose.Schema({ // 스키마 정의 
    name: { type: String, required: true, trim: true }, 
    age: { type: Number, required: true}, 
    email: { type: String, required: true, trim: true }, 
    books: { type: [book], required: true} 
}) 

const User = mongoose.model('User', userSchema) // 스키마로부터 생성된 모델 객체  
module.exports = User;
