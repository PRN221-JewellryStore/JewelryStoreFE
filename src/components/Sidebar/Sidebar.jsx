import { Link } from "@nextui-org/react";
import React from "react";
import { faArrowUp, faArrowDown } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
const Sidebar = () => {
  const [isExpand, setIsExpand] = React.useState(false);
  return (
    <nav
      className="bg-sky-300 h-[calc(100vh-40px)] rounded-lg py-8 m-5 fixed"
      style={{ minWidth: "340px" }}
    >
      <div className="flex justify-content-center">
        <p className="font-bold text-inherit text-2xl w-full text-center">
          Diamond Shop
        </p>
      </div>
      <hr className="horizontal light mt-0 mb-2" />
      <ul className="list-none mt-6">
        <li className="w-full">
          <Link className="menu-title w-full" href="/admin/dashboard">
            <div className="h-16 w-full flex items-center pl-8 text-inherit text-2xl rounded-lg">
              <b className="text-black">Dashboard</b>
            </div>
          </Link>
        </li>
        <li className="w-full" onClick={() => setIsExpand(!isExpand)}>
          <div className="menu-title w-full ">
            <div className="h-16 w-full flex items-center pl-8 text-inherit text-2xl rounded-lg">
              <b className="text-black">
                Management{" "}
                <FontAwesomeIcon
                  icon={isExpand ? faArrowUp : faArrowDown}
                  className="text-white-500"
                />
              </b>
            </div>
          </div>
        </li>
        {isExpand && (
          <>
            <li className="w-full">
              <Link className="menu-title w-full" href="/admin/user-manage">
                <div className="h-16 w-full flex items-center pl-8 text-inherit text-2xl rounded-lg bg-black">
                  <b className="text-white">User Management</b>
                </div>
              </Link>
            </li>
            <li className="w-full">
              <Link className="menu-title w-full" href="/admin/jewelry-manage">
                <div className="h-16 w-full flex items-center pl-8 text-inherit text-2xl rounded-lg">
                  <b className="text-black">Jewelry Management</b>
                </div>
              </Link>
            </li>
          </>
        )}
      </ul>
    </nav>
  );
};

export default Sidebar;
