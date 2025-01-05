import { usePosts } from './hooks/usePosts';
import './styles.css';

export default function App() {
  const { posts, loading, error } = usePosts();

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error loading posts</div>;
  }

  return (
    <div className="App">
      <h1>Posts list</h1>
      <ul>
        {posts.map((post: any) => (
          <li key={post.id}>{post.title}</li>
        ))}
      </ul>
    </div>
  );
}
