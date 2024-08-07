import {
  faShoppingCart
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  Button,
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownTrigger,
  Link,
  Navbar,
  NavbarBrand,
  NavbarContent,
  NavbarItem
} from "@nextui-org/react";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { logout } from "src/app/feature/account/AccountSlice";
import { Avatar } from "../Avatar/Avatar";

export const Header = () => {
  const accountLoggedIn = useSelector((state) => state.account.loggedIn);
  const [isSearchOpen, setIsSearchOpen] = React.useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const carts = useSelector((state) => state.cart.carts);

  const [isDropdownOpen, setIsDropdownOpen] = React.useState(false);

  const gotoCartPage = () => {
    navigate("/cart");
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    dispatch(logout());
    navigate("/home");
  };

  const menuItems = [
    { key: "account", label: "Account" },
    { key: "mypurchase", label: "My Purchase" },
    { key: "logout", label: "Log Out" },
  ];

  const handleMouseEnter = () => {
    setIsDropdownOpen(true);
  };

  const handleMouseLeave = () => {
    setIsDropdownOpen(false);
  };

  const handleMenuItemClick = (key) => {
    if (key === "logout") {
      handleLogout();
    } else if (key === "mypurchase") {
      navigate("/user/purchase");
    } else if (key === "account") {
      navigate("/user/account/profile");
    }
  };

  useEffect(() => {
    const script = document.createElement("script");
    script.type = "text/javascript";
    script.id = "hs-script-loader";
    script.async = true;
    script.defer = true;
    script.src = "//js-na1.hs-scripts.com/46797835.js";
    document.head.appendChild(script);

    return () => {
      document.head.removeChild(script);
    };
  }, []);

  return (
    <Navbar maxWidth="full">
      <NavbarContent className="flex justify-between items-center space-x-72">
        <NavbarBrand>
          <p className="font-bold text-inherit text-2xl">Diamond Shop</p>
        </NavbarBrand>

        <NavbarContent className="hidden lg:flex gap-4 justify-center">
          <NavbarItem>
            <Link
              className={`text-gray-500 hover:text-primary focus:text-primary ${
                window.location.pathname === "/home" ? "text-primary" : ""
              }`}
              href="/home"
            >
              Home
            </Link>
          </NavbarItem>
          <NavbarItem>
            <Link
              className={`text-gray-500 hover:text-primary focus:text-primary ${
                window.location.pathname === "/shop-category" ? "text-primary" : ""
              }`}
              href="/shop-category"
            >
              Category
            </Link>
          </NavbarItem>
          <NavbarItem>
            <Link
              className={`text-gray-500 hover:text-primary focus:text-primary ${
                window.location.pathname === "/about" ? "text-primary" : ""
              }`}
              href="/about"
            >
              About
            </Link>
          </NavbarItem>
        </NavbarContent>

        <NavbarContent className="flex items-center space-x-4">
          <NavbarItem>
            <FontAwesomeIcon
              icon={faShoppingCart}
              className="text-gray-500"
              onClick={gotoCartPage}
            />{" "}
            {Object.keys(carts).length}
          </NavbarItem>

          {accountLoggedIn.username ? (
            <div
              className="relative"
              onMouseEnter={handleMouseEnter}
              onMouseLeave={handleMouseLeave}
            >
              <Avatar
                imageURL="/src/assets/image/client.jpg"
                name={accountLoggedIn.username}
                className="cursor-pointer m"
              />

              {isDropdownOpen && (
                <Dropdown placement="bottom-end">
                  <DropdownTrigger>
                    <div className="absolute top-full right-0 z-10">
                      <div className="bg-white shadow-lg border border-gray-200 w-48">
                        <DropdownMenu aria-label="User menu" variant="flat">
                          {menuItems.map((item) => (
                            <DropdownItem
                              key={item.key}
                              className="w-full"
                              color={
                                item.key === "logout" ? "danger" : "default"
                              }
                              onClick={() => handleMenuItemClick(item.key)}
                            >
                              {item.label}
                            </DropdownItem>
                          ))}
                        </DropdownMenu>
                      </div>
                    </div>
                  </DropdownTrigger>
                </Dropdown>
              )}
            </div>
          ) : (
            <>
              <NavbarItem className="hidden lg:flex">
                <Link href="/login">Login</Link>
              </NavbarItem>
              <NavbarItem>
                <Button
                  as={Link}
                  color="primary"
                  href="/register"
                  variant="flat"
                >
                  Sign Up
                </Button>
              </NavbarItem>
            </>
          )}
        </NavbarContent>
      </NavbarContent>
    </Navbar>
  );
};
