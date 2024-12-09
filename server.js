const mongoose = require ('mongoose');
const app = require('./app');
process.on('uncaughtException', err => {
  console.log('UNCAUGHT EXCEPTION! 💥 Shutting down...');
  console.log(err.name, err.message);
  process.exit(1);
});
const dotenv = require('dotenv');
dotenv.config({ path: './config.env' });
const { Console } = require('console');


// console.log(process.env);
const DB = process.env.DATABASE.replace( '<PASSWORD>',process.env.DATABASE_PASSWORD);
mongoose
  .connect(DB, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then((con) => 
    //console.log(con.connections),
    console.log('DB connection successful'))
  //.catch(err=>{console.log("Error 🙄🙄")})
 


const port = process.env.PORT || 3000;
const server=app.listen(port, () => {
  console.log(`App running on port ${port}...`);
});
//Asynchronous or mongoose wrong password or any prommise rejection
process.on('unhandledRejection', err => {
  console.log('UNHANDLED REJECTION! 💥 Shutting down...');
  console.log(err.name, err.message);
  server.close(() => {
    process.exit(1);
  });
});
//console.log(x);-------------uncaughtException error which is defined up