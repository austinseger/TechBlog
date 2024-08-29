// Handles adding comments
document.addEventListener('DOMContentLoaded', () => {
    const commentFormHandler = async (event) => {
      event.preventDefault();
  
      const content = document.querySelector('#comment-content').value.trim();
      const postId = window.location.toString().split('/').pop();
  
      if (content) {
        const response = await fetch(`/api/comments`, {
          method: 'POST',
          body: JSON.stringify({ content, postId }),
          headers: { 'Content-Type': 'application/json' },
        });
  
        if (response.ok) {
          document.location.reload();
        } else {
          alert('Failed to submit comment');
        }
      }
    };
  
    const commentForm = document.querySelector('.comment-form');
    if (commentForm) {
      commentForm.addEventListener('submit', commentFormHandler);
    }
  });
  