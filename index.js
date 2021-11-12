var express = require('express') // node_modules 내 express 관련 코드를 가져온다 
var app = express() 
var cors = require('cors')
var logger = require('morgan')
var mongoose = require('mongoose')
var routes = require('./src/routes')

var corsOptions = { // CORS 옵션 
    origin: '*', 
    credentials: true 
} 
const BASE_URL = 'https://dictionary-search.herokuapp.com/api/words'

const CONNECT_URL = 'mongodb+srv://jhr:8877@cluster0.hbm4u.mongodb.net/kor_dic_db?retryWrites=true&w=majority'
//const CONNECT_URL = 'mongodb://localhost:27017/kor_dic_db'
mongoose.connect(CONNECT_URL, {//mongo db 서버 연결
    useNewUrlParser: true,
    useUnifiedTopology : true 
}).then(() => console.log("mongodb connected"))
.catch(e => console.log('failed to connect mongodb: ${e}'))

app.use(cors(corsOptions)) // CORS 설정
app.use(express.json()) // request body 파싱
app.use(logger('tiny')) // Logger 설정

app.use("/api", routes)

app.post("/users", (req, res)=> {
    console.log(req.body.newUser)
    //데이터베이스에 새로운 사용자 생성
    res.json(`new user - ${req.body.newUser.name} created!`)
})

app.put("/users/:id", (req,res) => {
    console.log(req.body.updateUserInfo)
    //데이터베이스에서 id에 해당하는 사용자 정보 조회후 업데이트
    res.send(
        `user ${req.params.id} updated with payload ${JSON.stringify(
            req.body.updateUserInfo
        )}!` 
    )
})

app.delete("/users/:id", (req, res)=>{
    //데이터베이스에서 id에 해당하는 사용자 조회후 제거
    res.send(`user ${req.params.id} removed !`)
})
app.use((req, res, next) => {//사용자가 요청한 페이지가 없는 경우 에러처리
    res.status(404).send("sorry can`t find page! ")
})

app.use((err, req, res, next) => {//서버 내부 오류 처리
    console.error(err.stack)
    res.status(500).send("something is broken on server")
})

app.listen(process.env.PORT || 5000, () => { // 5000 포트로 서버 오픈 
    console.log("server is running on port 5000 ... - nodemon") 
}) 

