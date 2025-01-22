const videoContainer = document.getElementById('videoContainer');
const form = document.getElementById('commentForm');
const videoComments = document.querySelector('.video__comments ul');

let videoId = videoContainer.dataset.id;

const addComment = (text, id) => {
  const newComment = document.createElement('li');
  newComment.dataset.id = id;
  newComment.className = 'video__comment';
  const icon = document.createElement('i');
  icon.className = 'fas fa-comment';
  const span = document.createElement('span');
  span.innerText = ` ${text}`;
  const span2 = document.createElement('span');
  span2.innerText = '❌';
  span2.className = 'comment_delete';
  newComment.appendChild(icon);
  newComment.appendChild(span);
  newComment.appendChild(span2);
  videoComments.prepend(newComment);
};

const handleDeleteComment = async (event) => {
  if (event.target.className !== 'comment_delete') {
    return;
  }
  const comment = event.target.closest('li');
  const commentId = comment.dataset.id;
  const response = await fetch(`/api/videos/${commentId}/comment`, {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ videoId }),
  });
  if (response.status === 200) {
    comment.remove();
  }
};

const handleSubmit = async (event) => {
  event.preventDefault();
  const textarea = form.querySelector('textarea');
  const text = textarea.value;
  if (text === '') {
    return;
  }
  const response = await fetch(`/api/videos/${videoId}/comment`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ text }),
  });
  if (response.status === 201) {
    textarea.value = '';
    const { newCommentId } = await response.json();
    addComment(text, newCommentId);
  }
};

if (form) {
  form.addEventListener('submit', handleSubmit);
}

videoComments.addEventListener('click', handleDeleteComment);
