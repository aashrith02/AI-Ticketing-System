export default function CreateTicket() {
    let user = null;
try {
    user = JSON.parse(localStorage.getItem("user"));
    console.log("User from localStorage:", user);
  } catch (error) {
    console.error("Failed to parse user from localStorage", error);
  }

  return(<div>
    <h2>Create Ticket</h2>
    <form>
      <input type="text" placeholder="Title" />
      <textarea placeholder="Description" />
      <select>
        <option value="open">Open</option>
        <option value="in-progress">In Progress</option>
        <option value="closed">Closed</option>
      </select>
      <select>
        <option value="low">Low</option>
        <option value="medium">Medium</option>
        <option value="high">High</option>
      </select>
      <input type="text" placeholder="Assigned To" />
      <button type="submit">Create Ticket</button>
    </form>
  </div>)




}
