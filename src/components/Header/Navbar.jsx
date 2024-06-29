import { faSearch, faMessage, faBell } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  Navbar,
  NavbarContent,
  Input,
  Dropdown,
  DropdownTrigger,
  Avatar,
  DropdownMenu,
  DropdownItem,
  Link,
} from "@nextui-org/react";
import React from "react";

const NavBar = () => {
  const [search, setSearch] = React.useState("");
  return (
    <Navbar className="border-b border-solid border-black">
      <NavbarContent className="hidden sm:flex gap-4 w-1/2" justify="center">
        <div className="relative w-full">
          <Input
            placeholder="Type to search..."
            size="sm"
            className="border-gray-300 px-2 py-1 focus:outline-none"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
          <button className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 focus:outline-none">
            <FontAwesomeIcon icon={faSearch} />
          </button>
        </div>
      </NavbarContent>

      <NavbarContent
        as="div"
        justify="end"
        className="flex items-center space-x-4"
      >
        <Dropdown>
          <DropdownTrigger>
            <FontAwesomeIcon icon={faBell} className="text-gray-500" />
          </DropdownTrigger>
          <DropdownMenu aria-label="Notifications" variant="flat">
            <DropdownItem key="noti1">
              <Link className="flex flex-row" href="#">
                <div className="w-1/4 p-2">
                  <Avatar
                    isBordered
                    className="transition-transform w-3/4 h-auto"
                    color="secondary"
                    size="sm"
                    src="https://i.pravatar.cc/150?u=a042581f4e29026704d"
                  />
                </div>
                <div className="w-3/4 flex items-center">
                  <span>Noti 1</span>
                </div>
              </Link>
            </DropdownItem>
            <DropdownItem key="noti2">
              <Link className="flex flex-row" href="#">
                <div className="w-1/4 p-2">
                  <Avatar
                    isBordered
                    className="transition-transform w-3/4 h-auto"
                    color="secondary"
                    size="sm"
                    src="https://i.pravatar.cc/150?u=a042581f4e29026704d"
                  />
                </div>
                <div className="w-3/4 flex items-center">
                  <span>Noti 2</span>
                </div>
              </Link>
            </DropdownItem>
          </DropdownMenu>
        </Dropdown>
        <Dropdown>
          <DropdownTrigger>
            <FontAwesomeIcon icon={faMessage} className="text-gray-500" />
          </DropdownTrigger>
          <DropdownMenu aria-label="Messages" variant="flat">
            <DropdownItem key="mess1">
              <Link className="flex flex-row" href="#">
                <div className="w-1/4 p-2">
                  <Avatar
                    isBordered
                    className="transition-transform w-3/4 h-auto"
                    color="secondary"
                    size="sm"
                    src="https://i.pravatar.cc/150?u=a042581f4e29026704d"
                  />
                </div>
                <div className="w-3/4 flex items-center">
                  <span>Message 1</span>
                </div>
              </Link>
            </DropdownItem>
            <DropdownItem key="mess2">
              <Link className="flex flex-row" href="#">
                <div className="w-1/4 p-2">
                  <Avatar
                    isBordered
                    className="transition-transform w-3/4 h-auto"
                    color="secondary"
                    size="sm"
                    src="https://i.pravatar.cc/150?u=a042581f4e29026704d"
                  />
                </div>
                <div className="w-3/4 flex items-center">
                  <span>Message 2</span>
                </div>
              </Link>
            </DropdownItem>
          </DropdownMenu>
        </Dropdown>
        <Dropdown>
          <DropdownTrigger>
            <Avatar
              isBordered
              as="button"
              className="transition-transform"
              color="secondary"
              name="Hiệp"
              size="sm"
              src="https://i.pravatar.cc/150?u=a042581f4e29026704d"
            />
          </DropdownTrigger>
          <DropdownMenu aria-label="Profile Actions" variant="flat">
            <DropdownItem key="welcome" className="h-14 gap-2">
              <p className="font-semibold">Welcome, Hiệp</p>
            </DropdownItem>
            <DropdownItem key="profile">
              <Link href="#">Edit Profile</Link>
            </DropdownItem>
            <DropdownItem key="logout" color="danger">
              <Link href="#">Log Out</Link>
            </DropdownItem>
          </DropdownMenu>
        </Dropdown>
      </NavbarContent>
    </Navbar>
  );
};

export default NavBar;
