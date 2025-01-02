import { usePosts } from './hooks/usePosts';
import './styles.css';

export default function App() {
  const { posts, loading } = usePosts();

  if (loading) {
    return <div>Loading...</div>;
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
