import { useState, useEffect, useRef } from "react";

const MenuOrder = () => {
  const [isFixed, setIsFixed] = useState(false);
  const menuRef = useRef(null);
  const imageRef = useRef<any>(null);

  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY;
      const imageBottom: any = imageRef.current.getBoundingClientRect().bottom;
      setIsFixed(scrollY > imageBottom);
    };
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const menuClassName = isFixed
    ? "fixed top-0 left-0 w-full bg-white shadow-md z-50"
    : "relative";
  return (
    <div>
      <div ref={menuRef}>
        <img ref={imageRef} />
      </div>
      <div className={menuClassName}>
        <ul
          className="flex justify-center space-x-1 font-normal py-3 rounded-md bg-white text-sm lg:text-base"
          style={{
            color: "rgb(204, 103, 11)",
            backgroundImage: "url('/Images - Copy/paper_bg.png')",
          }}
        >
          <li
            className="border px-3 lg:px-4 shadow-md"
            style={{
              backgroundColor: "#fff",
              borderRadius: "10px 2px 2px 10px",
            }}
          >
            <a>COMBO </a>
          </li>
          <li
            className="border rounded-sm px-3 lg:px-4 shadow-md"
            style={{ backgroundColor: "#fff" }}
          >
            {" "}
            MÓN KHÁC
          </li>
          <li
            className="border px-3 lg:px-4 shadow-md"
            style={{
              backgroundColor: "#fff",
              borderRadius: "2px 10px 10px 2px",
            }}
          >
            ĐỒ UỐNG
          </li>
        </ul>
      </div>
      {/* Content of the page */}
      <div style={{ marginTop: isFixed ? "10px" : "0" }}>
        {/* Your page content goes here */}
      </div>
    </div>
  );
};

export default MenuOrder;
