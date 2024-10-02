export async function updatePost(id, { title, body, tags, media }) {
    try {
        const response = await fetch(`/api/posts/${id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ title, body, tags, media }),
        });

        if (response.ok) {
            return await response.json();
        } else {
            throw new Error('Failed to update post');
        }
    } catch (error) {
        console.error('Failed to update post', error);
    }
}
