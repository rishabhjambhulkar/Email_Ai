// Import required modules using ES6 syntax
import express from 'express';
import cors from 'cors';
// import dotenv from 'dotenv';

import bodyParser from "body-parser";
import Groq from "groq-sdk";
import dotenv from 'dotenv';
import nodemailer from 'nodemailer';
// Load environment variables from .env file
dotenv.config();



const app = express();
const PORT =  4000;

// Middleware
app.use(express.json()); // Parse JSON request bodies
app.use(cors()); // Enable CORS for all routes




const groq = new Groq({ apiKey: process.env.GROQ_API_KEY }); // Add your API key here

// Middleware
app.use(cors());
app.use(bodyParser.json());


app.use(cors({
  origin: 'http://localhost:3000', // Replace with your React frontend's URL
  methods: ['GET', 'POST', 'PUT', 'DELETE'], // Specify allowed HTTP methods
  credentials: true // Allow cookies if needed
}));

app.use('/', (req, res) => res.json({ message: 'server running emailAi' }));

// Route to fetch response from Groq
app.post("/api/groq-response", async (req, res) => {
  console.log(req.body)
  const { prompt } = req.body;

  if (!prompt) {
    return res.status(400).json({ error: "Prompt is required." });
  }

  try {
    const response = await groq.chat.completions.create({
      messages: [
        {
          role: "user",
          content: prompt,
        },
      ],
      model: "llama-3.3-70b-versatile", // Adjust the model as needed
    });
console.log(response);
    const generatedText = response.choices[0]?.message?.content || "No response generated.";
    res.json({ response: generatedText });
  } catch (error) {
    console.error("Error fetching Groq response:", error);
    res.status(500).json({ error: "Failed to fetch response from Groq." });
  }
});



// Nodemailer setup
const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: "jambhulkarrishabh@gmail.com", // Your Gmail address
    pass: "trntugzkvijulsac", // Your Gmail password (or use an app password)
  },
});

// Endpoint to send email with OTP
app.post('/api/send-notification', async (req, res) => {
  const { recipient, subject, body } = req.body; // Extract recipient, subject, and body from request body
  const otp = Math.floor(100000 + Math.random() * 900000);

  try {
    const mailOptions = {
      from: "jambhulkarrishabh@gmail.com", // Your Gmail address
      to: recipient,
      subject: subject,
      html: `
      <div style="font-family: Arial, sans-serif; color: #333; padding: 20px;">
        
        <p>${body}</p>
        <hr style="border: none; border-top: 1px solid #ddd;">
        <footer style="font-size: 12px; text-align: center;">
          <p>Rishabh Jambhulkar</p>
          <p>Email: <a href="mailto:jambhulkarrishabh@gmail.com">jambhulkarrishabh@gmail.com</a></p>
          <p>All Rights Reserved 2025</p>
        </footer>
      </div>
    `,
    };

    await transporter.sendMail(mailOptions);

    // Here, you could save the OTP token to your database or perform other actions
    res.status(200).json({ message: "Email sent successfully"});
    console.log("Email sent successfully")

  } catch (error) {
    console.error("Error sending email:", error);
    res.status(500).send("Failed to send email. Please try again.");
  }
});




// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
