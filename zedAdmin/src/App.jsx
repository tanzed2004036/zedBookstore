import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import FrontPage from './components/FronPage';
import AdminNavbar from './components/AdminNavbar';
import AdminHome from './components/Home';
import BookAdd from './components/BookAdd';
import WriterAdd from './components/WriterAdd';
import BookRequestList from './components/Requests';
import Footer from "./components/Footer";

function App() {
  return (
    <Router>
      <div className="pt-16"> {/* Padding for fixed navbar */}
        <Routes>
          {/* Front page */}
          <Route path="/" element={<FrontPage />} />

          {/* Admin pages */}
          <Route 
            path="/home" 
            element={
              <div className="">
                <AdminNavbar />
                <AdminHome />
                <Footer/>
              </div>
            } 
          />
          <Route 
            path="/add-book" 
            element={
              <>
                <AdminNavbar />
                <BookAdd />
                <Footer/>
              </>
            } 
          />
          <Route 
            path="/add-writer" 
            element={
              <>
                <AdminNavbar />
                <WriterAdd />
                <Footer/>
              </>
            } 
          />
          <Route 
            path="/requests" 
            element={
              <>
                <AdminNavbar />
                <BookRequestList />
                <Footer/>
              </>
            } 
          />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
