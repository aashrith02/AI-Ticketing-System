import { useState } from "react";
import { useEffect } from "react";
import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import TicketList from "../../components/ticket-List";

export default function AdminDashboard() {
  const navigate = useNavigate();
  console.log("Dashboard rendered");
  const token = localStorage.getItem("token");

  console.log(token);

  const [tickets, setTickets] = useState([]);

  const user = JSON.parse(
    localStorage.getItem("user") || "null"
  );

  useEffect(() => {
    fetchTickets();
  }, []);

  const fetchTickets = async () => {
    try {
      console.log('Admin Dashboard')
      const token = localStorage.getItem("token");
      const user = JSON.parse(localStorage.getItem("user"));

      const queueIds = await fetch(
        `http://localhost:8000/api/queues/getQueuesForUser/${user.id}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      )
        .then((res) => res.json())
        .then((data) => {
          const queues = Array.isArray(data) ? data : data?.queues ?? [];
          return queues.map((queue) => queue.queueId);
        })
        .catch((error) => {
          console.error("Error fetching queues for user:", error);
          return [];
        });
      console.log("queueids:", queueIds);

      if (!queueIds.length) {
        setTickets([]);
        return;
      }

      const queueIdsParam = queueIds.join(",");

      const response = await fetch(
        `http://localhost:8000/api/tickets/unassignedTicketsInQueue/${queueIdsParam}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      const data = await response.json();

      if (!response.ok) {
        alert(data.message);
        return;
      }
      console.log(data);
      setTickets(data);
    } catch (error) {
      console.error(error);
    }
  };

  const openTickets = tickets.filter(
    (ticket) => ticket.status === "OPEN"
  ).length;

  const resolvedTickets = tickets.filter(
    (ticket) => ticket.status === "RESOLVED"
  ).length;

  return (
    <div style={styles.container}>
      <h1>
        Welcome, {user?.name}
      </h1>

      <div style={styles.statsContainer}>
        <div style={styles.card}>
          <h2>{openTickets}</h2>
          <p>Un Assigned Tickets</p>
        </div>

        <div style={styles.card}>
          <h2>{resolvedTickets}</h2>
          <p>Resolved Tickets</p>
        </div>
      </div>

      <button
        style={styles.button}
        onClick={() =>
          navigate("/tickets/create-ticket")
        }
      >
        + Create Ticket
      </button>

      <h2 style={{ marginTop: "30px" }}>
        My Tickets
      </h2>

      <TicketList tickets={tickets} showQueueFilter = {true} />
    </div>
  );
}

const styles = {
  container: {
    maxWidth: "1200px",
    margin: "40px auto",
    padding: "20px",
  },

  statsContainer: {
    display: "flex",
    gap: "20px",
    marginTop: "20px",
  },

  card: {
    flex: 1,
    padding: "20px",
    borderRadius: "12px",
    backgroundColor: "#fff",
    boxShadow: "0 2px 8px rgba(0,0,0,0.08)",
    textAlign: "center",
  },

  button: {
    marginTop: "20px",
    padding: "12px 20px",
    border: "none",
    borderRadius: "8px",
    cursor: "pointer",
    fontSize: "16px",
  },
};