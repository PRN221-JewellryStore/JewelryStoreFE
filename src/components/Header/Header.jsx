import { faBars, faTimes, faSearch, faShoppingCart } from "@fortawesome/free-solid-svg-icons";
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

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = React.useState(false);
  const [isSearchOpen, setIsSearchOpen] = React.useState(false); // State for search bar

  const menuItems = [
    "Profile",
    "Dashboard",
    "Activity",
    "Analytics",
    "System",
    "Deployments",
    "My Settings",
    "Team Settings",
    "Help & Feedback",
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

      <NavbarContent className="hidden sm:flex gap-4" justify="center">
        <NavbarItem>
          <Link color="foreground" href="#">
            Home
          </Link>
        </NavbarItem>
        <NavbarItem>
          <Link href="#" aria-current="page">
            Category
          </Link>
        </NavbarItem>
        <NavbarItem>
          <Link color="foreground" href="#">
            About
          </Link>
        </NavbarItem>
      </NavbarContent>

      <NavbarContent justify="end" className="flex items-center space-x-4">
        {/* Search bar */}
        <NavbarItem>
          {isSearchOpen ? (
            <div className="relative">
              <Input
                placeholder="Type to search..."
                size="sm"
                className="border-gray-300 px-2 py-1 focus:outline-none"
                onKeyPress={(e) => {
                  if (e.key === "Enter") {
                    // Handle search logic here
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
              <FontAwesomeIcon icon={faSearch} className="text-gray-500" /> {/* Đổi màu xám cho biểu tượng tìm kiếm */}
            </button>
          )}
        </NavbarItem>

        {/* Cart */}
        <NavbarItem>
          <Link href="#">
            <FontAwesomeIcon icon={faShoppingCart} className="text-gray-500" /> {/* Đổi màu xám cho biểu tượng giỏ hàng */}
          </Link>
        </NavbarItem>

        <NavbarItem className="hidden lg:flex">
          <Link href="#">Login</Link>
        </NavbarItem>
        <NavbarItem>
          <Button as={Link} color="primary" href="#" variant="flat">
            Sign Up
          </Button>
        </NavbarItem>
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
