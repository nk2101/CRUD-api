const express = require('express');

const bodyParser= require('body-parser');

var fs = require('fs');

const app = express();

app.use(bodyParser.urlencoded({
    extended:true
}));

app.get('/',function(req,res)
{
    res.sendFile(__dirname + "//index.html")
})

app.post("/addUser", function(req,res)
{
    var title = req.body.title;
    var description=req.body.description;
    var isdone= req.body.isdone;
    var isactive = req.body.isactive;
    var createdat=req.body.createdat;
    var updatedat=req.body.updatedat;
    var obj={};
    var key= req.body.userid;
    var newtitle={
    "title":title,
    "description":description,  
    "isdone":isdone,
    "isactive":isactive,
    "createdat":createdat,
    "updatedat":updatedat
}
obj[key]=newtitle;

fs.readFile("user.json","utf8",function(err,data){
    data= JSON.parse(data);
    data[key]=obj[key];
    console.log(data);
    var updatetitle =JSON.stringify(data);

fs.writeFile('user.json',updatetitle,function(err)
    {
      res.end(JSON.stringify(data))
    })
})
})

app.post('/parcularData',function(req,res)
{
    fs.readFile("user.json","utf8",function(err,data){
        var users= JSON.parse(data);
        var user =users[req.body.urid];
        console.log(user);
        res.end(JSON.stringify(user));

    })
})
app.post('/deleteData',function(req,res)
{
    fs.readFile("user.json","utf8",function(err,data){
        data = JSON.parse(data);
        delete data[req.body.uid];
        console.log(data);
        var updatetitle= JSON.stringify(data)
        fs.writeFile('user.json',updatetitle,function(err)
           {
            res.end(JSON.stringify(data))
           })
    

    })
})  
app.listen(9000,'localhost',()=>{
    console.log('server loaded'); 
})