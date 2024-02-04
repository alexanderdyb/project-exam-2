import { Link, useNavigate } from "react-router-dom";
import { useAuthStore } from "../../store";
import { useEffect, useState } from "react";

export default function Navbar() {
  const { isAuthenticated, logout } = useAuthStore();
  const navigate = useNavigate();
  const [logoutInitiated, setLogoutInitiated] = useState(false);

  useEffect(() => {
    if (!isAuthenticated && logoutInitiated) {
      navigate("/");
      setLogoutInitiated(false);
    }
  }, [isAuthenticated, navigate, logoutInitiated]);

  function handleLogout() {
    logout();
    setLogoutInitiated(true);
  }

  return (
    <nav className="navbar bg-white">
      <div className="flex-1">
        <Link to={"/"} className="btn btn-ghost text-xl">
          <img src="/logo.png" alt="logo" height="120" width="120" />
        </Link>
      </div>
      <div className="flex-none">
        <ul className="menu menu-horizontal px-1">
          {!isAuthenticated && (
            <li>
              <Link to="/login">Login</Link>
            </li>
          )}
          {isAuthenticated && (
            <li>
              <details>
                <summary>Account</summary>
                <ul className="p-2 bg-base-100 rounded-t-none">
                  <li>
                    <Link to="/">All venues</Link>
                  </li>
                  <li>
                    <Link to="/profile">Profile</Link>
                  </li>
                  <li>
                    <Link>
                      <button className="btn" onClick={handleLogout}>
                        Logout
                      </button>
                    </Link>
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
