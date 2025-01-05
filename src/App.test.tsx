import App from './App';
import { render } from '@testing-library/react';
import { usePosts } from '@/hooks/usePosts';

vi.mock('@/hooks/usePosts');

describe('App', () => {
  const mockUsePosts = vi.mocked(usePosts);

  beforeEach(() => {
    vi.clearAllMocks();
  });

  describe('Loading state', () => {
    beforeEach(() => {
      mockUsePosts.mockReturnValue({ posts: [], loading: true, error: false });
    });

    it('should render the loading state', () => {
      const { getByText } = render(<App />);

      expect(getByText('Loading...')).toBeInTheDocument();
    });
  });

  describe('Error state', () => {
    beforeEach(() => {
      mockUsePosts.mockReturnValue({ posts: [], loading: false, error: true });
    });

    it('should render the error state', () => {
      const { getByText } = render(<App />);

      expect(getByText('Error loading posts')).toBeInTheDocument();
    });
  });

  describe('Success state', () => {
    const mockPosts = [
      { id: 1, userId: 1, body: 'Content 1', title: 'Post 1' },
      { id: 2, userId: 2, body: 'Content 2', title: 'Post 2' },
    ];

    beforeEach(() => {
      mockUsePosts.mockReturnValue({
        posts: mockPosts,
        loading: false,
        error: false,
      });
    });

    it('should render the posts', () => {
      const { getByText } = render(<App />);

      expect(getByText('Post 1')).toBeInTheDocument();
      expect(getByText('Post 2')).toBeInTheDocument();
    });
  });
});
