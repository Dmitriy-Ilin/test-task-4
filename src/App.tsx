import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Provider } from "react-redux";

import HomePage from "./pages/HomePage";
import PostPage from "./pages/PostPage";

import "./App.css";
import { store } from "./store/store";
import Layout from "./components/Laoyout";

const App: React.FC = () => {
  return (
    <Provider store={store}>
      <Router>
        <Layout>
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/post/:id" element={<PostPage />} />
          </Routes>
        </Layout>
      </Router>
    </Provider>
  );
};

export default App;
