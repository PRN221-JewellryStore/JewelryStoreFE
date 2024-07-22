import {
  BreadcrumbItem,
  Breadcrumbs,
  Card,
  CardBody,
  CardHeader,
  Chip,
  Select,
  SelectItem,
  Table,
  TableBody,
  TableCell,
  TableColumn,
  TableHeader,
  TableRow,
} from "@nextui-org/react";
import { useEffect, useState } from "react";
import { getAllCategories } from "src/api/categoryApi";
import NavBar from "src/components/Header/Navbar";
import Sidebar from "src/components/Sidebar/Sidebar";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faShoppingCart, faMoneyBill } from "@fortawesome/free-solid-svg-icons";
import { Bar, BarChart, CartesianGrid, Tooltip, XAxis, YAxis } from "recharts";
import {
  getAllOrderDetail,
  getRevernueByCategory,
  getTotalRevenue,
} from "src/api/reportApi";
import { getAllUsers } from "src/api/userApi";
import { getAllPromotions } from "src/api/promotionApi";
import { getAllOrders } from "src/api/orderApi";

const Dashboard = () => {
  const [categories, setCategories] = useState([]);
  const [orders, setOrders] = useState([]);
  const [orderDetail, setOrderDetail] = useState([]);
  const [users, setUsers] = useState([]);
  const [promotion, setPromotion] = useState([]);
  const [totalRevenue, setTotalRevenue] = useState(0);
  const [data, setData] = useState([{}]);
  const [categoryId, setCategoryId] = useState(0);

  useEffect(() => {
    fetchData();
    console.log(orders);
  }, []);

  const fetchData = async () => {
    try {
      setOrders([...(await getAllOrders())]);
      setOrderDetail([...(await getAllOrderDetail())]);
      const res = await getAllCategories();
      setCategories([...res]);
      setUsers([...(await getAllUsers()).value]);
      setPromotion([...(await getAllPromotions())]);
      setTotalRevenue(await getTotalRevenue());
      setData([...(await getRevernueByCategory())]);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };
  return (
    <div className="flex flex-row">
      <div className="w-1/6">
        <Sidebar />
      </div>
      <div className="w-5/6">
        <NavBar />
        <div className="w-full mt-4">
          <div className="flex flex-col flex-wrap gap-4">
            <Breadcrumbs key="solid" variant="solid" size="lg">
              <BreadcrumbItem className="text-inherit text-2xl">
                Quản lý
              </BreadcrumbItem>
              <BreadcrumbItem className="text-inherit text-2xl">
                Thống kê
              </BreadcrumbItem>
            </Breadcrumbs>
          </div>
        </div>
        <div className="w-full mt-8 p-4">
          <Card className="p-8 relative overflow-visible">
            <CardHeader className="p-0 flex flex-row justify-center">
              <div className="rounded-md bg-sky-500 w-3/4 p-4 mt-[-4rem]">
                <p className="text-center pl-4 text-4xl text-bold">Thống kê</p>
              </div>
            </CardHeader>
            <CardBody>
              <Select
                required
                label="Category"
                defaultSelectedKeys={[String(categoryId)]}
                onChange={(e) => setCategoryId(e.target.value)}
                className="w-1/4"
              >
                <SelectItem key={0}>Tất cả</SelectItem>
                {categories.map((category) => (
                  <SelectItem key={category.id}>{category.name}</SelectItem>
                ))}
              </Select>
              <div className="gap-2 grid grid-cols-2 sm:grid-cols-2 w-full mt-8">
                <div className="flex justify-center">
                  <Card className="xl:max-w-lg bg-primary rounded-xl shadow-md px-3 w-3/4">
                    <CardBody className="py-5 overflow-hidden flex flex-row justify-center alaign-center w-full">
                      <div className="w-1/2 h-full flex gap-3 justify-center alaign-center">
                        <FontAwesomeIcon
                          icon={faShoppingCart}
                          className="text-white-500"
                          size="6x"
                        />
                      </div>
                      <div className="w-1/2 flex flex-col gap-2.5 py-2 items-center">
                        <span className="text-white text-xl">
                          {categoryId == 0
                            ? "Tổng số đơn hàng:"
                            : "Tổng lượt bán:"}
                        </span>
                        <span className="text-white text-4xl font-semibold">
                          {categoryId == 0
                            ? orders.length
                            : orderDetail?.filter(
                                (detail) =>
                                  detail.product.categoryID == categoryId
                              ).length}
                        </span>
                      </div>
                    </CardBody>
                  </Card>
                </div>
                <div className="flex justify-center">
                  <Card className="xl:max-w-lg bg-success rounded-xl shadow-md px-3 w-3/4">
                    <CardBody className="py-5 overflow-hidden flex flex-row justify-center alaign-center w-full">
                      <div className="w-1/2 h-full flex gap-3 justify-center alaign-center">
                        <FontAwesomeIcon
                          icon={faMoneyBill}
                          className="text-white-500"
                          size="6x"
                        />
                      </div>
                      <div className="w-1/2 flex flex-col gap-2.5 py-2 items-center">
                        <span className="text-white text-xl">
                          {categoryId == 0
                            ? "Tổng lợi nhuận:"
                            : "Tổng thành tiền"}
                        </span>
                        <span className="text-white text-2xl font-semibold">
                          {categoryId == 0
                            ? totalRevenue.toLocaleString("en-US", {
                                style: "decimal",
                                minimumFractionDigits: 0,
                                maximumFractionDigits: 0,
                              })
                            : orderDetail?.filter(
                                (detail) =>
                                  detail.product.categoryID == categoryId
                              ).length == 0
                            ? 0
                            : data
                                .filter(
                                  (reve) => reve.categoryId == categoryId
                                )[0]
                                ?.revenue.toLocaleString("en-US", {
                                  style: "decimal",
                                  minimumFractionDigits: 0,
                                  maximumFractionDigits: 0,
                                })}{" "}
                          VNĐ
                        </span>
                      </div>
                    </CardBody>
                  </Card>
                </div>
              </div>

              {/* Chart */}
              {categoryId == 0 && (
                <div className="h-1/2 flex flex-col gap-2 mt-8">
                  <h3 className="text-3xl font-semibold">
                    Doanh thu theo Category
                  </h3>
                  <div className="w-full bg-default-50 shadow-lg rounded-2xl p-6 ">
                    <div className="w-full z-20">
                      <div id="chart" className="flex justify-center">
                        <BarChart width={1000} height={500} data={data}>
                          <CartesianGrid strokeDasharray="5 5" />
                          <XAxis dataKey="name" />
                          <YAxis
                            domain={[
                              0,
                              data
                                .map((item) => item.revenue)
                                .sort((a, b) => b - a)[0] * 1.1,
                            ]}
                          />
                          <Tooltip content label />
                          <Bar
                            dataKey="revenue"
                            fill="#736ed7"
                            barSize={100}
                            radius={10}
                          />
                        </BarChart>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              <div className="flex flex-col justify-center w-full py-5 px-4 lg:px-0 w-full mx-auto gap-3">
                <div className="flex  flex-wrap justify-between">
                  <h3 className="text-center text-3xl font-semibold">
                    Danh sách đơn hàng
                  </h3>
                </div>
                {categoryId == 0 ? (
                  <Table aria-label="Orders Table">
                    <TableHeader>
                      <TableColumn className="text-2xl">Khách hàng</TableColumn>
                      <TableColumn className="text-2xl">
                        CT Khuyến mãi
                      </TableColumn>
                      <TableColumn className="text-2xl">Tổng tiền</TableColumn>
                      <TableColumn className="text-2xl">
                        Tổng thanh toán
                      </TableColumn>
                      <TableColumn className="text-2xl">Trạng thái</TableColumn>
                    </TableHeader>
                    {orders?.length == 0 ? (
                      <TableBody emptyContent={"No data to display."}>
                        {[]}
                      </TableBody>
                    ) : (
                      <TableBody>
                        {orders.map((order) => (
                          <TableRow key={order.id}>
                            <TableCell className="text-xl">
                              {order.user.fullName}
                            </TableCell>
                            <TableCell className="text-xl">
                              {order.promotion.description}
                            </TableCell>
                            <TableCell className="text-xl">
                              {order.primaryPrice.toLocaleString("en-US", {
                                style: "decimal",
                                minimumFractionDigits: 0,
                                maximumFractionDigits: 0,
                              })}{" "}
                              VNĐ
                            </TableCell>
                            <TableCell className="text-xl">
                              {order.total.toLocaleString("en-US", {
                                style: "decimal",
                                minimumFractionDigits: 0,
                                maximumFractionDigits: 0,
                              })}{" "}
                              VNĐ
                            </TableCell>
                            <TableCell className="text-xl">
                              <Chip
                                color={
                                  order.status == "Done" ? "success" : "danger"
                                }
                                size="lg"
                              >
                                {order.status}
                              </Chip>
                            </TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    )}
                  </Table>
                ) : (
                  <Table aria-label="Orders Table">
                    <TableHeader>
                      <TableColumn className="text-2xl">Khách hàng</TableColumn>
                      <TableColumn className="text-2xl">
                        CT Khuyến mãi
                      </TableColumn>
                      <TableColumn className="text-2xl">Sản phẩm</TableColumn>
                      <TableColumn className="text-2xl">Đơn giá</TableColumn>
                      <TableColumn className="text-2xl">Số lượng</TableColumn>
                      <TableColumn className="text-2xl">Thành tiền</TableColumn>
                    </TableHeader>
                    {orderDetail?.filter(
                      (detail) => detail.product.categoryID == categoryId
                    ).length == 0 ? (
                      <TableBody emptyContent={"No data to display."}>
                        {[]}
                      </TableBody>
                    ) : (
                      <TableBody>
                        {orderDetail
                          .filter(
                            (detail) => detail.product.categoryID == categoryId
                          )
                          .map((order) => (
                            <TableRow key={order.id}>
                              <TableCell className="text-xl">
                                {
                                  users.filter(
                                    (user) => user.id == order.order.userID
                                  )[0]?.fullName
                                }
                              </TableCell>
                              <TableCell className="text-xl">
                                {
                                  promotion.filter(
                                    (pro) => pro.id == order.order.promotionID
                                  )[0]?.description
                                }
                              </TableCell>
                              <TableCell className="text-xl">
                                {order.product.name}
                              </TableCell>
                              <TableCell className="text-xl">
                                {order.product.cost.toLocaleString("en-US", {
                                  style: "decimal",
                                  minimumFractionDigits: 0,
                                  maximumFractionDigits: 0,
                                })}{" "}
                                VNĐ
                              </TableCell>
                              <TableCell className="text-xl">
                                {order.quantity}
                              </TableCell>
                              <TableCell className="text-xl">
                                {order.productCost.toLocaleString("en-US", {
                                  style: "decimal",
                                  minimumFractionDigits: 0,
                                  maximumFractionDigits: 0,
                                })}{" "}
                                VNĐ
                              </TableCell>
                            </TableRow>
                          ))}
                      </TableBody>
                    )}
                  </Table>
                )}
              </div>
            </CardBody>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
