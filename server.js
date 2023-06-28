const express = require("express");
const mongoose = require("mongoose");
const fs = require("fs");
const app = express();
const path = require("path");
const AWS = require("aws-sdk");
require("dotenv").config()

AWS.config.update({
  accessKeyId: process.env.AWS_KEY,
  secretAccessKey: process.env.AWS_SECRET
});

const s3 = new AWS.S3()
const bucketName = "moonlitebucket"

const moonliteSchema = new mongoose.Schema({
  movie1: String,
  announceImg: String,
  announceHead: String,
  announceText: String,
  movie2: String,
  movie3: String,
  movie4: String,
});

// Register the "moonliteCollection" model with Mongoose
const Moonlite = mongoose.model("moonliteCollection", moonliteSchema, "moonliteCollection");

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Connect to MongoDB using Mongoose
mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
  .then(() => {
    console.log("Connected to MongoDB!");

    app.get("/", async (req, res) => {
      try {
        const data = await Moonlite.find({});
        console.log(data);
        const jsonData = JSON.stringify(data);
        console.log(jsonData);
    
        const indexHtml = fs.readFileSync("index.html", "utf8");
    
        const modifiedHtml = indexHtml.replace(
          "<!-- REPLACE_WITH_JSON -->",
          `<script>
            var serverData = ${jsonData};
            console.log(serverData);
            var movieurl1 = "https://moonlitebucket.s3.us-east-2.amazonaws.com/" + serverData[0].movie1
            var movieurl2 = "https://moonlitebucket.s3.us-east-2.amazonaws.com/" + serverData[0].movie2
            var movieurl3 = "https://moonlitebucket.s3.us-east-2.amazonaws.com/" + serverData[0].movie3
            var movieurl4 = "https://moonlitebucket.s3.us-east-2.amazonaws.com/" + serverData[0].movie4
            var announceurl = "https://moonlitebucket.s3.us-east-2.amazonaws.com/" + serverData[0].announceImg
            document.getElementById("slide1").style.backgroundImage = "url(" + movieurl1 + ")";
            document.getElementById("slide2").style.backgroundImage = "url(" + movieurl2 + ")";
            document.getElementById("slide3").style.backgroundImage = "url(" + movieurl3 + ")";
            document.getElementById("slide4").style.backgroundImage = "url(" + movieurl4 + ")";
            document.getElementById("announceImg").src = announceurl;
            document.getElementById("announceHead").innerHTML = serverData[0].announceHead;
            document.getElementById("announceText").innerHTML = serverData[0].announceText;
          </script>`
        );
    
        res.send(modifiedHtml);
      } catch (err) {
        console.error("Failed to retrieve data from MongoDB:", err);
        res.status(500).send("Internal Server Error");
      }
    });

    app.get('/assets/pages/admin.html', async (req, res) => {
      res.sendFile(path.join(__dirname, '/assets/pages/admin.html'));
    });

    app.get('/assets/pages/concessions.html', async (req, res) => {
      res.sendFile(path.join(__dirname, '/assets/pages/concessions.html'));
    });

    app.get('/assets/pages/info.html', async (req, res) => {
      res.sendFile(path.join(__dirname, '/assets/pages/info.html'));
    });

    app.get('/assets/pages/loginChange.html', async (req, res) => {
      try {
        const data = await Moonlite.find({});
        console.log(data);
        const jsonData = JSON.stringify(data);
        console.log(jsonData);
    
        const loginChangeHtml = fs.readFileSync("./assets/pages/login.html", "utf8");
    
        const loggedinNewHtml = loginChangeHtml.replace(
          "<!-- REPLACE_WITH_JSON -->",
          `<script>
            var serverData = ${jsonData};
            console.log(serverData)

            const username = serverData[0].moonliteUsername
            const password = serverData[0].moonlitePassword
          </script>`
        );
    
        res.send(changedHtml);
      } catch (err) {
        console.error("Failed to retrieve data from MongoDB:", err);
        // res.status(500).send("Internal Server Error");
      }
      res.sendFile(path.join(__dirname, '/assets/pages/loginChange.html'));
    });

    app.get('/assets/pages/login.html', async (req, res) => {

      try {
        const data = await Moonlite.find({});
        console.log(data);
        const jsonData = JSON.stringify(data);
        console.log(jsonData);
    
        const loginHtml = fs.readFileSync("./assets/pages/login.html", "utf8");
    
        const loggedinHtml = loginHtml.replace(
          "<!-- REPLACE_WITH_JSON -->",
          `<script>
            var serverData = ${jsonData};
            console.log(serverData)

            const username = serverData[0].moonliteUsername
            const password = serverData[0].moonlitePassword

            document.queryselector(".login-button).addEventListener("click", function(){
              if(document.getElementById("username") == username && document.getElementById("password") == password){
                window.location = "/admin"
              }
            })
          </script>`
        );
    
        res.send(changedHtml);
      } catch (err) {
        console.error("Failed to retrieve data from MongoDB:", err);
        // res.status(500).send("Internal Server Error");
      }

      res.sendFile(path.join(__dirname, '/assets/pages/login.html'));
    });

    app.get('/assets/css/style.css', async (req, res) => {
      res.sendFile(path.join(__dirname, '/assets/css/style.css'));
    });

    app.get('/assets/js/index.js', async (req, res) => {
      res.sendFile(path.join(__dirname, '/assets/js/index.js'));
    });

    // app.get("/favicon.ico", async (req, res) => {
    //   res.sendFile(path.join(__dirname, '/favicon.ico'));
    // })

    app.get('/assets/pages/showing.html', async (req, res) => {

      try {
        const data = await Moonlite.find({});
        console.log(data);
        const jsonData = JSON.stringify(data);
        console.log(jsonData);
    
        const currentHtml = fs.readFileSync("./assets/pages/showing.html", "utf8");
    
        const changedHtml = currentHtml.replace(
          "<!-- REPLACE_WITH_JSON -->",
          `<script>
            var serverData = ${jsonData};
            console.log(serverData);
            var movieurl1 = "https://moonlitebucket.s3.us-east-2.amazonaws.com/" + serverData[0].movie1
            var movieurl2 = "https://moonlitebucket.s3.us-east-2.amazonaws.com/" + serverData[0].movie2
            var movieurl3 = "https://moonlitebucket.s3.us-east-2.amazonaws.com/" + serverData[0].movie3
            var movieurl4 = "https://moonlitebucket.s3.us-east-2.amazonaws.com/" + serverData[0].movie4
            document.getElementById("slide1").style.backgroundImage = "url(" + movieurl1 + ")";
            document.getElementById("slide2").style.backgroundImage = "url(" + movieurl2 + ")";
            document.getElementById("slide3").style.backgroundImage = "url(" + movieurl3 + ")";
            document.getElementById("slide4").style.backgroundImage = "url(" + movieurl4 + ")";
          </script>`
        );
    
        res.send(changedHtml);
      } catch (err) {
        console.error("Failed to retrieve data from MongoDB:", err);
        // res.status(500).send("Internal Server Error");
      }

      res.sendFile(path.join(__dirname, '/assets/pages/showing.html'));

    });

    app.get("/all-data", async (req, res) => {
      try {
        const result = await Moonlite.find().exec();
        if (result) {
          res.status(200).json(result);
        } else {
          console.log('Uh Oh, something went wrong');
          res.status(500).json({ message: 'something went wrong' });
        }
      } catch (err) {
        console.error('Error retrieving data:', err);
        res.status(500).json({ message: 'Internal Server Error' });
      }
    });

    app.get(
      "/homeUpdate/:movie1/:movie2/:movie3/:movie4/:announceImg/:announceHead/:announceText",
      async (req, res) => {

        try {

          const file1 = req.params.movie1;
          const file2 = req.params.movie2;
          const file3 = req.params.movie3;
          const file4 = req.params.movie4;
          const file5 = req.params.announceImg;

          var filePath1 = fs.readFileSync(`./assets/images/${req.params.movie1}`)
          var filePath2 = fs.readFileSync(`./assets/images/${req.params.movie2}`)
          var filePath3 = fs.readFileSync(`./assets/images/${req.params.movie3}`)
          var filePath4 = fs.readFileSync(`./assets/images/${req.params.movie4}`)
          var filePath5 = fs.readFileSync(`./assets/images/${req.params.announceImg}`)

          for(let i = 1; i < 6; i++){

            var file = eval("file" + i)
            var filePath = eval("filePath" + i)

            const params = {
              Bucket: bucketName,
              Key: file,
              Body: filePath,
            }

            s3.upload(params, function(err, data) {
              if (err) {
                console.log('Error uploading image:', err);
              } else {
                console.log('Image uploaded:', data.Location);
              };

          })
        }

        // const url1 = s3.getSignedUrl('getObject', {
        //   Bucket: bucketName,
        //   Key: filePath1,
        // });
        // const url2 = s3.getSignedUrl('getObject', {
        //   Bucket: bucketName,
        //   Key: filePath2,
        // });
        // const url3 = s3.getSignedUrl('getObject', {
        //   Bucket: bucketName,
        //   Key: filePath3,
        // });
        // const url4 = s3.getSignedUrl('getObject', {
        //   Bucket: bucketName,
        //   Key: filePath4,
        // });
        // const url5 = s3.getSignedUrl('getObject', {
        //   Bucket: bucketName,
        //   Key: filePath5,
        // });

          const updatedData = {
            movie1: req.params.movie1,
            movie2: req.params.movie2,
            movie3: req.params.movie3,
            movie4: req.params.movie4,
            announceImg: req.params.announceImg,
            announceHead: req.params.announceHead,
            announceText: req.params.announceText,
          };

          const filter = { _id: new mongoose.Types.ObjectId("6495f0d65bafa39e36c4ec39") };
          const options = { new: true }; // Return the updated document

          console.log(filter);
          const updatedDocument = await Moonlite.findOneAndUpdate(filter, updatedData, options).exec();

          if (!updatedDocument) {
            console.log("Document not found");
            return res.status(404).send("Document not found");
          }

          console.log("Document updated successfully:", updatedDocument);
          res.status(200).send("Document updated successfully");
        } catch (err) {
          console.error("Failed to update document:", err);
          res.status(500).send("Internal Server Error");
        }
  });

    app.listen(process.env.PORT || 3000, () => {
      console.log(`API server running on port ${process.env.PORT || 3000}!`);
    });
  })
  .catch((err) => {
    console.error("Failed to connect to MongoDB:", err);
  });
