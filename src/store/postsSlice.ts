import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface ReactionState {
  likes: number;
  dislikes: number;
  userReaction: "like" | "dislike" | null;
}

interface PostsState {
  reactions: {
    [postId: number]: ReactionState;
  };
}

const initialState: PostsState = {
  reactions: {},
};

const postsSlice = createSlice({
  name: "posts",
  initialState,
  reducers: {
    initializeReactions(state, action: PayloadAction<number>) {
      const postId = action.payload;
      if (!state.reactions[postId]) {
        state.reactions[postId] = {
          likes: Math.floor(Math.random() * 100),
          dislikes: Math.floor(Math.random() * 100),
          userReaction: null,
        };
      }
    },
    setReaction(
      state,
      action: PayloadAction<{
        postId: number;
        reaction: "like" | "dislike";
      }>
    ) {
      const { postId, reaction } = action.payload;
      const current = state.reactions[postId];

      if (!current) return;

      if (current.userReaction === "like") current.likes--;
      if (current.userReaction === "dislike") current.dislikes--;

      if (current.userReaction === reaction) {
        current.userReaction = null;
      } else {
        current.userReaction = reaction;
        if (reaction === "like") current.likes++;
        else current.dislikes++;
      }
    },
  },
});

export const { initializeReactions, setReaction } = postsSlice.actions;
export default postsSlice.reducer;
