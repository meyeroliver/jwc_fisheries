// import {
//   dbCred
// } from "../credentials.mjs";
import mongodb from "mongodb";
import mongoose from 'mongoose';

// const uri =
//   "mongodb+srv://" +
//   dbCred.username +
//   ":" +
//   dbCred.password +
//   "@cluster0-2jjgt.gcp.mongodb.net/test?retryWrites=true&w=majority";

const uri =
  "mongodb+srv://" +
  process.env.DB_USER +
  ":" +
  process.env.DB_PASSWORD +
  "@cluster0-2jjgt.gcp.mongodb.net/test?retryWrites=true&w=majority";


mongoose.connect(uri, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useFindAndModify:  false
})

const conn = mongoose.connection;
conn.on('error', console.error.bind(console, 'connection error:'));
conn.once('open', function() {
  // we're connected!
  console.log("Connection To MongoDB Established");
});

export default conn;
//     const client = new mongodb.MongoClient(uri, {
//       useNewUrlParser: true,
//       useUnifiedTopology: true,
//     });

// export const dbConn = async function () {
//   try {
//     await client.connect();
//     if (client.isConnected()) {
//         console.log('awe')
//     } else {
//         console.log('nope');
//     }
// } catch (error) {
//     console.log(error);
//   } finally {
//       //client.close();
//   }
// };