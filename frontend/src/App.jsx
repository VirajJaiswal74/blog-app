import { Route, Routes } from "react-router-dom";
import Home from "./pages/user/Home";
import AllBlogs from "./pages/user/AllBlogs";
import DiscribeBlogs from "./pages/user/DiscribeBlogs";
import CreateBlogs from "./pages/admin/CreateBlogs";
import AllAdminBlogs from "./pages/admin/AllAdminBlogs";
import Navbar from "./pages/user/Navbar";
import AdminNavbar from "./pages/admin/AdminNavbar";
import AdminHome from "./pages/admin/AdminHome";
import { Toaster } from "react-hot-toast";
import { useSelector } from "react-redux";
import Account from "./pages/Account";
import RightSideBar from "./pages/admin/RightSideBar";
import AdminDescription from "./pages/admin/AdminDescription";

const App = () => {
  const userData = useSelector((store) => store?.user?.user);
  const postData = useSelector((store) => store?.allpost?.post);
  const postsData = useSelector((store) => store?.allpost?.posts);

  console.log("userData:", userData);
  console.log("postData:", postData);
  console.log("postsData:", postsData);

  return (
    <>
      <Toaster position="top-center" />
      {!userData?.user?.role ? (
        <Account />
      ) : (
        <div>
          {userData?.user?.role === "user" ? (
            <>
              <Navbar />
            </>
          ) : (
            <>
              <AdminNavbar user={userData} />
            </>
          )}
          {userData?.user?.role === "user" ? (
            <>
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/all-blogs" element={<AllBlogs />} />
                {/* {postsData?.post?.map((item, index) => (
                  <Route
                    key={item?._id}
                    path={`/${item._id}`}
                    element={<DiscribeBlogs item={item} />}
                  />
                ))} */}
                {Array.isArray(postsData?.post) &&
                  postsData.post.map((item) => (
                    <Route
                      key={item._id}
                      path={`/${item._id}`}
                      element={<DiscribeBlogs item={item} />}
                    />
                  ))}
              </Routes>
            </>
          ) : (
            <div className="flex">
              <div className="w-[15%] border-r-2  border-gray-300">
                <RightSideBar />
              </div>
              <div className="w-[85%]">
                <Routes>
                  <Route path="/" element={<AdminHome />} />
                  <Route
                    path="/create-blogs"
                    element={<CreateBlogs user={userData} />}
                  />
                  <Route path="/all-admin-blogs" element={<AllAdminBlogs />} />
                  {/* {postData?.post?.map((item, index) => (
                    <Route
                      key={item?._id}
                      path={`/${item?._id}`}
                      element={<AdminDescription item={item} />}
                    />
                  ))} */}
                  {Array.isArray(postData?.post) &&
                    postData?.post?.map((item, index) => (
                      <Route
                        key={item?._id}
                        path={`/${item?._id}`}
                        element={<AdminDescription item={item} />}
                      />
                    ))}
                </Routes>
              </div>
            </div>
          )}
        </div>
      )}
    </>
  );
};

export default App;
