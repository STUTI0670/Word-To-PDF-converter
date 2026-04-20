//importing packages
const express = require("express");
//creates backend server
const multer = require("multer");
//handles file uploads
const cors = require("cors");
//allows html talk to backend ? ->another framework
const libre = require("libreoffice-convert");
//convert using libreoffice
const fs = require("fs");
//file system read/write files
const app = express();
//creating backend app
app.use(cors());
//cors upar bnaya tha uska communication enable krne ke liye
app.get("/", (req, res) => {
  res.send("OK WORKING");
});
const upload = multer({ dest: "uploads/" });
//user upload krega to uploads ke folder mai save hojayega with random name

// api route -> MAIN LOGIC
app.post("/convert", upload.single("file"), async (req, res) => {
  /**Someone sends request to /convert , A file comes with it  multer grabs that file*/
   //upload.single("file") means: 👉 “I am expecting ONE file named file”
   console.log("Request received");
   const filePath = req.file.path;//👉 After upload, file is saved like uploads/abc123👉 You just grab that location
  const outputPath = filePath + ".pdf";
  //output name will be same as input but with .pdf extension
//reads file
  const file = fs.readFileSync(filePath);
//takes in read file converts to pdf Sends it to LibreOffice (installed software)LibreOffice converts it to PDF ye niche ka pura part ka kaam h aur uska final done mai dega 
  libre.convert(file, ".pdf", undefined, (err, done) => {
    if (err) {//error handling
      return res.status(500).send("Conversion error");
    }
//write converted file to output path 
    fs.writeFileSync(outputPath, done);
    //send converted file back to user
    res.download(outputPath, "converted.pdf");
  });
});
//start server on port and logs on console
app.listen(5000, () => console.log("Server running on port 5000"));
