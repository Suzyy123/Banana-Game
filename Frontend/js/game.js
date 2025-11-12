// ✅ Use a stable CORS proxy
const API_URL =
  "https://corsproxy.io/?" +
  encodeURIComponent("http://marcconrad.com/uob/banana/api.php?out=json");
let correctAnswer = "";
let score = sessionStorage.getItem("banana_score")
  ? parseInt(sessionStorage.getItem("banana_score"))
  : 0;
// DOM elements
const puzzleImage = document.getElementById("puzzleImage");
const result = document.getElementById("result");
const scoreDisplay = document.getElementById("score");
const userAnswer = document.getElementById("userAnswer");
// Get selected level from localStorage (set on level page)
const gameLevel = localStorage.getItem("gameLevel") || "easy";
// Set score increment based on level
let levelIncrement = 1;
if (gameLevel === "intermediate") levelIncrement = 3;
if (gameLevel === "hard") levelIncrement = 5;

// Fetch a new puzzle
async function loadPuzzle() {
  result.textContent = "Loading new puzzle...";
  try {
    const response = await fetch(API_URL);
    const data = await response.json();
    console.log("Fetched puzzle:", data);
    // Ensure image uses HTTPS
    puzzleImage.src = data.question.replace("http://", "https://");
    // Store solution as string
    correctAnswer = String(data.solution).trim();
    result.textContent = `Puzzle loaded! Level: ${gameLevel}. Enter your answer.`;
  } catch (error) {
    result.textContent = "⚠️ Failed to load puzzle. Try again.";
    console.error("Error fetching puzzle:", error);
  }
}
function checkAnswer() {
  const userInput = userAnswer.value.trim();
  if (userInput === "") {
    result.textContent = "Please enter an answer.";
    return;
  }
  if (userInput.toLowerCase() === correctAnswer.toLowerCase()) {
    const pointsEarned = levelIncrement; // only points for this puzzle
    score += pointsEarned; // update session score
    sessionStorage.setItem("banana_score", score);
    result.textContent = `✅ Correct! +${pointsEarned} points`; 
    recordScore(pointsEarned); // save only pointsEarned
  } else {
    result.textContent = `❌ Wrong! Correct answer: ${correctAnswer}`;
  }
  updateScore();
}
function recordScore(points) {
  const username = localStorage.getItem('username') || 'Player';
  fetch("http://localhost:3000/save_score", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      username: username,
      score: points,
      level: gameLevel
    })
  })
  .then(res => res.json())
  .then(data => {
    if(!data.success) console.error("Error saving score:", data.message);
  })
  .catch(err => console.error("Error:", err));
}
// Update score display
function updateScore() {
  scoreDisplay.textContent = `Score: ${score}`;
}
// Reveal solution without affecting score
function revealSolution() {
  if (correctAnswer) {
    result.textContent = `Solution: ${correctAnswer}`;
  } else {
    result.textContent = "No puzzle loaded yet.";
  }
}
// Event listeners
document.getElementById("newPuzzle").addEventListener("click", loadPuzzle);
document.getElementById("checkAnswer").addEventListener("click", checkAnswer);
document.getElementById("revealSolution").addEventListener("click", revealSolution);

// Navigate to leaderboard
document.getElementById("Leaderboard").addEventListener("click", () => {
  window.location.href = "leaderboard.html"; 
});

// Navigate back
document.getElementById("back").addEventListener("click", () => {
  window.location.href = "level.html"; 
});

// Initialize
updateScore();
loadPuzzle();
