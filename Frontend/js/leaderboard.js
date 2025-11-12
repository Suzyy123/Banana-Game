const leaderboardBody = document.getElementById("leaderboardBody");
const clearBtn = document.getElementById("clearScores");
const backBtn = document.getElementById("back");
const logoutBtn = document.getElementById("logout");

// Load leaderboard
function loadLeaderboard() {
  fetch("http://localhost:3000/get_scores")
    .then(res => res.json())
    .then(scores => {
      leaderboardBody.innerHTML = "";
      if (!scores.length) {
        leaderboardBody.innerHTML = "<tr><td colspan='5'>No scores yet.</td></tr>";
        return;
      }

      let totalScore = 0;
      scores.forEach((entry, i) => {
        totalScore += +entry.score;
        leaderboardBody.innerHTML += `
          <tr>
            <td>${i+1}</td>
            <td>${entry.score}</td>
            <td>${new Date(entry.date_played).toLocaleString()}</td>
             <td>${entry.level}</td>
          </tr>
        `;
      });

      // Total score row
      leaderboardBody.innerHTML += `
        <tr>
          <td colspan="2"><strong>Total</strong></td>
          <td colspan="3"><strong>${totalScore}</strong></td>
        </tr>
      `;
    })
    .catch(err => console.error(err));
}

// Clear leaderboard
clearBtn.onclick = () => fetch("http://localhost:3000/clear_scores", { method: "DELETE" })
  .then(() => loadLeaderboard())
  .catch(console.error);

// Back button
backBtn.onclick = () => window.location.href = "level.html";

// Logout button
logoutBtn.onclick = () => window.location.href = "login.html";

// Initialize
loadLeaderboard();
