export default function Dashboard() {
  let user = null;

  try {
    user = JSON.parse(localStorage.getItem("user"));
  } catch (error) {
    console.error("Failed to parse user from localStorage", error);
  }

  return (
    <div>
      <h1>Dashboard</h1>
      <p>Welcome {user?.name ?? "Guest"}</p>
      {!user && <p>Please log in to see your dashboard details.</p>}
    </div>
  );
}