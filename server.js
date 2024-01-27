const express=require('express');
const path=require('path');
const session=require('express-session');
const bodyParser=require('body-parser');
const app=express();

const users=[
    {id:1,username:'binoy',password:'bin'},
    {id:2,username:'girija',password:'gir'}
]

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }));
app.use(session({
    secret: 'key',
    resave: false,
    saveUninitialized: true,
    cookie:{maxAge:15000}
  }));

app.get('/',(req,res)=>{
    res.sendFile(path.join(__dirname,'login.html'))
})
app.post('/login',(req,res)=>{
    const {username,password}=req.body;
    const user=users.find((u)=>{
        return u.username===username&&u.password===password
    })
    if(user){
        // Store user information in the session
        req.session.user={id:user.id,username:user.username}
        res.status(200).sendFile(path.join(__dirname,'home.html'))
    }
    else{
        res.status(500).redirect('/')
    }
})
app.get('/sell',(req,res)=>{
    if(req.session.user){
        res.send('this is selling page')
    }else{
        res.redirect('/')
    }
    
})
app.get('/logout',(req,res)=>{
    req.session.destroy(()=>{
        res.redirect('/')
    })
})
    


app.listen(3000,()=>console.log('server started'));