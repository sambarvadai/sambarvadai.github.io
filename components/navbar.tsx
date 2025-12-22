import react, {useState, useEffect} from "react";
import { Link } from "react-router";
const Navbar = () => {
    const [clickMenu, setClickMenu] = useState(false);
    const [darkMode, setDarkMode] = useState(() =>
  document.documentElement.classList.contains("dark")
);

    useEffect(() => {
        if (darkMode) {
            document.documentElement.classList.add("dark");
            localStorage.setItem("theme", "dark");
        } else {
            document.documentElement.classList.remove("dark");
            localStorage.setItem("theme", "light");
        }
    }, [darkMode]);
    return (
        <nav className="w-100% sticky top-0 mx-[30] h-15">
            <div className="flex flex-row justify-end items-end gap-5 dark:text-gray-300">
                <div><a href="blog.sambarvadai.dev" target="_blank" rel="noopener noreferrer">blog</a></div>
                <button className="cursor-pointer" onClick={() => setDarkMode(!darkMode)}>{darkMode ? "light " : "dark "}mode </button>
                <div id="menu" className="relative group ">
                    <button className="font-semibold" onClick={()=>setClickMenu(!clickMenu)}>Menu</button>
                      <ul className={`
          absolute left-0 mt-2 flex-col transition-all duration-150
          ${clickMenu ? "flex" : "hidden"}
        `}
      >
                            <li><Link to="/">Home</Link></li>
                            <li><Link to="/about">About</Link></li>
                            <li><Link to="/projects">Projects</Link></li>
                            <li>Contact</li>
                        </ul>
                </div>
            </div>
        </nav>
    )
}
export default Navbar;