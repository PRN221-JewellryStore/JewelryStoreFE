import { faEdit, faRemove } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  BreadcrumbItem,
  Breadcrumbs,
  Button,
  Card,
  CardBody,
  CardFooter,
  CardHeader,
  Chip,
  CircularProgress,
  Input,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
  Pagination,
  Select,
  SelectItem,
  Table,
  TableBody,
  TableCell,
  TableColumn,
  TableHeader,
  TableRow,
  useScrollShadow,
} from "@nextui-org/react";
import { useEffect, useState } from "react";
import { deleteUser, getAllUsers, updateUser } from "src/api/userApi";
import NavBar from "src/components/Header/Navbar";
import Sidebar from "src/components/Sidebar/Sidebar";

const UserManage = () => {
  const [users, setUsers] = useState([]);

  const [isOpen, setIsOpen] = useState(false);
  const [selectedUser, setSelectedUser] = useState("");
  const [userName, setUserName] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [fullName, setFullName] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");
  const [point, setPoint] = useState(0);
  const [roleID, setRoleID] = useState(0);
  const [mess, setMess] = useState("");
  const [isConfirm, setIsConfirm] = useState(false);
  const [page, setPage] = useState(1);
  const [search, setSearch] = useState("");

  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    setIsLoading(true);
    try {
      const response = await getAllUsers();
      setUsers([...response.value]);
      setIsLoading(false);
    } catch (error) {
      console.error("Error fetching data:", error);
      setIsLoading(false);
    }
  };

  const modalOpen = async (user) => {
    setIsOpen(true);
    setSelectedUser(user.id);
    setUserName(user.username);
    setPassword("");
    setFullName(user.fullName);
    setEmail(user.email);
    setPhone(user.phoneNumber);
    setAddress(user.address);
    setPoint(user.point);
    setRoleID(user.roleID);
  };

  const modalClose = () => {
    setIsOpen(false);
    setSelectedUser("");
    setUserName("");
    setPassword("");
    setFullName("");
    setEmail("");
    setPhone("");
    setAddress("");
    setPoint(0);
    setRoleID(0);
  };

  const handleUpdateUser = async () => {
    setIsLoading(true);
    try {
      await updateUser(
        selectedUser,
        userName,
        password,
        fullName,
        email,
        phone,
        address,
        point,
        Number(roleID)
      );
      setMess("Cập nhật thành công!!");
      modalClose();
      fetchData();
      setIsLoading(false);
    } catch (error) {
      console.error("Lỗi:", error);
      setIsLoading(false);
    }
  };

  const handleDeleteUser = async () => {
    setIsLoading(true);
    try {
      await deleteUser(selectedUser);
      setMess("Xóa thành công !!");
      setSelectedUser("");
      setIsConfirm(false);
      fetchData();
      setIsLoading(false);
    } catch (error) {
      console.error("Lỗi:", error);
      setIsConfirm(false);
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
                Người dùng
              </BreadcrumbItem>
            </Breadcrumbs>
          </div>
        </div>
        <div className="w-full mt-8 p-4">
          <Card className="p-8 relative overflow-visible">
            <CardHeader className="p-0 flex flex-row justify-center">
              <div className="rounded-md bg-sky-500 w-3/4 p-4 mt-[-4rem]">
                <p className="text-center pl-4 text-4xl text-bold">
                  Quản lý người dùng
                </p>
              </div>
            </CardHeader>
            <CardBody>
              <Input
                type="text"
                placeholder="Tìm kiếm bằng tên người dùng ..."
                className="p-4 w-1/4"
                isClearable
                onClear={() => setSearch("")}
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />
              <Table aria-label="Users Table">
                <TableHeader>
                  <TableColumn className="text-2xl">Họ tên</TableColumn>
                  <TableColumn className="text-2xl">Email</TableColumn>
                  <TableColumn className="text-2xl">SĐT</TableColumn>
                  <TableColumn className="text-2xl">Địa chỉ</TableColumn>
                  <TableColumn className="text-2xl">Vai trò</TableColumn>
                  <TableColumn></TableColumn>
                </TableHeader>
                {users.length == 0 ? (
                  <TableBody emptyContent={"No data to display."}>
                    {[]}
                  </TableBody>
                ) : (
                  <TableBody>
                    {users
                      .filter((user) =>
                        user.fullName
                          .toLowerCase()
                          .includes(search.toLowerCase())
                      )
                      .slice((page - 1) * 8, page * 8)
                      .map((user, index) => (
                        <TableRow key={index}>
                          <TableCell className="text-2xl">
                            {user.fullName}
                          </TableCell>
                          <TableCell className="text-2xl">
                            {user.email}
                          </TableCell>
                          <TableCell className="text-2xl">
                            {user.phoneNumber}
                          </TableCell>
                          <TableCell className="text-2xl">
                            {user.address}
                          </TableCell>
                          <TableCell className="text-2xl">
                            <Chip
                              color={
                                user.roleID == 1
                                  ? "success"
                                  : user.roleID == 2
                                  ? "default"
                                  : user.roleID == 3
                                  ? "primary"
                                  : "secondary"
                              }
                            >
                              {user.roleID == 1
                                ? "Admin"
                                : user.roleID == 2
                                ? "Customer"
                                : user.roleID == 3
                                ? "Manager"
                                : "Staff"}
                            </Chip>
                          </TableCell>
                          <TableCell>
                            <Button
                              className="w-1/6 bg-yellow-500 text-white"
                              aria-label="edit"
                              onClick={() => modalOpen(user)}
                            >
                              <FontAwesomeIcon
                                icon={faEdit}
                                className="text-white-500"
                              />
                            </Button>
                            <Button
                              className="w-1/6 bg-red-500 text-white"
                              aria-label="remove"
                              onClick={() => {
                                setSelectedUser(user.id);
                                setIsConfirm(true);
                              }}
                            >
                              <FontAwesomeIcon
                                icon={faRemove}
                                className="text-white-500"
                              />
                            </Button>
                          </TableCell>
                        </TableRow>
                      ))}
                  </TableBody>
                )}
              </Table>
            </CardBody>
            <CardFooter>
              <Pagination
                showControls
                total={Math.ceil(
                  users.filter((user) =>
                    user.fullName.toLowerCase().includes(search.toLowerCase())
                  ).length / 8
                )}
                initialPage={page}
                onChange={(newPage) => setPage(newPage)}
              />
            </CardFooter>
          </Card>
        </div>
      </div>
      <Modal size="3xl" isOpen={isOpen} onClose={() => setIsOpen(false)}>
        <ModalContent>
          <>
            <ModalHeader className="flex flex-col gap-1">
              Chỉnh sửa thông tin
            </ModalHeader>
            <ModalBody>
              <div className="flex flex-row justify-center">
                {/* <div className="w-2/5 flex justify-center items-start">
                  <Avatar
                    isBordered
                    className="transition-transform w-1/2 h-auto"
                    color="secondary"
                    size="sm"
                    src="https://i.pravatar.cc/150?u=a042581f4e29026704d"
                  />
                </div> */}
                <div className="w-4/5">
                  <Input
                    isRequired
                    type="text"
                    label="Tên đăng nhập"
                    value={userName}
                    onChange={(e) => setUserName(e.target.value)}
                    className="w-full p-4"
                  />
                  {/* <Input
                      isRequired
                      type="text"
                      label="Password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      className="w-full p-4"
                    /> */}
                  <Input
                    isRequired
                    type="text"
                    label="Họ tên"
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                    className="w-full p-4"
                  />
                  <Input
                    disabled
                    type="email"
                    label="Email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full p-4"
                  />
                  <Input
                    isRequired
                    type="text"
                    label="Số điện thoại"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    className="w-full p-4"
                  />
                  <Input
                    isRequired
                    type="text"
                    label="Địa chỉ"
                    value={address}
                    onChange={(e) => setAddress(e.target.value)}
                    className="w-full p-4"
                  />
                  <Select
                    required
                    label="Vai trò"
                    defaultSelectedKeys={[String(roleID)]}
                    onChange={(e) => setRoleID(e.target.value)}
                    className="w-full p-4"
                  >
                    <SelectItem key={1}>Admin</SelectItem>
                    <SelectItem key={3}>Manager</SelectItem>
                    <SelectItem key={4}>Staff</SelectItem>
                    <SelectItem key={2}>Customer</SelectItem>
                  </Select>
                </div>
              </div>
            </ModalBody>
            <ModalFooter>
              <Button
                color="danger"
                variant="light"
                onPress={() => modalClose()}
              >
                Đóng
              </Button>
              {isLoading ? (
                <CircularProgress size="lg" aria-label="Loading..." />
              ) : (
                <Button color="success" onPress={() => handleUpdateUser()}>
                  Lưu
                </Button>
              )}
            </ModalFooter>
          </>
        </ModalContent>
      </Modal>

      <Modal
        size="3xl"
        isOpen={isConfirm}
        onClose={() => {
          setIsConfirm(false);
          setSelectedUser("");
        }}
      >
        <ModalContent>
          <>
            <ModalHeader className="flex flex-col gap-1">Xac nhan</ModalHeader>
            <ModalBody>
              <div className="w-full flex items-center justify-center">
                <p className="text-4xl">Xóa người dùng?</p>
              </div>
            </ModalBody>
            <ModalFooter>
              <Button
                color="danger"
                variant="light"
                onPress={() => {
                  setIsConfirm(false);
                  setSelectedUser("");
                }}
              >
                Không
              </Button>
              {isLoading ? (
                <CircularProgress size="lg" aria-label="Loading..." />
              ) : (
                <Button color="success" onPress={() => handleDeleteUser()}>
                  Có
                </Button>
              )}
            </ModalFooter>
          </>
        </ModalContent>
      </Modal>

      <Modal size="3xl" isOpen={mess != ""} onClose={() => setMess("")}>
        <ModalContent>
          <>
            <ModalHeader className="flex flex-col gap-1">Thông báo</ModalHeader>
            <ModalBody>
              <div className="w-full flex items-center justify-center">
                <p className="text-4xl">{mess}</p>
              </div>
            </ModalBody>
            <ModalFooter>
              <Button
                color="danger"
                variant="light"
                onPress={() => setMess("")}
              >
                OK
              </Button>
            </ModalFooter>
          </>
        </ModalContent>
      </Modal>
    </div>
  );
};

export default UserManage;
