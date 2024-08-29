document.addEventListener('DOMContentLoaded', () => {
  const newFormHandler = async (event) => {
    event.preventDefault();

    const title = document.querySelector('#post-title').value.trim();
    const content = document.querySelector('#post-content').value.trim();

    console.log('Form submitted'); 
    console.log('Title:', title); 
    console.log('Content:', content); 

    if (title && content) {
      try {
        const response = await fetch(`/api/posts`, {
          method: 'POST',
          body: JSON.stringify({ title, content }),
          headers: { 'Content-Type': 'application/json' },
        });

        console.log('Response status:', response.status); 

        if (response.status === 401) {
          alert('You must be logged in to create a post.');
          document.location.replace('/login'); 
        } else if (response.ok) {
          document.location.replace('/dashboard'); 
        } else {
          const errorMsg = await response.json();
          console.error('Error message:', errorMsg); 
          alert('Failed to create post: ' + errorMsg.message);
        }
      } catch (error) {
        console.error('Fetch error:', error); 
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
