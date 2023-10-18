import { createContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { baseUrl } from "../baseUrl";

export const AppContext = createContext();

//all the functionality which we will apply on the app is here, its just a centralised data by createContext() which we will by using hook useContext()
export default function AppContextProvider({ children }) {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(null);
  const navigate = useNavigate();

  // Fetch Blog Data, all this data we will receive from app.js, there we send the data of parameters which is received here,
  //acc. to that url will be contructed and data will be fetched from it
  const fetchBlogPosts = async (page = 1, tag=null, category) => {
    setLoading(true);

    //how do you writting below api expressions for to access diff. pages,
    //its in the documentation of api and will be given to you by designer
    let url = `${baseUrl}?page=${page}`;  //at every page posts are new, data will fetch acc. to page to show on screen
    if(tag) {
      url += `&tag=${tag}`;
    }
    if(category) {
      url += `&category=${category}`;
    }
    try {
      const res = await fetch(url);
      const data = await res.json();
      if (!data.posts || data.posts.length === 0)
        throw new Error("Something Went Wrong");
      console.log("Api Response", data);
      setPage(data.page);
      setPosts(data.posts);
      setTotalPages(data.totalPages);
    } catch (error) {
      console.log("Error in Fetching BlogPosts", error);
      setPage(1);
      setPosts([]);
      setTotalPages(null);
    }
    setLoading(false);
  };

  // Handle When Next and Previous button are clicked
  const handlePageChange = (page) => {    //this function receive new page value and then url will be updated
    navigate( { search: `?page=${page}`});
    setPage(page);
  };

  const value = {
    posts,
    setPosts,
    loading,
    setLoading,
    page,
    setPage,
    totalPages,
    setTotalPages,
    fetchBlogPosts,
    handlePageChange,
  };

  //so that children can this centralized data, children: app.js or all components
  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
}


//3 steps USed
/*
  1. Create Context
  2. Context Provider
  3. UseContext

*/