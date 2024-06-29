import {
  Avatar,
  BreadcrumbItem,
  Breadcrumbs,
  Button,
  Card,
  CardBody,
  CardFooter,
  CardHeader,
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
import { faEdit, faRemove } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import NavBar from "src/components/Header/Navbar";
import Sidebar from "src/components/Sidebar/Sidebar";
import React from "react";

const UserManage = () => {
  const users = [
    {
      username: "hiep123",
      password: 123,
      fullName: "hiep",
      email: "abc@gmail.com",
      phone: "0999999999",
      address: "HCM City",
      roleId: 1,
    },
    {
      username: "hiep123",
      password: 123,
      fullName: "hiep",
      email: "abc@gmail.com",
      phone: "0999999999",
      address: "HCM City",
      roleId: 1,
    },
    {
      username: "hiep123",
      password: 123,
      fullName: "hiep",
      email: "abc@gmail.com",
      phone: "0999999999",
      address: "HCM City",
      roleId: 1,
    },
    {
      username: "hiep123",
      password: 123,
      fullName: "hiep",
      email: "abc@gmail.com",
      phone: "0999999999",
      address: "HCM City",
      roleId: 1,
    },
    {
      username: "hiep123",
      password: 123,
      fullName: "hiep",
      email: "abc@gmail.com",
      phone: "0999999999",
      address: "HCM City",
      roleId: 1,
    },
    {
      username: "hiep123",
      password: 123,
      fullName: "hiep",
      email: "abc@gmail.com",
      phone: "0999999999",
      address: "HCM City",
      roleId: 1,
    },
    {
      username: "hiep123",
      password: 123,
      fullName: "hiep",
      email: "abc@gmail.com",
      phone: "0999999999",
      address: "HCM City",
      roleId: 1,
    },
    {
      username: "hiep123",
      password: 123,
      fullName: "hiep",
      email: "abc@gmail.com",
      phone: "0999999999",
      address: "HCM City",
      roleId: 1,
    },
    {
      username: "hiep123",
      password: 123,
      fullName: "hiep",
      email: "abc@gmail.com",
      phone: "0999999999",
      address: "HCM City",
      roleId: 1,
    },
    {
      username: "hiep123",
      password: 123,
      fullName: "hiep",
      email: "abc@gmail.com",
      phone: "0999999999",
      address: "HCM City",
      roleId: 1,
    },
  ];

  const [isOpen, setIsOpen] = React.useState(false);
  const [email, setEmail] = React.useState("");
  const [fullName, setFullName] = React.useState("");
  const [phone, setPhone] = React.useState("");
  const [address, setAddress] = React.useState("");
  const [isConfirm, setIsConfirm] = React.useState(false);

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
                        <TableCell className="text-2xl">{user.phone}</TableCell>
                        <TableCell className="text-2xl">
                          {user.address}
                        </TableCell>
                        <TableCell className="text-2xl">
                          {user.roleId}
                        </TableCell>
                        <TableCell>
                          <Button
                            className="w-1/6 bg-yellow-500 text-white"
                            aria-label="edit"
                            onClick={() => setIsOpen(true)}
                          >
                            <FontAwesomeIcon
                              icon={faEdit}
                              className="text-white-500"
                            />
                          </Button>
                          <Button
                            className="w-1/6 bg-red-500 text-white"
                            aria-label="remove"
                            onClick={() => setIsConfirm(true)}
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
              <Pagination showControls total={10} initialPage={1} />
            </CardFooter>
          </Card>
        </div>
      </div>
      <Modal size="5xl" isOpen={isOpen} onClose={() => setIsOpen(false)}>
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-col gap-1">
                Edit User
              </ModalHeader>
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
                  </div>
                </div>
              </ModalBody>
              <ModalFooter>
                <Button color="danger" variant="light" onPress={onClose}>
                  Close
                </Button>
                <Button color="success" onPress={onClose}>
                  Save
                </Button>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>

      <Modal size="3xl" isOpen={isConfirm} onClose={() => setIsConfirm(false)}>
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-col gap-1">
                Edit User
              </ModalHeader>
              <ModalBody>
                <div className="w-full flex items-center justify-center">
                  <p className="text-4xl">Are you sure to delete this user?</p>
                </div>
              </ModalBody>
              <ModalFooter>
                <Button color="danger" variant="light" onPress={onClose}>
                  No
                </Button>
                <Button color="success" onPress={onClose}>
                  Yes
                </Button>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
    </div>
  );
};

export default UserManage;
