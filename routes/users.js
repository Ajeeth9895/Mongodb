var express = require("express");
var router = express.Router();
const { mongodb, dbName, dbUrl, MongoClient } = require("../confiq/dbConfig");

let users = [
  {
    name: "ajeeth",
    email: "ajeeth@gmail.com",
    batch: "B38WET",
  },
  {
    name: "vishnu",
    email: "vishnu@gmail.com",
    batch: "B40WET",
  },
  {
    name: "kumar",
    email: "kumar@gmail.com",
    batch: "B38WET",
  },
];

router.get("/", async (req, res) => {
  const client = new MongoClient(dbUrl);
  client.connect();
  try {
    let db = await client.db(dbName);
    let user = await db.collection("users").find().sort({name:1}).toArray();
    res.send({
      message: "Data received successfully",
      user,
    });
  } catch (error) {
    console.log(error);
    res.send({
      message: "Internal server Error",
      error,
    });
  } finally {
    client.close();
  }
});

router.post("/", async (req, res) => {
  const client = new MongoClient(dbUrl);
  client.connect();
  try {
    let db = await client.db(dbName);
    let user = await db.collection("users").findOne({email:req.body.email})
    if(!user){
      let user = await db.collection("users").insertOne(req.body);
      res.send({
        message: "Data Added successfully",
        user,
      });
    }else{
      res.status(400).send({
        message:"Email id already exist"
      })
    }
    
  } catch (error) {
    console.log(error);
    res.send({
      message: "Internal server Error",
      error,
    });
  } finally {
    client.close();
  }
});

router.get("/:id", async (req, res) => {
  const client = new MongoClient(dbUrl);
  client.connect();
  try {
    let db = await client.db(dbName);
    let user = await db
      .collection("users")
      .findOne({ _id: new mongodb.ObjectId(req.params.id) });
    res.send({
      user,
    });
  } catch (error) {
    console.log(error);
    res.send({
      message: "Internal server Error",
      error,
    });
  } finally {
    client.close();
  }
});

router.put("/:id", async (req, res) => {
  const client = new MongoClient(dbUrl);
  client.connect();
  try {
    let db = await client.db(dbName);
    let user = await db
      .collection("users")
      .updateOne(
        { _id: new mongodb.ObjectId(req.params.id)},
        { $set: req.body }
      );
    res.status(201).send({
      message: "User updated successfully",
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      message: "Internal server error",
      error,
    });
  } finally {
    client.close();
  }
});

router.delete("/:id", async (req, res) => {
  const client = new MongoClient(dbUrl);
  client.connect();
  try {
    let db = await client.db(dbName);
    let user = await db
      .collection("users")
      .deleteOne({ _id: new mongodb.ObjectId(req.params.id) });
    res.status(200).send({
      message: "User deleted successfully",
    });

  } catch (error) {
    console.log(error);
    res.status(500).send({
      message: "Internal server error",
      error,
    })

  } finally {
    client.close();
  }
});

module.exports = router;
