//from localStorage
const username = localStorage.getItem('username') || 'Player';
document.getElementById('usernameDisplay').textContent = username;
// Add click events to level buttons

document.querySelectorAll('.level-btn').forEach(button => {
  button.addEventListener('click', () => {
    const level = button.getAttribute('data-level');
    localStorage.setItem('gameLevel', level);
    alert(`You selected "${level}" level!`);
    // Redirect to actual game page (replace with your game URL)
    window.location.href = 'game.html';
  });
});
