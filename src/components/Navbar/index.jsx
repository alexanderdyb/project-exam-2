import { Link } from "react-router-dom";
import { store } from "../../store";

export default function Navbar() {
  const { isLoggedIn } = store();
  return (
    <nav className="navbar bg-base-100">
      <div className="flex-1">
        <Link to={"/"} className="btn btn-ghost text-xl">
          <img src="/logo.png" alt="logo" height="120" width="120" />
        </Link>
      </div>
      <div className="flex-none">
        <ul className="menu menu-horizontal px-1">
          <li>
            <a>Login</a>
          </li>
          {isLoggedIn && (
            <li>
              <details>
                <summary>Parent</summary>
                <ul className="p-2 bg-base-100 rounded-t-none">
                  <li>
                    <a>Link 1</a>
                  </li>
                  <li>
                    <a>Link 2</a>
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
