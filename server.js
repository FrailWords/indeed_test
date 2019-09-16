const express = require('express');
const path = require('path');
const app = express();
const port = process.env.PORT || 5000;

//Static file declaration
app.use(express.static(path.join(__dirname, 'exam_app/build')));


//production mode
if(process.env.NODE_ENV === 'production') {
  app.use(express.static(path.join(__dirname, 'exam_app/build')));
  app.get('*', (req, res) => { res.sendfile(path.join(__dirname = 'exam_app/build/index.html'));  })
} else {
  //dev mode
  app.get('*', (req, res) => {  res.sendFile(path.join(__dirname+'/exam_app/public/index.html'));})
}


//Start server
app.listen(port, (req, res) => {
  console.log(`server listening on port: ${port}`)
});
