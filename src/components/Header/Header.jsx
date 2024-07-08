import {
  faTimes,
  faSearch,
  faShoppingCart,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  Button,
  Link,
  Navbar,
  NavbarBrand,
  NavbarContent,
  NavbarItem,
  NavbarMenu,
  NavbarMenuItem,
  NavbarMenuToggle,
  Input,
} from "@nextui-org/react";
import React from "react";
import { useSelector } from "react-redux";
import { Avatar } from "../Avatar/Avatar";

export const Header = () => {
  const accountLoggedIn = useSelector((state) => state.account.loggedIn);
  const [isMenuOpen, setIsMenuOpen] = React.useState(false);
  const [isSearchOpen, setIsSearchOpen] = React.useState(false);

  const menuItems = [
    "Profile",
    "Dashboard",
    "My Settings",
    "Log Out",
  ];

  return (
    <Navbar onMenuOpenChange={setIsMenuOpen} maxWidth="2xl">
      <NavbarContent>
        <NavbarMenuToggle
          aria-label={isMenuOpen ? "Close menu" : "Open menu"}
          className="sm:hidden"
        />
        <NavbarBrand>
          <p className="font-bold text-inherit text-2xl">Diamond Shop</p>
        </NavbarBrand>
      </NavbarContent>

      <NavbarContent className="hidden sm:flex gap-4 justify-center">
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
              window.location.pathname === "/diamond" ? "text-primary" : ""
            }`}
            href="/diamond"
            aria-current={
              window.location.pathname === "/diamond" ? "page" : undefined
            }
          >
            Diamond
          </Link>
        </NavbarItem>
        <NavbarItem>
          <Link
            className={`text-gray-500 hover:text-primary focus:text-primary ${
              window.location.pathname === "/about" ? "text-primary" : ""
            }`}
            href="/about"
            aria-current={
              window.location.pathname === "/about" ? "page" : undefined
            }
          >
            About
          </Link>
        </NavbarItem>
      </NavbarContent>

      <NavbarContent justify="end" className="flex items-center space-x-4">
        <NavbarItem>
          {isSearchOpen ? (
            <div className="relative">
              <Input
                placeholder="Type to search..."
                size="sm"
                className="border-gray-300 px-2 py-1 focus:outline-none"
                onKeyPress={(e) => {
                  if (e.key === "Enter") {
                    console.log("Searching for:", e.target.value);
                  }
                }}
              />
              <button
                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 focus:outline-none"
                onClick={() => setIsSearchOpen(false)}
              >
                <FontAwesomeIcon icon={faTimes} />
              </button>
            </div>
          ) : (
            <button
              className="text-gray-500 focus:outline-none"
              onClick={() => setIsSearchOpen(true)}
            >
              <FontAwesomeIcon icon={faSearch} className="text-gray-500" />
            </button>
          )}
        </NavbarItem>

        <NavbarItem>
          <Link href="#">
            <FontAwesomeIcon icon={faShoppingCart} className="text-gray-500" />
          </Link>
        </NavbarItem>
        {accountLoggedIn.username ? (
          <Avatar
            imageURL="/src/assets/image/client.jpg"
            name={accountLoggedIn.username}
          />
        ) : (
          <>
            <NavbarItem className="hidden lg:flex">
              <Link href="/login">Login</Link>
            </NavbarItem>
            <NavbarItem>
              <Button as={Link} color="primary" href="/register" variant="flat">
                Sign Up
              </Button>
            </NavbarItem>
          </>
        )}
      </NavbarContent>

      <NavbarMenu>
        {menuItems.map((item, index) => (
          <NavbarMenuItem key={`${item}-${index}`}>
            <Link
              color={
                index === 2
                  ? "primary"
                  : index === menuItems.length - 1
                  ? "danger"
                  : "foreground"
              }
              className="w-full"
              href="#"
              size="lg"
            >
              {item}
            </Link>
          </NavbarMenuItem>
        ))}
      </NavbarMenu>
    </Navbar>
  );
};

export default Header;
