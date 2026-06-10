import { useNavigate } from "react-router-dom";

export default function TicketList({ tickets = [] }) {
  const navigate = useNavigate();

  if (tickets.length === 0) {
    return (
      <div style={styles.emptyState}>
        No tickets found
      </div>
    );
  }

  return (
    <div style={styles.container}>
      <table style={styles.table}>
        <thead>
          <tr>
            <th style={styles.header}>Title</th>
            <th style={styles.header}>Queue</th>
            <th style={styles.header}>Owner</th>
            <th style={styles.header}>Status</th>
            <th style={styles.header}>Priority</th>
          </tr>
        </thead>

        <tbody>
          {tickets.map((ticket) => (
            <tr
              key={ticket.id}
              style={styles.row}
              onClick={() =>
                navigate(`/tickets/${ticket.id}`)
              }
            >
              <td style={styles.cell}>
                {ticket.title}
              </td>

              <td style={styles.cell}>
                {ticket.queue?.name || "-"}
              </td>

              <td style={styles.cell}>
                {ticket.assignedTo?.name ||
                  "Unassigned"}
              </td>

              <td style={styles.cell}>
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

              <td style={styles.cell}>
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
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

function getStatusStyle(status) {
  switch (status) {
    case "OPEN":
      return {
        backgroundColor: "#fff3cd",
      };

    case "IN_PROGRESS":
      return {
        backgroundColor: "#cfe2ff",
      };

    case "RESOLVED":
      return {
        backgroundColor: "#d1e7dd",
      };

    case "CLOSED":
      return {
        backgroundColor: "#e2e3e5",
      };

    default:
      return {};
  }
}

function getPriorityStyle(priority) {
  switch (priority) {
    case "LOW":
      return {
        backgroundColor: "#d1e7dd",
      };

    case "MEDIUM":
      return {
        backgroundColor: "#fff3cd",
      };

    case "HIGH":
      return {
        backgroundColor: "#ffe5b4",
      };

    case "CRITICAL":
      return {
        backgroundColor: "#f8d7da",
      };

    default:
      return {};
  }
}

const styles = {
  container: {
    marginTop: "20px",
    overflowX: "auto",
  },

  table: {
    width: "100%",
    borderCollapse: "collapse",
    backgroundColor: "#fff",
    borderRadius: "12px",
    overflow: "hidden",
    boxShadow:
      "0 2px 8px rgba(0,0,0,0.08)",
  },

  header: {
    textAlign: "left",
    padding: "14px",
    backgroundColor: "#f7f7f7",
    borderBottom: "1px solid #ddd",
    fontWeight: "600",
  },

  row: {
    cursor: "pointer",
    borderBottom: "1px solid #eee",
  },

  cell: {
    padding: "14px",
  },

  badge: {
    padding: "6px 10px",
    borderRadius: "999px",
    fontSize: "12px",
    fontWeight: "600",
  },

  emptyState: {
    padding: "30px",
    textAlign: "center",
    border: "1px dashed #ccc",
    borderRadius: "12px",
    color: "#666",
  },
};