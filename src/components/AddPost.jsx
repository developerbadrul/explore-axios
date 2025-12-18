import { useState } from 'react';

const AddPost = ({ onAddPost }) => {
    const [form, setForm] = useState({
        title: "",
        body: "",
    });

    const handleChange = (e) => {
        const { name, value } = e.target;

        setForm(prev => ({
            ...prev,
            [name]: value
        }));
    }

    const isValid = form.title.trim() && form.body.trim();

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!form.title.trim() || !form.body.trim()) return;

        onAddPost(form);

        setForm({
            title: "",
            body: "",
        })
    }

    return (
        <div>
            <h2>Add new post</h2>

            <form onSubmit={handleSubmit}>
                <p>
                    <input
                        name='title'
                        type="text"
                        placeholder="Post title"
                        value={form.title}
                        onChange={handleChange}
                    />
                </p>

                <p>
                    <input
                        name='body'
                        type="text"
                        placeholder="Post body"
                        value={form.body}
                        onChange={handleChange}
                    />
                </p>

                <div>
                    <input title='Submit' type="submit" disabled={!isValid} />
                </div>
            </form>
        </div>
    );
};

export default AddPost;