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
      <div div className="min-h-screen flex flex-col">
        <Navbar />
        <main className="flex-1">
        <BookSearch />
        <Books />          
        </main>

        <Footer />
      </div>
    ),
  },
  {
    path: "/books/:id",
    element: (
      <div div className="min-h-screen flex flex-col">
        <Navbar />
        <main className="flex-1">
        <BookDetails />          
        </main>
        <Footer />
      </div>
    ),
  },
  {
    path: "/writers",
    element: (
      <div div className="min-h-screen flex flex-col">
        <Navbar />
         <main className="flex-1">
        <WriterSearch/>
        <Writers />          
         </main>

        <Footer />
      </div>
    ),
  },
  {
    path: "/writers/:name",
    element: (
      <divdiv className="min-h-screen flex flex-col" >
        <Navbar />
        <main className="flex-1">
        <WriterDetails />          
        </main>
        <Footer />
      </divdiv>
    ),
  },
  {
    path: "/categories",
    element:
    <div div className="min-h-screen flex flex-col"> 
      <Navbar/>
      <main className="flex-1">
      <Category />
       </main>
      <Footer/>
    </div> 
  },
  {
    path: "/categories/:id",
    element:
    <div className="py-12" >
      <Navbar/>
      <Category />
      <CategoryDetails />        
     

      <Footer/>
    </div>  
  },
  {
    path:"/requests",
    element:
    <div div className="min-h-screen flex flex-col">
      <Navbar/>
      <main className="flex-1">
      <BookRequestForm/>        
      </main>

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
