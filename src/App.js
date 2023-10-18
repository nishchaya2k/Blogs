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


//we want to render that component which is in route so we need, and so we consume it
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
  //whenever pathname changes and page no. changes as we have mentioned in dependencies
   //we will check the pathname and then contruct the updated url to fetch the data 
   //accordingly using AppContext




  //in path, value after ':' is dynamic, we'll the render the corresponding component 
  //whenever the particular path reached in url
  return (
    <Routes>
      <Route path="/" element = {<Home/>}   />
      <Route path="/blog/:blogId" element = {<BlogPage/>}   /> {/* this component data fetched in BlogPage */}
      <Route path="/tags/:tag" element = {<TagPage/>}   />
      <Route path="/categories/:category" element = {<CategoryPage/>}   />
    </Routes>
  );
}


//useLocation -> This hook returns the current location object
//useNavigation -> hook which gives access to navigation object
//overview of App, 1:10:00,2:02:10


/*
Whenever the location changes, <Routes> looks through all its child routes to find the
best match and renders that branch of the UI. <Route> elements may be nested to 
indicate nested UI, which also correspond to nested URL paths. Parent routes render
their child routes by rendering an <Outlet>.

Each route has the name of the components along with the path declaration, so when the
user clicks on any <Link>, the matching <Route> is identified and rendered accordingly.

*/


/*
Route
The route is a statement that holds the specific path of the app along with the 
component’s name and renders it once it matches the URL.

Link
The link is similar to the HREF link, which allows you to redirect to the specific 
components based on the specified path.
*/



//https://www.pluralsight.com/guides/how-to-set-react-router-default-route-redirect-to-home