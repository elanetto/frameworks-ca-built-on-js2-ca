export async function onUpdatePost(event) {
    event.preventDefault();
    const postId = event.target.dataset.postId;
    const updatedPostData = {
        title: document.getElementById('title').value,
        content: document.getElementById('content').value,
    };

    try {
        const response = await fetch(`/api/posts/${postId}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(updatedPostData),
        });

        if (response.ok) {
            document.getElementById('post-' + postId).remove();
        } else {
            console.error('Failed to update post');
        }

        window.location.href = '/';
    } catch (error) {
        console.error('Failed to update post', error);
    }
}
