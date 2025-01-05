import { renderHook, waitFor } from '@testing-library/react';
import { usePosts } from './usePosts';

import axios from 'axios';

// Vitest does not auto-mock modules like Jest does.
// We manually mock 'axios' to control its behavior and use mockResolvedValue for testing.
vi.mock('axios');

describe('usePosts', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  describe('when the API call is successful', () => {
    const mockAxios = vi.mocked(axios.get);
    const mockPosts = [
      { id: 1, title: 'Post 1' },
      { id: 2, title: 'Post 2' },
    ];

    beforeEach(() => {
      mockAxios.mockResolvedValue({ data: mockPosts });
    });

    it('should return the posts and loading as false', async () => {
      const { result } = renderHook(() => usePosts());

      // waitFor is used to wait for asynchronous state updates in the hook.
      // Without it, assertions might run before the API call resolves.
      await waitFor(() => {
        expect(result.current.posts).toEqual(mockPosts);
        expect(result.current.loading).toBe(false);
      });
    });
  });

  describe('when the API call fails', () => {
    const mockAxios = vi.mocked(axios.get);

    beforeEach(() => {
      mockAxios.mockRejectedValue(new Error('API call failed'));
    });

    it('should return an empty array and loading as false', async () => {
      const { result } = renderHook(() => usePosts());

      await waitFor(() => {
        expect(result.current.posts).toEqual([]);
        expect(result.current.loading).toBe(false);
      });
    });
  });
});
