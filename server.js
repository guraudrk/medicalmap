// server.js (or any other file where you set up your server)
//프록시 서버를 이용해 몽고디비에서 데이터를 받아오는 부분이다.
const express = require('express');
const cors  = require('cors');
const { MongoClient } = require('mongodb');
const app = express();
const server = require('http').createServer(app);
const port = 5000;
//데이터를 따로 담을 배열.

let Data=[];
// MongoDB connection string
const mongoURI = 'mongodb+srv://lee1066515:dudtlr2378@medicalmap.xb5jjlm.mongodb.net/';

// Create a MongoDB client
const client = new MongoClient(mongoURI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

// Connect to MongoDB
client.connect();



//cors 사용

app.use(cors());
app.get('/api', async (req,res) => {
  try {
    const db = client.db('medicalmap'); // Get the database instance
    const collection1 = db.collection('1');
    const collection2 = db.collection('2');
    const collection3 = db.collection('3');
    const collection4 = db.collection('4');
    const collection5 = db.collection('5');
    const collection6 = db.collection('6');
    const collection7 = db.collection('7');
    const collection8 = db.collection('8');
    const collection9 = db.collection('9');
    const collection10 = db.collection('10');
    const collection11 = db.collection('11');
    const collection12 = db.collection('12');
    const collection13 = db.collection('13');
    const collection14 = db.collection('14');
    const collection15 = db.collection('15');
    const collection16 = db.collection('16');


    const data1Promise = collection1.find({}).toArray();
    const data2Promise = collection2.find({}).toArray();
    const data3Promise = collection3.find({}).toArray();
    const data4Promise = collection4.find({}).toArray();
    const data5Promise = collection5.find({}).toArray();
    const data6Promise = collection6.find({}).toArray();
    const data7Promise = collection7.find({}).toArray();
    const data8Promise = collection8.find({}).toArray();
    const data9Promise = collection9.find({}).toArray();
    const data10Promise = collection10.find({}).toArray();
    const data11Promise = collection11.find({}).toArray();
    const data12Promise = collection12.find({}).toArray();
    const data13Promise = collection13.find({}).toArray();
    const data14Promise = collection14.find({}).toArray();
    const data15Promise = collection15.find({}).toArray();
    const data16Promise = collection16.find({}).toArray();//이 data라는 변수에 모든 데이터가 담겨 있다.
//16개의 컬랙션에 나눠놨던 데이터가 한번에 로딩이 되도록 한다.
const [data1,data2,data3,data4,data5,data6,data7,data8,data9,data10,data11,data12,data13,data14,data15,data16] = await Promise.all([data1Promise, data2Promise,data3Promise,data4Promise,
  data5Promise,data6Promise,data7Promise,data8Promise,data9Promise,data10Promise,
  data11Promise,data12Promise,data13Promise,data14Promise,data15Promise,data16Promise]);

  const responseData = {
    collection1: data1,
    collection2: data2,
    collection3: data3,
    collection4: data4,
    collection5: data5,
    collection6: data6,
    collection7: data7,
    collection8: data8,
    collection9: data9,
    collection10: data10,
    collection11: data11,
    collection12: data12,
    collection13: data13,
    collection14: data14,
    collection15: data15,
    collection16: data16,

  };

  res.json(responseData);
    } catch (error) {
    console.error(error);
    res.status(500).send({ message: 'Server Error' });
  }
 
});


// Start the server
app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});

module.exports = Data;