import React from 'react';

const AddPost = () => {
    return (
        <div>
            <h2>Add new post</h2>

            <form >
                <p>
                    <input
                        type="text"
                        placeholder="Post title"
                        // value={title}
                        // onChange={(e) => setTitle(e.target.value)}
                    />
                </p>

                <p>
                    <input
                        type="text"
                        placeholder="Post body"
                        // value={body}
                        // onChange={(e) => setBody(e.target.value)}
                    />
                </p>

                <div>
                    <input type="submit" />
                </div>
            </form>
        </div>
    );
};

export default AddPost;