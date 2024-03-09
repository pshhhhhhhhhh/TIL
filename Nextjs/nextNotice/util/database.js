import { MongoClient } from 'mongodb' //서버띄울때 한번만 쓰는게 좋음 .connect를 자주 쓰면 안좋기때문
const url = 'mongodb+srv://몽고id:비번@cluster0.10oebof.mongodb.net/?retryWrites=true&w=majority'
const options = { useNewUrlParser: true }
let connectDB

if (process.env.NODE_ENV === 'development') {
  if (!global._mongo) {
    global._mongo = new MongoClient(url, options).connect()
  }
  connectDB = global._mongo
} else {
  connectDB = new MongoClient(url, options).connect()
}
export { connectDB }