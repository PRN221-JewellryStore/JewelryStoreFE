import {
  BreadcrumbItem,
  Breadcrumbs,
  Button,
  Card,
  CardBody,
  CardFooter,
  CardHeader,
  Chip,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
  Pagination,
  Table,
  TableBody,
  TableCell,
  TableColumn,
  TableHeader,
  TableRow,
} from "@nextui-org/react";
import { useEffect, useState } from "react";
import { getAllOrders } from "src/api/orderApi";
import NavBar from "src/components/Header/Navbar";
import Sidebar from "src/components/Sidebar/Sidebar";

const ViewOrder = () => {
  const [page, setPage] = useState(1);
  const [openDetail, setOpenDetail] = useState(false);
  const [orders, setOrders] = useState([]);
  const [orderDetail, setOrderDetail] = useState([]);
  const [user, setUser] = useState({});
  const [promotion, setPromotion] = useState("");
  const [status, setStatus] = useState("");
  const [primaryPrice, setPrimaryPrice] = useState(0);
  const [total, setTotal] = useState(0);

  useEffect(() => {
    fetchAllOrder();
  }, []);

  const fetchAllOrder = async () => {
    try {
      const res = await getAllOrders();
      setOrders([...res]);
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
                Manage
              </BreadcrumbItem>
              <BreadcrumbItem className="text-inherit text-2xl">
                Orders
              </BreadcrumbItem>
            </Breadcrumbs>
          </div>
        </div>
        <div className="w-full mt-8 p-4">
          <Card className="p-8 relative overflow-visible">
            <CardHeader className="p-0 flex flex-row justify-center">
              <div className="rounded-md bg-sky-500 w-3/4 p-4 mt-[-4rem]">
                <p className="text-center pl-4 text-4xl text-bold">Đơn hàng</p>
              </div>
            </CardHeader>
            <CardBody>
              <div className="gap-2 grid grid-cols-2 sm:grid-cols-5">
                {orders.map((order) => (
                  <Card
                    shadow="sm"
                    isPressable
                    className="rounded-lg border-1 border-solid border-black"
                    onPress={() => {
                      setOpenDetail(true);
                      setOrderDetail([...order.orderDetails]);
                      setUser(order.user);
                      setPromotion(order.promotion.description);
                      setStatus(order.status);
                      setPrimaryPrice(order.primaryPrice);
                      setTotal(order.total);
                    }}
                    key={order.id}
                  >
                    <CardBody className="overflow-visible p-0">
                      <div className="rounded-lg w-full object-cover h-[200px]">
                        <div className="w-full flex flex-row p-2">
                          <b className="text-xl w-1/2">Khách hàng:</b>
                          <p className="w-1/2 text-default-500 text-xl">
                            {order.user.fullName}
                          </p>
                        </div>
                        <div className="w-full flex flex-row p-2">
                          <b className="text-xl w-1/2">CT Khuyến mãi:</b>
                          <p className="w-1/2 text-default-500 text-xl">
                            {order.promotion.description}
                          </p>
                        </div>
                        <div className="w-full flex flex-row p-2">
                          <b className="text-xl w-1/2">Tổng tiền:</b>
                          <p className="w-1/2 text-default-500 text-xl">
                            {order.primaryPrice.toLocaleString("en-US", {
                              style: "decimal",
                              minimumFractionDigits: 0,
                              maximumFractionDigits: 0,
                            })}{" "}
                            VNĐ
                          </p>
                        </div>
                        <div className="w-full flex flex-row p-2">
                          <b className="text-xl w-1/2">Tổng thanh toán:</b>
                          <p className="w-1/2 text-default-500 text-xl">
                            {order.total.toLocaleString("en-US", {
                              style: "decimal",
                              minimumFractionDigits: 0,
                              maximumFractionDigits: 0,
                            })}{" "}
                            VNĐ
                          </p>
                        </div>
                      </div>
                      <hr className="horizontal strong mt-0 mb-2" />
                    </CardBody>
                    <CardFooter className="text-small justify-center">
                      <Chip
                        color={order.status == "Done" ? "success" : "danger"}
                        size="lg"
                      >
                        {order.status}
                      </Chip>
                    </CardFooter>
                  </Card>
                ))}
              </div>
            </CardBody>
            <CardFooter>
              <Pagination
                showControls
                total={3}
                initialPage={page}
                onChange={(newPage) => setPage(newPage)}
              />
            </CardFooter>
          </Card>
          <Modal
            size="4xl"
            isOpen={openDetail}
            onClose={() => {
              setOpenDetail(false);
              setOrderDetail([]);
              setUser({});
              setPromotion("");
              setStatus("");
              setPrimaryPrice(0);
              setTotal(0);
            }}
          >
            <ModalContent>
              <ModalHeader className="flex flex-col gap-1">
                Chi tiết
              </ModalHeader>
              <ModalBody>
                <div className="w-full text-xl flex">
                  <p className="w-1/3">
                    <span className="text-xl font-bold">Người mua:</span>{" "}
                    {user.fullName}
                  </p>
                  <p className="w-1/3">
                    <span className="text-xl font-bold">Địa chỉ:</span>{" "}
                    {user.address}
                  </p>
                  <p className="w-1/3">
                    <span className="text-xl font-bold">SĐT:</span>{" "}
                    {user.phoneNumber}
                  </p>
                </div>
                <p className="w-full text-xl">
                  <span className="text-xl font-bold">CT Khuyến mãi:</span>{" "}
                  {promotion}
                </p>
                <div className="w-full text-xl flex">
                  <p className="w-1/2 text-xl">
                    <span className="text-xl font-bold">Tổng tiền:</span>{" "}
                    {primaryPrice.toLocaleString("en-US", {
                      style: "decimal",
                      minimumFractionDigits: 0,
                      maximumFractionDigits: 0,
                    })}{" "}
                    VNĐ
                  </p>
                  <p className="w-1/2 text-xl">
                    <span className="text-xl font-bold">Tổng thanh toán:</span>{" "}
                    {total.toLocaleString("en-US", {
                      style: "decimal",
                      minimumFractionDigits: 0,
                      maximumFractionDigits: 0,
                    })}{" "}
                    VNĐ
                  </p>
                </div>
                <p className="w-full text-xl">
                  <span className="text-xl font-bold">Trạng thái:</span>{" "}
                  {status}
                </p>
                <p className="w-full text-2xl font-bold text-center">
                  Chi tiết đơn hàng
                </p>
                <Table aria-label="Orders Table">
                  <TableHeader>
                    <TableColumn className="text-2xl">Tên sản phẩm</TableColumn>
                    <TableColumn className="text-2xl">Đơn giá</TableColumn>
                    <TableColumn className="text-2xl">Số lượng</TableColumn>
                    <TableColumn className="text-2xl">Thành tiền</TableColumn>
                  </TableHeader>
                  <TableBody>
                    {orderDetail.map((detail) => (
                      <TableRow key={detail.id}>
                        <TableCell className="text-xl">
                          {detail.product.name}
                        </TableCell>
                        <TableCell className="text-xl">
                          {detail.product.cost.toLocaleString("en-US", {
                            style: "decimal",
                            minimumFractionDigits: 0,
                            maximumFractionDigits: 0,
                          })}{" "}
                          VNĐ
                        </TableCell>
                        <TableCell className="text-xl">
                          {detail.quantity}
                        </TableCell>
                        <TableCell className="text-xl">
                          {detail.productCost.toLocaleString("en-US", {
                            style: "decimal",
                            minimumFractionDigits: 0,
                            maximumFractionDigits: 0,
                          })}{" "}
                          VNĐ
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </ModalBody>
              <ModalFooter>
                <Button
                  color="success"
                  onPress={() => {
                    setOpenDetail(false);
                    setOrderDetail([]);
                    setUser({});
                    setPromotion("");
                    setStatus("");
                    setPrimaryPrice(0);
                    setTotal(0);
                  }}
                >
                  Đóng
                </Button>
              </ModalFooter>
            </ModalContent>
          </Modal>
        </div>
      </div>
    </div>
  );
};

export default ViewOrder;
