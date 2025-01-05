import { useEffect, useState } from 'react';
import axios from 'axios';
import { Post } from '@/types/Post';

const API_URL = 'https://jsonplaceholder.typicode.com/posts';

export const usePosts = () => {
  const [posts, setPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const response = await axios.get(API_URL);

        setPosts(response.data);
      } catch (error) {
        setError(true);
      } finally {
        setLoading(false);
      }
    };

    fetchPosts();
  }, []);

  return { posts, loading, error };
};
