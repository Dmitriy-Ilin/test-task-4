import React from "react";

import styles from "./ReactionBlock.module.css";
import { useAppDispatch, useAppSelector } from "../store/store";
import { setReaction } from "../store/postsSlice";

interface ReactionBlockProps {
  postId: number;
}

const ReactionBlock: React.FC<ReactionBlockProps> = ({ postId }) => {
  const dispatch = useAppDispatch();
  const reactionState = useAppSelector(
    (state) => state.posts.reactions[postId]
  );

  const handleReaction = (reaction: "like" | "dislike") => {
    dispatch(setReaction({ postId, reaction }));
  };

  return (
    <div className={styles.reactions}>
      <button
        className={`${styles.button} ${
          reactionState?.userReaction === "like" ? styles.active : ""
        }`}
        onClick={() => handleReaction("like")}
      >
        <span className={styles.icon}>
          <svg
            width="28"
            height="25"
            viewBox="0 0 28 25"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M0.666687 24.1667H3.33335C4.06669 24.1667 4.66669 23.5667 4.66669 22.8334V10.8334C4.66669 10.1 4.06669 9.50002 3.33335 9.50002H0.666687V24.1667ZM27.1067 14.6734C27.2534 14.34 27.3334 13.98 27.3334 13.6067V12.1667C27.3334 10.7 26.1334 9.50002 24.6667 9.50002H17.3334L18.56 3.30002C18.6267 3.00669 18.5867 2.68669 18.4534 2.42002C18.1467 1.82002 17.76 1.27335 17.28 0.793354L16.6667 0.166687L8.12002 8.71335C7.61335 9.22002 7.33335 9.90002 7.33335 10.6067V21.06C7.33335 22.7667 8.73335 24.1667 10.4534 24.1667H21.2667C22.2 24.1667 23.08 23.6734 23.56 22.8734L27.1067 14.6734Z"
              fill="currentColor"
            />
          </svg>
        </span>
        <span className={styles.count}>{reactionState?.likes || 0}</span>
      </button>

      <button
        className={`${styles.button} ${
          reactionState?.userReaction === "dislike" ? styles.activeDislike : ""
        }`}
        onClick={() => handleReaction("dislike")}
      >
        <span className={styles.icon}>
          <svg
            width="28"
            height="25"
            viewBox="0 0 28 25"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M0.666646 0.333328H3.33331C4.06665 0.333328 4.66665 0.933328 4.66665 1.66666V13.6667C4.66665 14.4 4.06665 15 3.33331 15H0.666646V0.333328ZM27.1066 9.82666C27.2533 10.16 27.3333 10.52 27.3333 10.8933V12.3333C27.3333 13.8 26.1333 15 24.6666 15H17.3333L18.56 21.2C18.6266 21.4933 18.5866 21.8133 18.4533 22.08C18.1466 22.68 17.76 23.2267 17.28 23.7067L16.6666 24.3333L8.11998 15.7867C7.61331 15.28 7.33331 14.6 7.33331 13.8933V3.45333C7.33331 1.73333 8.73331 0.333328 10.4533 0.333328H21.2533C22.2 0.333328 23.0666 0.826661 23.5466 1.62666L27.1066 9.82666Z"
              fill="currentColor"
              fill-opacity="0.54"
            />
          </svg>
        </span>
        <span className={styles.count}>{reactionState?.dislikes || 0}</span>
      </button>
    </div>
  );
};

export default ReactionBlock;
