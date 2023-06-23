const express = require("express");
const mongoose = require("mongoose");
// const { ObjectId } = mongoose.Types;
const app = express();

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

const _dirname = path.dirname("");
const buildPath = path.join(_dirname, "/public");
app.use(express.static(buildPath));

// Connect to MongoDB using Mongoose
mongoose.connect(process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017/MoonliteDB/', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const db = mongoose.connection;

db.on("error", (err) => {
  console.error("Failed to connect to MongoDB:", err);
});

db.once("open", () => {
  console.log("Connected to MongoDB!");

  app.get("/", async (req, res) => {
    try {
      const Moonlite = mongoose.model("moonliteCollection");

      const data = await Moonlite.find().exec();
      console.log(data)
      const jsonData = JSON.stringify(data);

      const fs = require("fs");
      const indexHtml = fs.readFileSync("index.html", "utf8");

      const modifiedHtml = indexHtml.replace(
        "<!-- REPLACE_WITH_JSON -->",
        `<script>
          var serverData = ${jsonData};
          document.getElementById("slide1").style.backgroundImage = ${jsonData.movie1};
          document.getElementById("slide2").style.backgroundImage = ${jsonData.movie2};
          document.getElementById("slide3").style.backgroundImage = ${jsonData.movie3};
          document.getElementById("slide4").style.backgroundImage = ${jsonData.movie4};
          document.getElementById("announceImg").style.backgroundImage = ${jsonData.announceImg};
          document.getElementById("announceHead").innerHTML = ${jsonData.announceHead};
          document.getElementById("announceText").innerHTML = ${jsonData.announceText};
        </script>`
      );

      res.send(modifiedHtml);
    } catch (err) {
      console.error("Failed to retrieve data from MongoDB:", err);
      res.status(500).send("Internal Server Error");
    }
  });

  app.get("/all-data", async (req, res) => {
    try {
      const Moonlite = mongoose.model("moonliteCollection");
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

  app.put(
    "/homeUpdate/:movie1/:movie2/:movie3/:movie4/:announceImg/:announceHead/:announceText",
    async (req, res) => {
      try {
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
  
        console.log(filter)
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
});

