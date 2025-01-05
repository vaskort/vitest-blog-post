import App from './App';
import { render } from '@testing-library/react';
import { usePosts } from '@/hooks/usePosts';

vi.mock('@/hooks/usePosts');

describe('App', () => {
  const mockUsePosts = vi.mocked(usePosts);

  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('should render the loading state', () => {
    mockUsePosts.mockReturnValue({ posts: [], loading: true });
    const { getByText } = render(<App />);

    expect(getByText('Loading...')).toBeInTheDocument();
  });

  it('should render the posts', () => {
    const mockPosts = [
      { id: 1, userId: 1, body: 'Content 1', title: 'Post 1' },
      { id: 2, userId: 2, body: 'Content 2', title: 'Post 2' },
    ];

    mockUsePosts.mockReturnValue({ posts: mockPosts, loading: false });
    const { getByText } = render(<App />);

    expect(getByText('Post 1')).toBeInTheDocument();
    expect(getByText('Post 2')).toBeInTheDocument();
  });
});
