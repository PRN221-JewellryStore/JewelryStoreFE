import { Link } from "@nextui-org/react";
import { useLocation } from "react-router-dom";
import {
  faChartColumn,
  faUser,
  faRing,
  faList,
  faTicket,
  faShoppingCart,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const Sidebar = () => {
  const location = useLocation();
  const pathname = location.pathname;
  return (
    <nav
      className="bg-sky-300 h-[calc(100vh-40px)] rounded-lg px-8 py-8 m-5 fixed"
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
          <Link className="menu-title w-full" href="/admin">
            <div
              className={`h-16 w-full flex items-center pl-4 text-inherit text-2xl rounded-lg ${
                pathname === "/admin" ? "bg-black" : ""
              }`}
            >
              <b
                className={pathname === "/admin" ? "text-white" : "text-black"}
              >
                <FontAwesomeIcon
                  icon={faChartColumn}
                  className="text-white-500"
                />{" "}
                Thống kê
              </b>
            </div>
          </Link>
        </li>
        <li className="w-full">
          <Link className="menu-title w-full" href="/admin/user-manage">
            <div
              className={`h-16 w-full flex items-center pl-4 text-inherit text-2xl rounded-lg ${
                pathname === "/admin/user-manage" ? "bg-black" : ""
              }`}
            >
              <b
                className={
                  pathname === "/admin/user-manage"
                    ? "text-white"
                    : "text-black"
                }
              >
                <FontAwesomeIcon icon={faUser} className="text-white-500" />{" "}
                Người dùng
              </b>
            </div>
          </Link>
        </li>
        <li className="w-full">
          <Link className="menu-title w-full" href="/admin/jewelry-manage">
            <div
              className={`h-16 w-full flex items-center pl-4 text-inherit text-2xl rounded-lg ${
                pathname === "/admin/jewelry-manage" ? "bg-black" : ""
              }`}
            >
              <b
                className={
                  pathname === "/admin/jewelry-manage"
                    ? "text-white"
                    : "text-black"
                }
              >
                <FontAwesomeIcon icon={faRing} className="text-white-500" />{" "}
                Trang sức
              </b>
            </div>
          </Link>
        </li>
        <li className="w-full">
          <Link className="menu-title w-full" href="/admin/category-manage">
            <div
              className={`h-16 w-full flex items-center pl-4 text-inherit text-2xl rounded-lg ${
                pathname === "/admin/category-manage" ? "bg-black" : ""
              }`}
            >
              <b
                className={
                  pathname === "/admin/category-manage"
                    ? "text-white"
                    : "text-black"
                }
              >
                <FontAwesomeIcon icon={faList} className="text-white-500" />{" "}
                Danh mục
              </b>
            </div>
          </Link>
        </li>
        <li className="w-full">
          <Link className="menu-title w-full" href="/admin/promotion-manage">
            <div
              className={`h-16 w-full flex items-center pl-4 text-inherit text-2xl rounded-lg ${
                pathname === "/admin/promotion-manage" ? "bg-black" : ""
              }`}
            >
              <b
                className={
                  pathname === "/admin/promotion-manage"
                    ? "text-white"
                    : "text-black"
                }
              >
                <FontAwesomeIcon icon={faTicket} className="text-white-500" />{" "}
                Ưu đãi
              </b>
            </div>
          </Link>
        </li>
        <li className="w-full">
          <Link className="menu-title w-full" href="/admin/view-order">
            <div
              className={`h-16 w-full flex items-center pl-4 text-inherit text-2xl rounded-lg ${
                pathname === "/admin/view-order" ? "bg-black" : ""
              }`}
            >
              <b
                className={
                  pathname === "/admin/view-order" ? "text-white" : "text-black"
                }
              >
                <FontAwesomeIcon
                  icon={faShoppingCart}
                  className="text-white-500"
                />{" "}
                Đơn hàng
              </b>
            </div>
          </Link>
        </li>
      </ul>
    </nav>
  );
};

export default Sidebar;
