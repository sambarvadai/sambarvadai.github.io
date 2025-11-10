import { Link } from "react-router";
const Navbar = () => {
    return (
        <nav className="w-100% sticky top-0 mx-[15] h-15">
            <div className="flex flex-row justify-end items-end gap-5">
                <div><a>blog</a></div>
                <div>dark mode.</div>
            </div>
        </nav>
    )
}
export default Navbar;