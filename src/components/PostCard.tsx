import React from "react";
import { Link } from "react-router-dom";
import { Post } from "../services/posts";
import ReactionBlock from "./ReactionBlock";
import styles from "./PostCard.module.css";

interface PostCardProps {
  post: Post;
  isFeatured?: boolean;
}

const PostCard: React.FC<PostCardProps> = ({ post, isFeatured = false }) => {
  const imageUrl = `https://placehold.co/${
    isFeatured ? "600x400" : "100x100"
  }/EEE/31343C?text=Post+${post.id}`;

  return (
    <div className={`${styles.card} ${isFeatured ? styles.featured : ""}`}>
      <img
        src={imageUrl}
        alt={post.title}
        className={`${isFeatured ? styles.imageFeature : styles.image} `}
      />

      <div className={styles.content}>
        <h2 className={styles.title}>
          {isFeatured ? (
            <div className={styles.titleFeature}>
              {post.title}
              <ReactionBlock postId={post.id} />
            </div>
          ) : (
            <Link to={`/post/${post.id}`} className={styles.link}>
              {post.title}
            </Link>
          )}
        </h2>

        {/* <p className={styles.body}>
          {isFeatured ? post.body : ""}
        </p> */}
        <p className={styles.body}>{isFeatured ? post.body : ""}</p>

        <div className={styles.footer}>
          {isFeatured ? (
            <div className={styles.footerFeatureLink}>
              <Link to={`/post/${post.id}`} className={styles.readMore}>
                Читать далее
              </Link>
            </div>
          ) : (
            <div className={styles.footerLink}>
              <ReactionBlock postId={post.id} />
              <Link to={`/post/${post.id}`} className={styles.readMore}>
                Читать далее
              </Link>
            </div>
          )}

          {/* {!isFeatured && (
            <Link to={`/post/${post.id}`} className={styles.readMore}>
              Читать далее
            </Link>
          )} */}
        </div>
      </div>
    </div>
  );
};

export default PostCard;
