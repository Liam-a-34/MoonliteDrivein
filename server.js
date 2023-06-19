const express = require("express")

const mongodb = require("mongodb").MongoClient;

const app = express();
const port = 3001;

const connectionStringURI = `mongodb://127.0.0.1:27017/MoonliteDB/`;

let db;

mongodb.connect(
  connectionStringURI,
  { useNewUrlParser: true, useUnifiedTopology: true },
  (err, client) => {
    db = client.db();
    app.listen(port, () => {
      console.log(`App listening at http://localhost:${port}`);
    });


  app.use(express.json());

  app.get("/", async (req, res) => {

    try{
      const data = await db.collection("moonliteCollection").find().toArray();

      const jsonData = JSON.stringify(data);

      const fs = require("fs");
      const indexHtml = fs.readFileSync("index.html", "utf8")

      const modifiedHtml = indexHtml.replace(
        "<!-- REPLACE_WITH_JSON -->",
        `<script>

        var serverData = ${jsonData};

        document.getElementById("slide1").style.backgroundImage = "${serverData.movie1}"
        document.getElementById("slide2").style.backgroundImage = "${serverData.movie2}"
        document.getElementById("slide3").style.backgroundImage = "${serverData.movie3}"
        document.getElementById("slide4").style.backgroundImage = "${serverData.movie4}"

        document.getElementById("announceImg").style.backgroundImage = "${serverData.announceImg}"
        document.getElementById("announceHead").innerHTML = "${serverData.announceHead}"
        document.getElementById("announceText").innerHTML = "${serverData.ennounceText}"

        </script>`
      );

      res.send(modifiedHtml);
      } catch (err){
        console.error("Failed to retrieve data from MongoDB:", err);
        res.status(500).send("Internal Server Error")
      }
  });

  app.put("/homeUpdate/:movie1/:movie2/:movie3/:movie4/:announceImg/:announceHead/:announceText", (req, res) => {

    db.collection("moonliteCollection").updateOne(
      {_id: "6466805ef867914d5788ef99"},
      {
        $set: {
          movie1: req.params.movie1,
          movie2: req.params.movie2,
          movie3: req.params.movie3,
          movie4: req.params.movie4,
          announceImg: req.params.announceImg,
          announceHead: req.params.announceHead,
          announceText: req.params.announceText
        },
      },
      function(err, result) {
        if(err){
          console.error("Failed to update document:", err)
        } else {
          console.log("Document updated successfully");
        }

        client.close()
      }
    );
  });

});
