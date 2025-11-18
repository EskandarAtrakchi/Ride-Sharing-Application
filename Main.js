// secure user registration 
const express = require("express");
// I will use bcrypt library for hashing
const bcrypt = require("bcrypt"); 
const app = express();

app.use(express.json());

// assuming we have a DB here that works 
async function createUserInDb(email, passwordHash) {
  // INSERT INTO users (email, password_hash) VALUES (?, ?)
  console.log("Saving user:", email, passwordHash);
}
// route using express library 
app.post("/register", async (req, res) => {
  const { email, password } = req.body;

  // Basic input validation this can also help preventing SQL injections
  if (!email || !password || password.length < 8) {
    return res.status(400).json({ error: "Invalid email or password" });
  }

  try {
    const saltRounds = 12; // Higher = more secure but slower
    // bcrypt automatically generates a random salt internally
    const passwordHash = await bcrypt.hash(password, saltRounds);

    // store only the hash in the database, never the raw password
    await createUserInDb(email, passwordHash);

    return res.status(201).json({ message: "User registered securely" });
  } catch (err) {
    console.error("Error registering user:", err);
    return res.status(500).json({ error: "Internal server error" });
  }
});

// app.listen(port 3000) //commented this cuz uneeded for now 
