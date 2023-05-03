import { NavLink } from "react-router-dom";
import { useAuth } from "../../context/auth";
import { useNavigate } from "react-router-dom";
import Search from "../forms/Search";
import useCategory from "../../hooks/useCategory";
import { useCart } from "../../context/cart";
import { Badge } from "antd";
import React, { useState } from 'react';


export default function Menu() {
  // context
  const [auth, setAuth] = useAuth();
  const [cart, setCart] = useCart();
  // hooks
  const categories = useCategory();
  const navigate = useNavigate();

  // console.log("categories in menu => ", categories);

  const logout = () => {
    setAuth({ ...auth, user: null, token: "" });
    localStorage.removeItem("auth");
    navigate("/login");
  };
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <ul className="nav d-flex justify-content-between shadow-sm mb-2 sticky-top bg-light">
        <li className="nav-item">
          <NavLink className="nav-link" aria-current="page" to="/">
            HOME
          </NavLink>
        </li>

        <li className="nav-item">
          <NavLink className="nav-link" aria-current="page" to="/shop">
            LOJA
          </NavLink>
        </li>

        <div id="drop1" className="dropdown">
          <li>
            <a
              className="nav-link pointer dropdown-toggle"
              data-bs-toggle="dropdown"
            >
              CATEGORIAS
            </a>

            <ul
              className="dropdown-menu"
              style={{ height: "300px", overflow: "scroll" }}
            >
              <li>
                <NavLink className="nav-link" to="/categories">
                  TODAS CATEGORIAS
                </NavLink>
              </li>

              {categories?.map((c) => (
                <li key={c._id}>
                  <NavLink className="nav-link" to={`/category/${c.slug}`}>
                    {c.name}
                  </NavLink>
                </li>
              ))}
            </ul>
          </li>
        </div>

        <li className="nav-item mt-1  mx-3 ">
          <Badge
            count={cart?.length >= 1 ? cart.length : 0}
            offset={[-5, 11]}
            showZero={true}
          >
            <NavLink className="nav-link " aria-current="page" to="/cart">
              CARRINHO
            </NavLink>
          </Badge>
        </li>

        <Search />

        {!auth?.user ? (
          <>
            <li className="nav-item">
              <NavLink className="nav-link" to="/login">
                LOGIN
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink className="nav-link" to="/register">
                REGISTRAR
              </NavLink>
            </li>
          </>
        ) : (
          <div id="drop2" className="dropdown">
            <li>
              <a
                className="nav-link pointer dropdown-toggle"
                data-bs-toggle="dropdown"
              >
                {auth?.user?.name?.toUpperCase()}
              </a>

              <ul className="dropdown-menu">
                <li>
                  <NavLink
                    className="nav-link"
                    to={`/dashboard/${
                      auth?.user?.role === 1 ? "admin" : "user"
                    }`}
                  >
                    Área de trabalho
                  </NavLink>
                </li>

                <li className="nav-item pointer">
                  <a onClick={logout} className="nav-link">
                    Logout
                  </a>
                </li>
              </ul>
            </li>
          </div>
        )}
      </ul>



    </>
  );
}

