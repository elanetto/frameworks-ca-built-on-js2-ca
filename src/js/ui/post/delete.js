export async function onDeletePost(event) {
    event.preventDefault();
    const postId = event.target.dataset.postId;

    try {
        const response = await fetch(`/api/posts/${postId}`, {
            method: 'DELETE',
        });

        if (response.ok) {
            document.getElementById('post-' + postId).remove();
        } else {
            console.error('Failed to delete post');
        }

        window.location.href = '/';
    } catch (error) {
        console.error('Failed to delete post', error);
    }
}
