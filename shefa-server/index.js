const express = require("express");
const app = express();
const port = 3000;
const cors = require("cors");
const { MongoClient, ServerApiVersion } = require("mongodb");

app.use(cors({
  origin: [
    "http://localhost:5174",
    "https://your-frontend-domain.vercel.app"
  ]
}));app.use(express.json());
const { ObjectId } = require("mongodb");

const uri =
  "mongodb+srv://shefa:kvdYWGLXEnJKpL3S@cluster0.1ktlt9d.mongodb.net/?appName=Cluster0";
const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  },
});

async function run() {
  try {
  // await client.connect();
    const db = client.db("shefa");
    const usersCollection = db.collection("users");
    const doctorsCollection = db.collection("doctors");



    // POST user
    app.post("/users", async (req, res) => {
      try {
        const user = req.body;

        const existingUser = await usersCollection.findOne({
          email: user.email,
        });
        if (existingUser) {
          return res.send({ message: "User already exists", inserted: false });
        }

        user.role = user.role || "patient"; // default role
        const result = await usersCollection.insertOne(user);
        res.send({ inserted: true, result });
      } catch (error) {
        console.log(error);
        res.status(500).send({ error: "Failed to create user" });
      }
    });

    //user serch by email
   app.get("/users/:email", async (req, res) => {
  const email = req.params.email;
  const user = await usersCollection.findOne({ email });

  if (!user) {
    return res.status(404).send({ message: "User not found" });
  }

  res.send(user);
});
    // GET doctors
app.get("/doctors", async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 8;

    const skip = (page - 1) * limit;

    const total = await doctorsCollection.countDocuments();

    const doctors = await doctorsCollection
      .find()
      .skip(skip)      // 🔥 IMPORTANT
      .limit(limit)    // 🔥 IMPORTANT
      .toArray();

    res.send({
      doctors,
      total,
      totalPages: Math.ceil(total / limit),
      page,
    });
  } catch (err) {
    res.status(500).send({ error: "Failed to fetch doctors" });
  }
});
    //single doctor details
app.get("/api/doctors/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const doctor = await doctorsCollection.findOne({ _id: new ObjectId(id) });
    if (!doctor) return res.status(404).json({ message: "Doctor not found" });
    res.json(doctor);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
});

    // POST doctor (optional: to seed data)
    app.post("/doctors", async (req, res) => {
      try {
        const doctor = req.body;
        const result = await doctorsCollection.insertOne(doctor);
        res.json({ inserted: true, result });
      } catch (err) {
        console.error(err);
        res.status(500).json({ error: "Failed to add doctor" });
      }
    });

    // await client.db("admin").command({ ping: 1 });
    console.log("Connected to MongoDB!");
  } finally {
    // client.close() // don't close connection
  }
}

run().catch(console.dir);

app.get("/", (req, res) => {
  res.send("Server is running!");
});

app.listen(port, () => {
  console.log(`Server is listening on port ${port}`);
});
