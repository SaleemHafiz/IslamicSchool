import { createBrowserRouter } from "react-router-dom";
import App from "./App.jsx";
import Home from "./pages/Home.jsx";
import AllBlocks from "./pages/AllBlocks.jsx";
import About from "./pages/About.jsx";
import api from "./utils/axios.js";

// Loader for global meta.json
const loadMeta = async () => {
  try {
    const res = await api.get(
      "https://raw.githubusercontent.com/SaleemHafiz/db/main/islamicschool/meta/meta.json"
    );
    return res.data;
  } catch (error) {
    throw { message: "Failed to load meta" , status: 500 };
  }
};

export const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    loader: loadMeta,
    children: [
      {
        index: true,
        element: <Home />,
        loader: async () => {
          try {
            const res = await api.get(
              "https://raw.githubusercontent.com/SaleemHafiz/db/main/islamicschool/meta/home.json"
            );
            return res.data;
          } catch (error) {
            throw { message: "Failed to load home data", status: 500 };
          }
        }
      },
      {
        path: "blocks",
        element: <AllBlocks />,
        loader: async () => {
          try {
            const res = await api.get(
              "https://raw.githubusercontent.com/SaleemHafiz/db/main/islamicschool/meta/blocks.json"
            );
            return res.data;
          } catch (error) {
            throw { message: "Failed to load blocks data", status: 500 };
          }
        }
      },
      {
        path: "about",
        element: <About />
      }
    ]
  }
]);