/*
<ul className="nav d-flex justify-content-between shadow-sm mb-2 sticky-top bg-light">
        <li className="nav-item">
          <NavLink className="nav-link" aria-current="page" to="/">
            HOME
          </NavLink>
        </li>

        <li className="nav-item">
          <NavLink className="nav-link" aria-current="page" to="/shop">
            SHOP
          </NavLink>
        </li>

        <div className="dropdown">
          <li>
            <a
              className="nav-link pointer dropdown-toggle"
              data-bs-toggle="dropdown"
            >
              CATEGORIES
            </a>

            <ul
              className="dropdown-menu"
              style={{ height: "300px", overflow: "scroll" }}
            >
              <li>
                <NavLink className="nav-link" to="/categories">
                  All Categories
                </NavLink>
              </li>

              {categories?.map((c) => (
                <li key={c._id}>
                  <NavLink className="nav-link" to={`/category/${c.slug}`}>
                    {c.name}
                  </NavLink>
                </li>
              ))}
            </ul>
          </li>
        </div>

        <li className="nav-item mt-1">
          <Badge
            count={cart?.length >= 1 ? cart.length : 0}
            offset={[-5, 11]}
            showZero={true}
          >
            <NavLink className="nav-link" aria-current="page" to="/cart">
              CART
            </NavLink>
          </Badge>
        </li>

        <Search />

        {!auth?.user ? (
          <>
            <li className="nav-item">
              <NavLink className="nav-link" to="/login">
                LOGIN
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink className="nav-link" to="/register">
                REGISTER
              </NavLink>
            </li>
          </>
        ) : (
          <div className="dropdown">
            <li>
              <a
                className="nav-link pointer dropdown-toggle"
                data-bs-toggle="dropdown"
              >
                {auth?.user?.name?.toUpperCase()}
              </a>

              <ul className="dropdown-menu">
                <li>
                  <NavLink
                    className="nav-link"
                    to={`/dashboard/${
                      auth?.user?.role === 1 ? "admin" : "user"
                    }`}
                  >
                    Dashboard
                  </NavLink>
                </li>

                <li className="nav-item pointer">
                  <a onClick={logout} className="nav-link">
                    Logout
                  </a>
                </li>
              </ul>
            </li>
          </div>
        )}
      </ul>

      
  return (
    <>
      <div className="bg-light shadow-sm sticky top-0">
        <nav className="flex flex-wrap items-center justify-between px-4 py-2 sm:px-6 lg:px-8">
          <NavLink
            className="nav-link py-2 px-4 text-gray-900 font-medium"
            aria-current="page"
            to="/"
          >
            HOME
          </NavLink>

          <NavLink
            className="nav-link py-2 px-4 text-gray-900 font-medium"
            aria-current="page"
            to="/shop"
          >
            SHOP
          </NavLink>

          <div className="relative inline-block">
            <button onClick={() => setIsOpen((prev) => !prev)} className="nav-link py-2 px-4 text-gray-900 font-medium dropdown-toggle">
              CATEGORIES
            </button>

            {isOpen && 
              <ul className="dropdown-menu absolute top-full left-0 bg-white w-full z-50 py-2 px-4">
                <li className="mb-2">
                  <NavLink
                    className="nav-link text-gray-900 font-medium"
                    to="/categories"
                  >
                    All Categories
                  </NavLink>
                </li>

                {categories?.map((c) => (
                  <li key={c._id} className="mb-2">
                    <NavLink
                      className="nav-link text-gray-900 font-medium"
                      to={`/category/${c.slug}`}
                    >
                      {c.name}
                    </NavLink>
                  </li>
                ))}
              </ul>
            }
          </div>

          <div className="flex items-center">
            <Badge
              count={cart?.length >= 1 ? cart.length : 0}
              offset={[-5, 11]}
              showZero={true}
            >
              <NavLink
                className="nav-link py-2 px-4 text-gray-900 font-medium"
                aria-current="page"
                to="/cart"
              >
                CART
              </NavLink>
            </Badge>

            <Search />

            {!auth?.user ? (
              <>
                <NavLink
                  className="nav-link py-2 px-4 text-gray-900 font-medium"
                  to="/login"
                >
                  LOGIN
                </NavLink>

                <NavLink
                  className="nav-link py-2 px-4 text-gray-900 font-medium"
                  to="/register"
                >
                  REGISTER
                </NavLink>
              </>
            ) : (
              <div className="relative inline-block">
                <button onClick={() => setIsOpen((prev) => !prev)} className="nav-link py-2 px-4 text-gray-900 font-medium dropdown-toggle">
                  {auth?.user?.name?.toUpperCase()}
                </button>

                {isOpen && 
                  <ul className="dropdown-menu absolute top-full right-0 bg-white w-full z-50 py-2 px-4">
                    <li className="mb-2">
                      <NavLink
                        className="nav-link text-gray-900 font-medium"
                        to={`/dashboard/${auth?.user?.role === 1 ? "admin" : "user"
                          }`}
                      >
                        Dashboard
                      </NavLink>
                    </li>

                    <li className="mb-2">
                      <a
                        onClick={logout}
                        className="nav-link text-gray-900 font-medium"
                      >
                        Logout
                      </a>
                    </li>
                  </ul>
                }
              </div>
            )}
          </div>
        </nav>
      </div>


    </>
  );
}
*/