const bodyParser = require("body-parser");
const express = require("express");
const https = require("https");
// const request = require("request");
const app = express();
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));

app.get("/", function (req, res) {
    res.sendFile(__dirname + "/signup.html");
})

app.post("/failure", function (req, res) {
    res.redirect("/");
})

app.post("/", function (req, res) {
    console.log(req.body.fname);
    const fname = req.body.fname;
    const email = req.body.email;
    const lname = req.body.lname;

    var data = {
        members: [
            {
                email_address: email,
                status: "subscribed",
                merge_fields: {
                    FNAME: fname,
                    LNAME: lname
                }

            }
        ]
    }; 

    const jsonData = JSON.stringify(data);
    const url = "https://us21.api.mailchimp.com/3.0/lists/41dc28d604";

    const options = {
        method: "POST",
        auth: "IIT Dharwad:***-us21"
    };



    const request = https.request(url, options, function (response) {
        response.on("data", function (data) {
            console.log(JSON.parse(data));
            var status=response.statusCode;
            if(status==200) {
            res.sendFile(__dirname+"/success.html");
            }
            else
            {
                res.sendFile(__dirname+"/failure.html");
            }
            console.log("ooooooooooooooooooooooo + :"+response.statusCode);
        })
    })
    request.write(jsonData);
    request.end();
})

app.listen(process.env.PORT || 3000, () => {
    console.log('listening on PORT');
})


// key1 = ***
// key2 = ***
// audience id = ***
