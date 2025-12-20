import { useEffect, useState } from 'react'
import './App.css'
import Posts from './components/Post';
import AddPost from './components/AddPost';
import axios from 'axios';


function App() {

  const [posts, setPosts] = useState([]);
  const [selectedPost, setSelectedPost] = useState(null);
  const [error, setError] = useState(null);

  const handleAddPost = async (newPost) => {
    try {
      const id = posts.length > 0 ? Number(posts[posts.length - 1].id) + 1 : 1;
      const finalPost = {
        id: id.toString(),
        ...newPost
      }

      const response = await axios.post('http://localhost:8000/posts', finalPost);
      setPosts([...posts, response.data]);

    } catch (error) {
      setError(error.message)
    }
  }

  console.log(selectedPost, 'Edit post');


  const handleDeletePost = async (postId) => {
    if (confirm("Are you sure you want to delete the post?")) {
      try {
        await axios.delete(`http://localhost:8000/posts/${postId}`);
        const currentPosts = posts.filter(post => post.id !== postId);
        setPosts(currentPosts)
      } catch (err) {
        setError(err.message);
      }
    }
  }


  const handleEditPost = async (updatedPost) => {
    try {
      const response = await axios.patch(`http://localhost:8000/posts/${updatedPost.id}`, updatedPost);

      setPosts(posts => (
        posts.map(post => post.id === response.data.id ? response.data : post)
      ))

      setSelectedPost(null)
    } catch (err) {
      setError(err.message);
    }
  }

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const response = await axios.get(`http://localhost:8000/posts`);

        if (response && response.data) {
          setPosts(response.data);
        }
      } catch (err) {
        setError(err.message);
      }
    }

    fetchPosts();
  }, [])

  return (
    <div>
      <div>
        <h1>API Request with Axios</h1>
        <hr />

        <div>
          <Posts
            posts={posts}
            onDeletePost={handleDeletePost}
            onEditSelect={setSelectedPost}
          />

          <hr />


          <AddPost
            key={selectedPost ? selectedPost.id : 'new'}
            onAddPost={handleAddPost}
            selectedPost={selectedPost}
            onEditPost={handleEditPost}
          />

          {/* {
            selectedPost && (
              <AddPost
                onAddPost={handleAddPost}
                selectedPost={selectedPost}
                onEditPost={handleEditPost}
              />
            )
          } */}


          {error && (
            <>
              <hr />
              <div className="error">{error}</div>
            </>
          )}
        </div>
      </div>
    </div>
  );
}

export default App
