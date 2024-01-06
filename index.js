const { format } = require("date-fns");
const fs = require("fs");
const fsPromises = require("fs").promises;
const path = require("path");
const express = require("express");
const app = express();
const cors = require("cors");

app.use(cors());
app.use(express.json());

const currentDateStamp = `Date-${format(
  new Date(),
  "dd-MMM-yyyy"
)}\t Time-${format(new Date(), "HH:mm:ss")}`;


let textFileInFolder = [];


const logEvents = async (currentDateStamp) => {
  const dateTime = `${format(new Date(), "dd-MMM-yyyy")}_time_${format(
    new Date(),
    "HH-mm-ss"
  )}`;
  try {
    if (!fs.existsSync(path.join(__dirname, "logs"))) {
      await fsPromises.mkdir(path.join(__dirname, "logs"));
    }
    await fsPromises.writeFile(
      path.join(__dirname, "logs", `${dateTime}.txt`),
      currentDateStamp
    );
    fs.readdir(path.join(__dirname, "logs"), (err, files) => {
      if (err) {
        console.error(err);
      }
      files.forEach((file) => {
        if (path.extname(file, path.basename(file)) == ".txt") {
          textFileInFolder.push(file);
        }
      });
    });
  } catch (error) {
    console.error(error);
  }
};


logEvents(currentDateStamp);


app.get("/", function (req, res) {
  res.send(textFileInFolder);
});


app.listen(3000);
