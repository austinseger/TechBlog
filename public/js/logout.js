document.addEventListener('DOMContentLoaded', () => {
  const logoutButton = document.querySelector('#logout');

  if (logoutButton) {
    logoutButton.addEventListener('click', async () => {
      const response = await fetch('/logout', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
      });

      if (response.ok) {
        document.location.replace('/login'); // Redirect to login page after logging out
      } else {
        alert('Failed to log out.');
      }
    });
  }
});
