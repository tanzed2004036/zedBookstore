import React from 'react'
import Navbar from '../Components/Navbar'
// import Search from '../Components/Search'
import Banner from '../Components/Banner'
import Footer from '../Components/Footer'
import Category from '../Components/Category'
import RecentBooks from '../Components/RecentBooks'


function Home() {
  return (
    <div>
      <Navbar/>
      {/* <Search/> */}
      <Banner/>
      <Category/>
      <RecentBooks/>
      <Footer/>
    </div>
  )
}

export default Home
