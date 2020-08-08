//jshint esversion:6

 //require module start
const express = require("express");
const bodyParser  = require("body-parser"); //to grabe the data from the form.
const request = require("request");
const https = require("https");
//require module end


const app = express();  //setup server

app.use(express.static("public")); //for uploading static files //in order for our server to serve up static files such as css ,img we use static()
app.use(bodyParser.urlencoded({extended: true}));//using bodyParser by use()
app.get("/",function(req,res){   // setup get route into the signup page
  res.sendFile(__dirname+"/signup.html");//root path (__dirname = get the location of our current directory), sendFiles= for send files
});

app.post("/",(req,res)=>{
  const firstName = req.body.fname;
  const lastName = req.body.lname;
  const email = req.body.email;
  console.log(firstName, lastName, email);


  const data ={  // data for the mailchimps
    members:[
      {
        email_address:email,
        status:"subscribed",
        merge_fields:{
          FNAME:firstName,
          LNAME:lastName
        }
      }
    ]
  };
   const jsonData = JSON.stringify(data); //converting hex to string

   const url = "https://us17.api.mailchimp.com/3.0/lists/aec296a172";
   const option ={
     method:"POST",
     auth:"jubair:0185e728b588a70c03470619a1bb4b3a-us17"
   };
  const request = https.request(url,option,(response)=>{ //post the data to the mailchimp server/externals
     response.on("data",(data)=>{
       console.log(JSON.parse(data));
     });
   });

   request.write(jsonData);
   request.end();
});

app.listen(3000,()=>{  //our app will listen to port 3000
  console.log("server started");
});

//api key
//0185e728b588a70c03470619a1bb4b3a-us17
//list
//aec296a172
