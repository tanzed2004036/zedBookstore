import { useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";
import Home from "./Home/Home";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Navbar from "./Components/Navbar";
import Books from "./Components/Books";
import Footer from "./Components/Footer";
import BookSearch from "./Components/Search";
import BookDetails from "./Components/BookDetails";
import Writers from "./Components/Writers";
import WriterDetails from "./Components/WriterDetails";
import Category from "./Components/Category";
import CategoryDetails from "./Components/CategoryDetails";
import BookRequestForm from "./Components/BookRequest";
import WriterSearch from "./Components/WriterSearch";

const router = createBrowserRouter([
  {
    path: "/",
    element: (
      <div>
        <Home />
      </div>
    ),
  },
  {
    path: "/books",
    element: (
      <div>
        <Navbar />
        <BookSearch />
        <Books />
        <Footer />
      </div>
    ),
  },
  {
    path: "/books/:id",
    element: (
      <div>
        <Navbar />
        <BookDetails />
        <Footer />
      </div>
    ),
  },
  {
    path: "/writers",
    element: (
      <div className="py-10">
        <Navbar />
        <WriterSearch/>
        <Writers />
        <Footer />
      </div>
    ),
  },
  {
    path: "/writers/:name",
    element: (
      <div>
        <Navbar />
        <WriterDetails />
        <Footer />
      </div>
    ),
  },
  {
    path: "/categories",
    element:
    <div className="py-12"> 
      <Navbar/>
      <Category />
      <Footer/>
    </div> 
  },
  {
    path: "/categories/:id",
    element:
    <div className="py-12">
      <Navbar/>
      <Category />
      <CategoryDetails />
      <Footer/>
    </div>  
  },
  {
    path:"/requests",
    element:
    <div>
      <Navbar/>
      <BookRequestForm/>
      <Footer/>
    </div>
  }
]);

function App() {
  const [count, setCount] = useState(0);

  return (
    <>
      <RouterProvider router={router} />
    </>
  );
}

export default App;
