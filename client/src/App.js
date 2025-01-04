import React, { useState } from "react";
import emailjs from "emailjs-com";
import axios from 'axios';

const App = () => {
  const [recipient, setRecipient] = useState("");
  const [subject, setSubject] = useState("Fast Language Models");
  const [prompt, setPrompt] = useState("");
  const [body, setBody] = useState("");
  const [isGenerating, setIsGenerating] = useState(false);

  const generateResponse = async () => {
    if (!prompt.trim()) {
      alert("Please enter a prompt.");
      return;
    }
  
    setIsGenerating(true);
  
    try {
      // API call using Axios
      const response = await axios.post("http://localhost:4000/api/groq-response", {
        prompt, // Sending the prompt as the request body
      });
  
      // Extracting response data
      setBody(response.data.response || "Generated response will appear here.");
    } catch (error) {
      console.error("Error generating response:", error);
      alert("Failed to generate response. Please try again.");
    } finally {
      setIsGenerating(false);
    }
  };

console.log(recipient,body,subject)


const sendEmail = async (e) => {
  e.preventDefault();

  if (!recipient || !body) {
    alert("Please fill in all fields.");
    return;
  }

  const templateParams = {
    recipient,
    subject,
    body,
  };

  try {
    const response = await fetch("http://localhost:4000/api/send-notification", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(templateParams),
    });

    const data = await response.json();

    if (response.ok) {
      alert(data.message || "Notification sent successfully!");
    } else {
      alert(data.error || "Failed to send email. Please try again.");
    }
  } catch (error) {
    console.error("Error sending notification:", error);
    alert("Failed to send email. Please try again.");
  }
};



  return (
    <div className="App" style={{ padding: "2rem", maxWidth: "600px", margin: "auto" }}>
      <h1>Email Sender</h1>
      <form onSubmit={sendEmail}>
        <div style={{ marginBottom: "1rem" }}>
          <label htmlFor="email">Recipient Email:</label>
          <input
            id="email"
            type="email"
            value={recipient}
            onChange={(e) => setRecipient(e.target.value)}
            required
            style={{ width: "100%", padding: "0.5rem", marginTop: "0.5rem" }}
          />
        </div>
        <div style={{ marginBottom: "1rem" }}>
          <label htmlFor="subject">Subject:</label>
          <input
            id="subject"
            type="text"
            value={subject}
            onChange={(e) => setSubject(e.target.value)}
            required
            style={{ width: "100%", padding: "0.5rem", marginTop: "0.5rem" }}
          />
        </div>
        <div style={{ marginBottom: "1rem" }}>
          <label htmlFor="prompt">Prompt:</label>
          <input
            id="prompt"
            type="text"
            value={prompt}
            onChange={(e) => setPrompt(e.target.value)}
            placeholder="Enter your prompt here..."
            style={{ width: "100%", padding: "0.5rem", marginTop: "0.5rem" }}
          />
          <button
            type="button"
            onClick={generateResponse}
            disabled={isGenerating}
            style={{
              marginTop: "1rem",
              padding: "0.5rem 1rem",
              backgroundColor: "#28a745",
              color: "#fff",
              border: "none",
              borderRadius: "4px",
              cursor: isGenerating ? "not-allowed" : "pointer",
            }}
          >
            {isGenerating ? "Generating..." : "Generate Response"}
          </button>
        </div>
        <div style={{ marginBottom: "1rem" }}>
          <label htmlFor="body">Body:</label>
          <textarea
            id="body"
            value={body}
            onChange={(e) => setBody(e.target.value)}
            placeholder="Generated response will appear here..."
            rows={10}
            style={{ width: "100%", padding: "0.5rem", marginTop: "0.5rem" }}
          />
        </div>
        <button
          type="submit"
          style={{
            padding: "0.5rem 1rem",
            backgroundColor: "#007BFF",
            color: "#fff",
            border: "none",
            borderRadius: "4px",
          }}
        >
          Send Email
        </button>
      </form>
    </div>
  );
};

export default App;
