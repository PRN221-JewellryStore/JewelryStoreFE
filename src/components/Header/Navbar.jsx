import { faSignOut } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  Navbar,
  NavbarContent,
  Dropdown,
  DropdownTrigger,
  Avatar,
  DropdownMenu,
  DropdownItem,
} from "@nextui-org/react";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { logout } from "src/app/feature/account/AccountSlice";

const NavBar = () => {
  const accountLoggedIn = useSelector((state) => state.account.loggedIn);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  return (
    <Navbar className="border-b border-solid border-black">
      <NavbarContent
        as="div"
        justify="end"
        className="flex items-center space-x-4"
      >
        {/* <Dropdown>
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
        </Dropdown> */}
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
              <p className="font-semibold">
                Welcome, {accountLoggedIn.username}
              </p>
            </DropdownItem>
            <DropdownItem key="logout" color="danger">
              <div
                onClick={() => {
                  localStorage.removeItem("token");
                  dispatch(logout());
                  navigate("/home");
                }}
              >
                <FontAwesomeIcon icon={faSignOut} className="text-gray-500" />{" "}
                {"   "}
                Log Out
              </div>
            </DropdownItem>
          </DropdownMenu>
        </Dropdown>
      </NavbarContent>
    </Navbar>
  );
};

export default NavBar;
