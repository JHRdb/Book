const express = require('express') 
const BookRouter = express.Router()
const Book = require("../../models/Book");

BookRouter.route('/').get( (req, res) => { //전체 도서 목록 조회
    res.send('All Book list') 
}) 

module.exports = BookRouter

BookRouter.route('/:id').get( (req, res) => {  //특정 도서 조회
    Book.findById(req.params.id, (err, book) => { 
        if(err) throw err; 
        res.json({ status: 200, book}) 
    }) 
})


BookRouter.route('/').post( (req, res) => { // 새로운 도서 생성
     console.log(`name: ${req.body.name}`) 
     Book.findOne({ name: req.body.name, done: false }, async (err, book) => { // 중복체크 
        if(err) throw err; 
        if(!book){ // 데이터베이스에서 해당 할일을 조회하지 못한 경우 
            const newBook = new Book(req.body); 
            await newBook.save().then( () => { 
                res.json({ status: 201, msg: 'new book created in db !', book}) 
            }) 
        
        }else{ // 생성하려는 할일과 같은 이름이고 아직 끝내지 않은 할일이 이미 데이터베이스에 존재하는 경우 
            const msg = 'this book already exists in db !' 
            console.log(msg) 
            res.json({ status: 204, msg})
         } 
    }) 
})


BookRouter.route('/:id').put( (req, res) => { // 특정 도서 정보 변경
    Book.findByIdAndUpdate(req.params.id, req.body, {new: true}, (err, book) => { 
        if(err) throw err; 
        res.json({ status: 204, msg: `book ${req.params.id} updated in db !`, book}) 
    }) 
})

BookRouter.route('/:id').delete( (req, res) => { 
    Book.findByIdAndRemove(req.params.id, (err, book) => { 
        if(err) throw err; 
        res.json({ status: 204, msg: `book ${req.params.id} removed in db !`}) 
    }) 
})