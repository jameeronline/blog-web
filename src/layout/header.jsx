import { Link, Navigate, NavLink } from "react-router";
import { useEffect, useState } from "react";

import { useNavigate } from "react-router";

const menuItems = [
  {
    name: "Blog",
    slug: "blog",
  },
  {
    name: "Projects",
    slug: "projects",
  },
  {
    name: "About",
    slug: "about",
  },
  {
    name: "Newsletter",
    slug: "newsletter",
  },
];

const Header = () => {
  const navigate = useNavigate();
  const [isToggleOpen, setIsToggleOpen] = useState(false);

  return (
    <>
      <header className="">
        <div className="w-full xl:container mx-auto px-6">
          <div className="flex justify-between items-center py-4 relative">
            {/* Logo */}
            <Link
              to="/"
              className="font-bold text-2xl xl:text-4xl inline-flex flex-nowrap items-center gap-2"
            >
              <span className="whitespace-nowrap">The Blog.</span>
            </Link>

            {/* Menu */}
            <nav
              className={`absolute top-full bg-gray-50 p-4 -left-6 -right-6 lg:w-auto lg:p-0 lg:bg-transparent
                 lg:relative lg:visible ${
                   isToggleOpen
                     ? "visible opacity-100 backdrop-blur-sm"
                     : "invisible opacity-0"
                 }}`}
            >
              <ul className="flex gap-2 text-typography-primary flex-col lg:flex-row lg:gap-4">
                {menuItems.map((item, index) => (
                  <li key={index}>
                    <NavLink
                      to={item.slug}
                      onClick={() => setIsToggleOpen(false)}
                      className={({ isActive, isPending }) =>
                        `flex p-2 hover:rounded-sm hover:text-gray-500 hover:bg-secondary-100/50 lg:hover:bg-transparent transition-colors duration-200 ${
                          isPending ? "pending" : ""
                        } ${
                          isActive
                            ? "text-secondary-600 pointer-events-none"
                            : ""
                        }`
                      }
                    >
                      {item.name}
                    </NavLink>
                  </li>
                ))}
              </ul>
            </nav>

            <div className="flex gap-2 items-center lg:hidden">
              {/* Mobile Trigger */}
              <button
                className={`relative order-10 block h-10 w-10 self-center 
                  ${
                    isToggleOpen
                      ? "visible opacity-100 [&_span:nth-child(1)]:w-6 [&_span:nth-child(1)]:translate-y-0 [&_span:nth-child(1)]:rotate-45 [&_span:nth-child(2)]:-rotate-45 [&_span:nth-child(3)]:w-0 "
                      : ""
                  }`}
                onClick={() => setIsToggleOpen(!isToggleOpen)}
                aria-expanded={isToggleOpen ? "true" : "false"}
                aria-label="Toggle navigation"
              >
                <div className="absolute w-6 transform -translate-x-1/2 -translate-y-1/2 top-1/2 left-1/2">
                  <span
                    aria-hidden="true"
                    className="absolute block h-0.5 w-6 -translate-y-2 transform rounded-full bg-secondary-600 transition-all duration-300"
                  ></span>
                  <span
                    aria-hidden="true"
                    className="absolute block h-0.5 w-6 transform rounded-full bg-secondary-600 transition duration-300"
                  ></span>
                  <span
                    aria-hidden="true"
                    className="absolute block h-0.5 w-6 origin-top-left translate-y-2 transform rounded-full bg-secondary-600 transition-all duration-300"
                  ></span>
                </div>
              </button>
            </div>
          </div>
        </div>
      </header>
    </>
  );
};

export default Header;