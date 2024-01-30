import { Link } from "react-router-dom";
import { store } from "../../store";

export default function Navbar() {
  const { isLoggedIn } = store();
  return (
    <nav className="navbar bg-white">
      <div className="flex-1">
        <Link to={"/"} className="btn btn-ghost text-xl">
          <img src="/logo.png" alt="logo" height="120" width="120" />
        </Link>
      </div>
      <div className="flex-none">
        <ul className="menu menu-horizontal px-1">
          {!isLoggedIn && (
            <li>
              <Link to="/login">Login</Link>
            </li>
          )}
          {isLoggedIn && (
            <li>
              <details>
                <summary>My account</summary>
                <ul className="p-2 bg-base-100 rounded-t-none">
                  <li>
                    <Link to="/">All venues</Link>
                  </li>
                  <li>
                    <Link to="/">Profile</Link>
                  </li>
                  <li>
                    <Link to="/">Logout</Link>
                  </li>
                </ul>
              </details>
            </li>
          )}
        </ul>
      </div>
    </nav>
  );
}
