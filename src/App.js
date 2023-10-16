import "./App.css";
import { useContext, useEffect } from "react";
import { AppContext } from "./context/AppContext";
import Header from "./components/Header";
import Blogs from "./components/Blogs";
import Pagination from "./components/Pagination";
import { Route, Routes, useSearchParams } from "react-router-dom";
import { useLocation } from "react-router-dom";
import Home from "./Pages/Home";
import BlogPage from "./Pages/BlogPage";
import TagPage from "./Pages/TagPage";
import CategoryPage from "./Pages/CategoryPage";

export default function App() {
  const { fetchBlogPosts } = useContext(AppContext);

  const [searchParams, setSearchParams] = useSearchParams();
  const location = useLocation();
  
  //hook
  //call on the basis of 3 types to fetch data
  useEffect(() => {
    //to get the value of page from searchParams.get("page")
    const page =  searchParams.get("page") ?? 1;

    //if tag is present at current location or path
    if(location.pathname.includes("tags")) {
      //iska matlab tag wala page show krna h 
      const tag = location.pathname.split("/").at(-1).replaceAll("-"," ");
      fetchBlogPosts(Number(page), tag);
    }

     //if categories is present at current location or path   
    else if(location.pathname.includes("categories")) {
      const category = location.pathname.split("/").at(-1).replaceAll("-"," ");
      fetchBlogPosts(Number(page), null, category);
    }

    //both category and tag not present, we call on the basis of page only
    else {
      fetchBlogPosts(Number(page));
    }
  }, [location.pathname, location.search]);

  //in path, value after ':' is dynamic 
  return (
    <Routes>
      <Route path="/" element = {<Home/>}   />
      <Route path="/blog/:blogId" element = {<BlogPage/>}   />
      <Route path="/tags/:tag" element = {<TagPage/>}   />
      <Route path="/categories/:category" element = {<CategoryPage/>}   />
    </Routes>
  );
}


//useLocation -> This hook returns the current location object
//useNavigation -> hook which gives access to navigation object
//overview of App, 1:10:00,2:02:10