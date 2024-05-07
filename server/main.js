

const express = require('express');
const { sendMail } = require("./helper/sendMAil");
const User = require("./Models/User");
const app = express();
const cors = require("cors");
const bodyParser = require('body-parser');

require("./db/connection");

app.use(cors());
app.use(bodyParser.json());

const port = process.env.PORT || 3000;

app.post('/', async (req, res) => {
  try {
    const { email, name ,password} = req.body;
    
    // Validate email and name here if needed
    
    const user = new User({ email, name,password });
    const result = await user.save();
    
    await sendMail(email, "Welcome To My First Mern Stack Project", `Hi ${name}, Thanks for Registration...... May you get succeed in your Life....Best Wishes For YourUpcoming Future`);
    
    res.send(result);
  } catch (err) {
    console.error(err);
    res.status(500).send("Internal Server Error");
  }
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});

