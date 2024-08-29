document.addEventListener('DOMContentLoaded', () => {
  const newFormHandler = async (event) => {
    event.preventDefault();

    const title = document.querySelector('#post-title').value.trim();
    const content = document.querySelector('#post-content').value.trim();

    console.log('Form submitted'); // Debugging line
    console.log('Title:', title); // Debugging line
    console.log('Content:', content); // Debugging line

    if (title && content) {
      try {
        const response = await fetch(`/api/posts`, {
          method: 'POST',
          body: JSON.stringify({ title, content }),
          headers: { 'Content-Type': 'application/json' },
        });

        console.log('Response status:', response.status); // Debugging line

        if (response.status === 401) {
          alert('You must be logged in to create a post.');
          document.location.replace('/login'); // Redirect to login page
        } else if (response.ok) {
          document.location.replace('/dashboard'); // Redirect to dashboard if successful
        } else {
          const errorMsg = await response.json();
          console.error('Error message:', errorMsg); // Debugging line
          alert('Failed to create post: ' + errorMsg.message);
        }
      } catch (error) {
        console.error('Fetch error:', error); // Debugging line
        alert('Failed to create post due to a network or server issue.');
      }
    } else {
      alert('Title and content cannot be empty.');
    }
  };

  const newPostForm = document.querySelector('.new-post-form');
  if (newPostForm) {
    newPostForm.addEventListener('submit', newFormHandler);
  }
});
