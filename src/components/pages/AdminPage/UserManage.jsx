import { faEdit, faRemove } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  Avatar,
  BreadcrumbItem,
  Breadcrumbs,
  Button,
  Card,
  CardBody,
  CardFooter,
  CardHeader,
  Chip,
  Input,
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
import { deleteUser, getAllUsers, updateUser } from "src/api/userApi";
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

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const response = await getAllUsers();
      setUsers([...response.value]);
    } catch (error) {
      console.error("Error fetching data:", error);
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
        roleID
      );
      setMess("Update successfull!!");
      modalClose();
      fetchData();
    } catch (error) {
      console.error("Error update user:", error);
    }
  };

  const handleDeleteUser = async () => {
    try {
      await deleteUser(selectedUser);
      setMess("Delete successful !!");
      setSelectedUser("");
      setIsConfirm(false);
      fetchData();
    } catch (error) {
      console.error("Error delete user:", error);
    }
  };

  return (
    <div className="flex flex-row">
      <div className="w-1/6">
        <Sidebar />
      </div>
      <div className="w-5/6">
        <div className="w-full mt-4">
          <div className="flex flex-col flex-wrap gap-4">
            <Breadcrumbs key="solid" variant="solid" size="lg">
              <BreadcrumbItem className="text-inherit text-2xl">
                Manage
              </BreadcrumbItem>
              <BreadcrumbItem className="text-inherit text-2xl">
                Users
              </BreadcrumbItem>
            </Breadcrumbs>
          </div>
        </div>
        <div className="w-full mt-8 p-4">
          <Card className="p-8 relative overflow-visible">
            <CardHeader className="p-0 flex flex-row justify-center">
              <div className="rounded-md bg-sky-500 w-3/4 p-4 mt-[-4rem]">
                <p className="text-center pl-4 text-4xl text-bold">
                  User Management
                </p>
              </div>
            </CardHeader>
            <CardBody>
              <Table aria-label="Users Table">
                <TableHeader>
                  <TableColumn className="text-2xl">Full name</TableColumn>
                  <TableColumn className="text-2xl">Email</TableColumn>
                  <TableColumn className="text-2xl">Phone</TableColumn>
                  <TableColumn className="text-2xl">Address</TableColumn>
                  <TableColumn className="text-2xl">Point</TableColumn>
                  <TableColumn className="text-2xl">Role</TableColumn>
                  <TableColumn></TableColumn>
                </TableHeader>
                {users.length == 0 ? (
                  <TableBody emptyContent={"No data to display."}>
                    {[]}
                  </TableBody>
                ) : (
                  <TableBody>
                    {users.map((user, index) => (
                      <TableRow key={index}>
                        <TableCell className="text-2xl">
                          {user.fullName}
                        </TableCell>
                        <TableCell className="text-2xl">{user.email}</TableCell>
                        <TableCell className="text-2xl">
                          {user.phoneNumber}
                        </TableCell>
                        <TableCell className="text-2xl">
                          {user.address}
                        </TableCell>
                        <TableCell className="text-2xl">{user.point}</TableCell>
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
                total={users.length / 10}
                initialPage={page}
                onChange={(event, newPage) => setPage(newPage)}
              />
            </CardFooter>
          </Card>
        </div>
      </div>
      <Modal size="5xl" isOpen={isOpen} onClose={() => setIsOpen(false)}>
        <ModalContent>
          <>
            <ModalHeader className="flex flex-col gap-1">Edit User</ModalHeader>
            <ModalBody>
              <div className="flex flex-row">
                <div className="w-2/5 flex justify-center items-start">
                  <Avatar
                    isBordered
                    className="transition-transform w-1/2 h-auto"
                    color="secondary"
                    size="sm"
                    src="https://i.pravatar.cc/150?u=a042581f4e29026704d"
                  />
                </div>
                <div className="w-3/5">
                  <Input
                    isRequired
                    type="text"
                    label="Username"
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
                    label="Full Name"
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                    className="w-full p-4"
                  />
                  <Input
                    isRequired
                    type="email"
                    label="Email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full p-4"
                  />
                  <Input
                    isRequired
                    type="text"
                    label="Phone number"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    className="w-full p-4"
                  />
                  <Input
                    isRequired
                    type="text"
                    label="Address"
                    value={address}
                    onChange={(e) => setAddress(e.target.value)}
                    className="w-full p-4"
                  />
                  <Input
                    isRequired
                    type="number"
                    label="Point"
                    value={point}
                    onChange={(e) => setPoint(e.target.value)}
                    className="w-full p-4"
                  />
                  <select
                    required
                    label="Role"
                    value={roleID}
                    onChange={(e) => setRoleID(e.target.value)}
                    className="w-full p-4"
                  >
                    <option value={1}>Admin</option>
                    <option value={3}>Manager</option>
                    <option value={4}>Staff</option>
                    <option value={2}>Customer</option>
                  </select>
                </div>
              </div>
            </ModalBody>
            <ModalFooter>
              <Button
                color="danger"
                variant="light"
                onPress={() => modalClose()}
              >
                Close
              </Button>
              <Button color="success" onPress={() => handleUpdateUser()}>
                Save
              </Button>
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
            <ModalHeader className="flex flex-col gap-1">
              Delete User
            </ModalHeader>
            <ModalBody>
              <div className="w-full flex items-center justify-center">
                <p className="text-4xl">Are you sure to delete this user?</p>
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
                No
              </Button>
              <Button color="success" onPress={() => handleDeleteUser()}>
                Yes
              </Button>
            </ModalFooter>
          </>
        </ModalContent>
      </Modal>

      <Modal size="3xl" isOpen={mess != ""} onClose={() => setMess("")}>
        <ModalContent>
          <>
            <ModalHeader className="flex flex-col gap-1">
              Notification
            </ModalHeader>
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
