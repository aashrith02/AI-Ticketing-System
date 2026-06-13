import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function TicketList({
  tickets = [],
  showQueueFilter = false,
}) {
  const navigate = useNavigate();

  const [selectedQueue, setSelectedQueue] = useState("");

  const queues = [
  ...new Map(
    tickets
        .filter((ticket) => ticket.queue)
        .map((ticket) => [ticket.queue.id, ticket.queue])
  ).values(),
];

  const filteredTickets = selectedQueue
  ? tickets.filter(
      (ticket) =>
        ticket.queueId?.toString() === selectedQueue
    )
  : tickets;

  return (
    <div style={styles.container}>
      <div style={styles.header}>
        <h2>Tickets</h2>

        {showQueueFilter && (
          <select
            value={selectedQueue}
            onChange={(e) =>
              setSelectedQueue(e.target.value)
            }
            style={styles.filter}
          >
            <option value="">All Queues</option>

            {queues.map((queue) => (
              <option key={queue.id} value={queue.id}>
                {queue.name}
              </option>
            ))}
          </select>
        )}
      </div>

      <table style={styles.table}>
        <thead>
          <tr>
            <th style={styles.th}>Id</th>
            <th style={styles.th}>Title</th>
            <th style={styles.th}>Queue</th>
            <th style={styles.th}>Priority</th>
            <th style={styles.th}>Status</th>
            <th style={styles.th}>Created</th>
          </tr>
        </thead>

        <tbody>
          {filteredTickets.length === 0 ? (
            <tr>
              <td
                colSpan="6"
                style={styles.emptyRow}
              >
                No tickets found
              </td>
            </tr>
          ) : (
            filteredTickets.map((ticket) => (
            <tr
              key={ticket.id}
              style={styles.row}
              onClick={() =>
                navigate(`/tickets/${ticket.id}`)
              }
            >
                <td style={styles.td}>
                  #{ticket.id}
                </td>

                <td style={styles.td}>
                {ticket.title}
              </td>

                <td style={styles.td}>
                {ticket.queue?.name || "-"}
              </td>

                <td style={styles.td}>
                  <span
                    style={{
                      ...styles.badge,
                      ...getPriorityStyle(
                        ticket.priority
                      ),
                    }}
                  >
                    {ticket.priority}
                  </span>
              </td>

                <td style={styles.td}>
                <span
                  style={{
                    ...styles.badge,
                    ...getStatusStyle(
                      ticket.status
                    ),
                  }}
                >
                  {ticket.status}
                </span>
              </td>

                <td style={styles.td}>
                  {new Date(
                    ticket.createdAt
                  ).toLocaleDateString()}
              </td>
            </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
}

function getPriorityStyle(priority) {
  switch (priority) {
    case "LOW":
      return { backgroundColor: "#d4edda" };

    case "MEDIUM":
      return { backgroundColor: "#fff3cd" };

    case "HIGH":
      return { backgroundColor: "#f8d7da" };

    case "CRITICAL":
      return {
        backgroundColor: "#dc3545",
        color: "white",
      };

    default:
      return {};
  }
}

function getStatusStyle(status) {
  switch (status) {
    case "OPEN":
      return { backgroundColor: "#cce5ff" };

    case "IN_PROGRESS":
      return { backgroundColor: "#fff3cd" };

    case "RESOLVED":
      return { backgroundColor: "#d4edda" };

    case "CLOSED":
      return {
        backgroundColor: "#6c757d",
        color: "white",
      };

    default:
      return {};
  }
}

const styles = {
  container: {
    marginTop: "20px",
  },

  header: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: "15px",
  },

  filter: {
    padding: "8px",
    borderRadius: "8px",
    border: "1px solid #ccc",
  },

  table: {
    width: "100%",
    borderCollapse: "collapse",
    backgroundColor: "#fff",
    borderRadius: "12px",
    overflow: "hidden",
    boxShadow: "0 2px 8px rgba(0,0,0,0.08)",
  },

  th: {
    textAlign: "left",
    padding: "12px",
    backgroundColor: "#f8f9fa",
    borderBottom: "1px solid #ddd",
  },

  td: {
    padding: "12px",
    borderBottom: "1px solid #eee",
  },

  row: {
    cursor: "pointer",
  },

  badge: {
    padding: "4px 10px",
    borderRadius: "20px",
    fontSize: "12px",
    fontWeight: "bold",
  },

  emptyRow: {
    textAlign: "center",
    padding: "20px",
  },
};