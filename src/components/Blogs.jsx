import { useContext } from "react";
import { AppContext } from "../context/AppContext";
import BlogDetails from "./BlogDetails";
import Spinner from "./Spinner";

export default function Blogs() {

  //we have posts and loading data, the point is how we gonna consume it, by using 
  //'UseContext()' hook, we can have multiple Context in the app, but, at present 
  //we have AppContext in this app, so obviously we will use that only
  
  const { posts, loading } = useContext(AppContext);

  return (
    <div className="flex flex-col p-10 pt-0 pb-20 my-4 mt-16 ">
      {loading ? 
      (<Spinner/>) : 
          posts.length === 0 ? (
          <div className="min-h-[80vh] w-full flex justify-center items-center">
          <p className="text-center font-bold text-3xl">No Blogs Found !</p>
        </div>
      ) :
            
       (
        
        posts.map((post) => (                           //take post as a parameter, and post to BlogDetails
          <BlogDetails key={post.id} post={post}/>
        ))
      )
      
      }
    </div>
  );
}

//we need to do 3 levels of calls from now-> means 3 pages
//Blog, Category, Tag