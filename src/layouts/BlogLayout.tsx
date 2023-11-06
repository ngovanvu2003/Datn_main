import { Outlet } from "react-router-dom";
import BreadcrumbBlog from "../components/client/BreadcrumbBlog";

const BlogLayout = () => {
  return (
    <div>
      <BreadcrumbBlog />
      <Outlet />
    </div>
  );
};

export default BlogLayout;
