const express = require('express');
const app = express();
const https = require('https')
const port = 3000;
const bodyParser = require("body-parser");
const { json } = require('body-parser');
app.use(bodyParser.urlencoded({extended:true}))
app.use(express.static('public'))

app.get('/signup',(req,res)=>{
    res.sendFile(__dirname+"/signup.html")
})

app.post('/signup',(req,res)=>{
    const firstName = req.body.firstName;
    const lastName = req.body.lastName;
    const email = req.body.email;
    
    var data = {
        members :[
            {
                email_address:email,
                status:"subscribed",
                merge_fields:{
                    FNAME:firstName,
                    LNAME:lastName
                }
            },
            
        ]
    }
    const url = "https://us10.api.mailchimp.com/3.0/lists/86c7223ad9"
    const option = {
        method:"POST",
        auth:"Sarthak09:5b5bd9215c9478c57a71310cff5f49-us10"
    }
    const jsonData = JSON.stringify(data)
   const request= https.request(url,option,(response)=>{
    if(response.statusCode==200){
        res.sendFile(__dirname+"/sucess.html")
    }
    else{
        res.sendFile(__dirname+"/fail.html")
    }
        response.on("data",(data)=>{
            

        })
        

    })
    request.write(jsonData)
    request.end()
})
app.post('/tryagain',(req,res)=>{
    res.sendFile(__dirname+'/signup.html')
})

app.listen(port,()=>{
    console.log(`app running at port ${port}`)
})

// api key
// 5b5bd9215c9478c57a71310cff5ff749-us10

// list id
// 86c7223ad9