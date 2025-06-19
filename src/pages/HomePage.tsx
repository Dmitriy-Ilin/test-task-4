import React, { useEffect, useState } from "react";

import { fetchPosts, searchPosts, Post } from "../services/posts";
import PostCard from "../components/PostCard";

import styles from "./HomePage.module.css";
import { initializeReactions } from "../store/postsSlice";
import { useAppDispatch } from "../store/store";
import SearchBar from "../components/SearchBar";

const HomePage: React.FC = () => {
  const [posts, setPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const dispatch = useAppDispatch();

  useEffect(() => {
    const loadPosts = async () => {
      try {
        const data = searchQuery
          ? await searchPosts(searchQuery)
          : await fetchPosts();
        setPosts(data);
        data.forEach((post) => dispatch(initializeReactions(post.id)));
      } catch (error) {
        console.error("Произошла ошибка при загрузке постов:", error);
      } finally {
        setLoading(false);
      }
    };

    loadPosts();
  }, [searchQuery, dispatch]);

  return (
    <div className="container">
      <h1 className={styles.title}>Блог</h1>
      <p className={styles.text}>
        Здесь мы делимся интересными кейсами из наших проектов, пишем про IT, а
        также переводим зарубежные статьи
      </p>
      <SearchBar
        value={searchQuery}
        onChange={setSearchQuery}
        placeholder="Поиск по названию статьи"
      />

      {loading ? (
        <div className={styles.loading}>Загрузка...</div>
      ) : posts.length === 0 ? (
        <div className={styles.empty}>Посты не найдены</div>
      ) : (
        <>
          {posts.length > 0 && (
            <div className={styles.featuredPost}>
              <PostCard key={posts[0].id} post={posts[0]} isFeatured={true} />
            </div>
          )}

          <div className={styles.postsContainer}>
            <div className={styles.column}>
              {posts
                .slice(1)
                .filter((_, index) => index % 2 === 0)
                .map((post) => (
                  <PostCard key={post.id} post={post} isFeatured={false} />
                ))}
            </div>
            <div className={styles.column}>
              {posts
                .slice(1)
                .filter((_, index) => index % 2 === 1)
                .map((post) => (
                  <PostCard key={post.id} post={post} isFeatured={false} />
                ))}
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default HomePage;
