import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Home from "./pages/Home";
import Quiz from "./pages/Quiz";
import Question from "./pages/Question";
import { RecoilRoot } from "recoil";

const root = ReactDOM.createRoot(document.getElementById("root"));

const router = createBrowserRouter([
  {
    element: <App />,
    path: "/",
    children: [
      {
        index: true,
        element: <Home />,
      },
      {
        path: ":quizId/:questionId",
        element: <Question />,
      },
      {
        path: ":quizId/",
        element: <Quiz />,
      },
    ],
  },
]);

root.render(
  <React.StrictMode>
    <RecoilRoot>
      <RouterProvider router={router} />
    </RecoilRoot>
  </React.StrictMode>
);

reportWebVitals();
