import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";

import { fetchPostById, Post } from "../services/posts";
import ReactionBlock from "../components/ReactionBlock";
import styles from "./PostPage.module.css";
import { initializeReactions } from "../store/postsSlice";
import { useAppDispatch } from "../store/store";

const PostPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [post, setPost] = useState<Post | null>(null);
  const [loading, setLoading] = useState(true);
  const dispatch = useAppDispatch();

  useEffect(() => {
    const loadPost = async () => {
      try {
        if (id) {
          const data = await fetchPostById(id);
          setPost(data);
          dispatch(initializeReactions(data.id));
        }
      } catch (error) {
        console.error("Error loading post:", error);
      } finally {
        setLoading(false);
      }
    };

    loadPost();
  }, [id, dispatch]);

  if (loading) return <div className={styles.loading}>Загрузка...</div>;
  if (!post) return <div className={styles.empty}>Пост не найден</div>;

  return (
    <div className="container">
      <div className={styles.header}>
        <Link to={"/"} className={styles.link}>
          <svg
            width="18"
            height="12"
            viewBox="0 0 18 12"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M18 5H3.83L7.41 1.41L6 0L0 6L6 12L7.41 10.59L3.83 7H18V5Z"
              // fill="#0A0A0A"
              fill="currentColor"
            />
          </svg>
          Вернуться к статьям
        </Link>
        <div className={styles.reactionsContainer}>
          <ReactionBlock postId={post.id} />
        </div>
      </div>
      <h1 className={styles.title}>{post.title}</h1>
      <img
        src={`https://placehold.co/600x400/EEE/31343C?text=Post+${post.id}`}
        alt={post.title}
        className={styles.image}
      />

      <div className={styles.content}>
        <p className={styles.body}>{post.body}</p>
      </div>
    </div>
  );
};

export default PostPage;
