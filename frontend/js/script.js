const leadList = document.getElementById("leadList");
const API_URL = "http://localhost:5000/api/leads";

// Load leads when page loads
window.onload = fetchLeads;

async function fetchLeads() {
  const res = await fetch(API_URL);
  const leads = await res.json();
  displayLeads(leads);
}

async function addLead() {
  const name = document.getElementById("name").value;
  const email = document.getElementById("email").value;
  const status = document.getElementById("status").value;
  const notes = document.getElementById("notes").value;

  if (!name || !email) {
    alert("Please enter name and email");
    return;
  }

  await fetch(API_URL, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ name, email, status, notes })
  });

  document.getElementById("name").value = "";
  document.getElementById("email").value = "";
  document.getElementById("notes").value = "";

  fetchLeads(); // refresh list
}

function displayLeads(leads) {
  leadList.innerHTML = "";

  leads.forEach(lead => {
    const card = document.createElement("div");
    card.className = "lead-card";

    card.innerHTML = `
      <h3>👤 ${lead.name}</h3>
      <p>📧 ${lead.email}</p>
      <p class="status ${lead.status.toLowerCase()}">🔄 ${lead.status}</p>
      <p class="notes">📝 ${lead.notes || "No notes"}</p>
      <button class="delete-btn" onclick="deleteLead('${lead._id}')">🗑</button>
    `;

    leadList.appendChild(card);
  });
}

async function deleteLead(id) {
  await fetch(`${API_URL}/${id}`, { method: "DELETE" });
  fetchLeads();
}
