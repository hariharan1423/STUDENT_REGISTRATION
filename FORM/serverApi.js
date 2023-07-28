const express =  require('express');

const app = express();


const bodyParser = require('body-parser');

app.use(bodyParser.urlencoded({extended:false}));

app.set('view engine','pug');

app.use(express.static('../FORM/static'));



//DATABASE-CONNECTION
const Pool = require('pg').Pool;

const pool = new Pool({
    user:'postgres',
    host:'localhost',
    database:'STUDENT-REGISTRATION',
    port:'5432',
    password:'studywell333'
});

pool.connect((err)=>{
    if (err){console.log(err)};

    console.log('Data-Base Connected!!');
});


//ROUTING TO THE END-POINTS OF THE SERVER

app.get('/',(req,res)=>{
    res.sendFile('index.html',{root:__dirname});
})


app.get('/show',(req,res)=>{

    pool.query(('select * from details'),(err,results)=>{
        if(err){
            console.log(err);
        }

        res.render('show',{items:results.rows});
    })
});

app.post('/submit',(req,res)=>{

    console.log(req.body);
    const {firstname,lastname,DOB,regnum,email,contact,address}=req.body;

    pool.query('insert into details values($1,$2,$3,$4,$5,$6,$7)',[firstname,lastname,DOB,regnum,email,contact,address],(err)=>{
        if(err){
            console.log(err);
        }
        res.render('submit',{message:"success"});
    })
});




//SERVER CONNECTION
const PORT = 3000;
app.listen(PORT,(err)=>{
    if (err) console.log(err);

    console.log('SERVER-CONNECTED TO THE PORT!!');
});