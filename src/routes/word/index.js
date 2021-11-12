const express = require('express')
const WordRouter = express.Router()

const Word = require("../../../models/Word");

WordRouter.route('/(:word)?').get( async (req, res) => {
    let words = []
    const { word } = req.params
//  const queries = word.split(',')

    if(word !== "undefined" && word !== undefined){
        console.log(word)
        try{
        //     words = [ { 
        //         r_seq: "1", 
        //         r_word: "학원", 
        //         r_link: "https//google.com",
        //         r_chi: "한자", 
        //         r_des: "학원은 지루하다", 
        //         r_pos: "포스", 
        //     },  
        //     { 
        //         r_seq: "1", 
        //         r_word: "학원", 
        //         r_link: "https//google.com", 
        //         r_chi: "한자", 
        //         r_des: "학원은 지루하다", 
        //         r_pos: "포스", 
        //     } 
        // ]

        //     words = await Word.find({ r_des: {$in: queries}})
        //    //words = await Word.find({r_word:{$regex: `^${word}`}})
        //     //검색어로 시작하는 단어 찾기
            
        //     //words = await Word.find({r_word:{$regex: `${word}$`}})
        //     //검색어로 끝나는 단어 찾기
            
        //     //words = await Word.find({ r_des:{$regex: `${word}`}})
        //     //내용에 검색어가 있는 경우

             words = await Word.find({//검색어 2가지 검색(시작하는 단어 , 내용)
                 $or:[
                     {r_word : {$regex: `${word}`}},
                     {r_des: {$regex: `${word}`}}
                 ]})
        //     .sort({"_id":1})//-1 :  최신순(내림차순) , 1: 과거순(오름차순)
        //     .limit(6)
        }catch(e){
            console.log(e)
        }             
        //데이터베이스에서 쿼리로 단어를 검색        
    }else{
        //데이터베이스에서 전체 단어 검색
        console.log(word)
        //console.log(`word database:${Word}`)
        try{
            // words = [ 
            //     { 
            //         r_seq: "1", 
            //         r_word: "학원", 
            //         r_link: "https//google.com", 
            //         r_chi: "한자", 
            //         r_des: "학원은 지루하다", 
            //         r_pos: "포스", 
            //     }, 
            //     { 
            //         r_seq: "1", 
            //         r_word: "학원", 
            //         r_link: "https//google.com", 
            //         r_chi: "한자", 
            //         r_des: "학원은 지루하다", 
            //         r_pos: "포스", 
            //     }, 
            //     { 
            //         r_seq: "1", 
            //         r_word: "학원", 
            //         r_link: "https//google.com", 
            //         r_chi: "한자", 
            //         r_des: "학원은 지루하다", 
            //         r_pos: "포스", 
            //     }, 
            //     { 
            //         r_seq: "1", 
            //         r_word: "학원", 
            //         r_link: "https//google.com", 
            //         r_chi: "한자", 
            //         r_des: "학원은 지루하다", 
            //         r_pos: "포스", 
            //     }, 
            //     { 
            //         r_seq: "1", 
            //         r_word: "학원", 
            //         r_link: "https//google.com", 
            //         r_chi: "한자", 
            //         r_des: "학원은 지루하다", 
            //         r_pos: "포스", 
            //     }, 
            //     {
            //          r_seq: "1",
            //           r_word: "학원", 
            //           r_link: "https//google.com", 
            //           r_chi: "한자", 
            //           r_des: "학원은 지루하다",
            //            r_pos: "포스", 
            //         } 
            //     ]
             words = await Word.find() 
        }catch(e){
            console.log(e)
        }               
    }
        res.json({status:200, words})
})
module.exports = WordRouter