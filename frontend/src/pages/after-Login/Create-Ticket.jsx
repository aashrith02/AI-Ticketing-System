import { useState } from "react";
import { useEffect } from "react";

export default function CreateTicket() {
  let user = null;

  try {
    user = JSON.parse(localStorage.getItem("user"));
  } catch (error) {
    console.error("Failed to parse user from localStorage", error);
  }

  const [formData, setFormData] = useState({
    title: "",
    description: "",
    priority: "MEDIUM",
    queueId: "",
  });

  const [queues, setQueues] = useState([]);

  useEffect(() => {
  fetchQueues();
}, []);

const fetchQueues = async () => {
  try {
    const response = await fetch(
      "http://localhost:8000/api/queues/getAllQueues"
    );

    const data = await response.json();
    console.log("Fetched queues:", data);

    setQueues(data);
  } catch (error) {
    console.error(error);
  }
};

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    console.log({
      ...formData,
      userId: user?.id,
    });
    

    const requestBody = {
      title: formData.title,
      description: formData.description,
      priority: formData.priority,
      queueId: parseInt(formData.queueId, 10),
      userId: user?.id,
    };

    const response = await fetch("http://localhost:8000/api/tickets/createTicket", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(requestBody),
    });

    const data = await response.json();

    if (!response.ok) {
      console.error("Failed to create ticket", data);
        alert(data.message || "Failed to create ticket");
      return;
    }
    alert("Ticket created successfully!");
  };

  return (
    <div style={styles.container}>
      <form style={styles.form} onSubmit={handleSubmit}>
        <h2>Create Ticket</h2>

        <div style={styles.userInfo}>
          Logged in as: <strong>{user?.name}</strong>
        </div>

        <input
          type="text"
          name="title"
          placeholder="Ticket Title"
          value={formData.title}
          onChange={handleChange}
          style={styles.input}
          required
        />

        <textarea
          name="description"
          placeholder="Describe the issue..."
          value={formData.description}
          onChange={handleChange}
          style={styles.textarea}
          required
        />

        <select
          name="priority"
          value={formData.priority}
          onChange={handleChange}
          style={styles.input}
        >
          <option value="LOW">Low</option>
          <option value="MEDIUM">Medium</option>
          <option value="HIGH">High</option>
          <option value="CRITICAL">Critical</option>
        </select>

        <select
        name="queueId"
        value={formData.queueId}
        onChange={handleChange}
        style={styles.input}
        >
        <option value="">
            Select Queue
        </option>

        {queues.map((queue) => (
            <option
            key={queue.id}
            value={queue.id}
            >
            {queue.name}
            </option>
        ))}
        </select>

        <button type="submit" style={styles.button}>
          Create Ticket
        </button>
      </form>
    </div>
  );
}

const styles = {
  container: {
    display: "flex",
    justifyContent: "center",
    marginTop: "40px",
  },

  form: {
    width: "600px",
    display: "flex",
    flexDirection: "column",
    gap: "15px",
    padding: "25px",
    border: "1px solid #ddd",
    borderRadius: "12px",
    boxShadow: "0 2px 8px rgba(0,0,0,0.08)",
    backgroundColor: "#fff",
  },

  userInfo: {
    backgroundColor: "#f5f5f5",
    padding: "10px",
    borderRadius: "8px",
  },

  input: {
    padding: "12px",
    fontSize: "16px",
    borderRadius: "8px",
    border: "1px solid #ccc",
  },

  textarea: {
    minHeight: "120px",
    padding: "12px",
    fontSize: "16px",
    borderRadius: "8px",
    border: "1px solid #ccc",
    resize: "vertical",
  },

  button: {
    padding: "12px",
    fontSize: "16px",
    border: "none",
    borderRadius: "8px",
    cursor: "pointer",
  },
};