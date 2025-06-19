export interface Post {
  id: number;
  title: string;
  body: string;
  userId: number;
}

export const fetchPosts = async (): Promise<Post[]> => {
  const response = await fetch(
    "https://jsonplaceholder.typicode.com/posts?_limit=10"
  );
  return response.json();
};

export const fetchPostById = async (id: string): Promise<Post> => {
  const response = await fetch(
    `https://jsonplaceholder.typicode.com/posts/${id}`
  );
  return response.json();
};

export const searchPosts = async (query: string): Promise<Post[]> => {
  const allPosts = await fetchPosts();
  return allPosts.filter((post) =>
    post.title.toLowerCase().includes(query.toLowerCase())
  );
};
