import { NavLink } from "react-router-dom";

function Navigation() {
    return (
        <nav>
            <ul className="bg-gray-200 flex flex-rox w-full justify-center gap-6 font-semibold text-lg py-3 px-3 rounded">
                <li className="hover:text-[#df6f35]"><NavLink to="/" className={({isActive}) => isActive ? "active" : ""}>Home</NavLink></li>
                <li className="hover:text-[#df6f35]"><NavLink to="/recipe" className={({isActive}) => isActive ? "active" : ""}>Recipes</NavLink></li>

            </ul>
        </nav>
    );
}

export default Navigation;