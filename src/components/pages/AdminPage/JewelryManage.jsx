import {
  BreadcrumbItem,
  Breadcrumbs,
  Button,
  Card,
  CardBody,
  CardFooter,
  CardHeader,
  Image,
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
} from "@nextui-org/react";
import { faAdd, faEdit, faRemove } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import NavBar from "src/components/Header/Navbar";
import Sidebar from "src/components/Sidebar/Sidebar";
import React from "react";

const JewelryManage = () => {
  const Jewelries = [
    {
      categoryId: 1,
      description: "Ruby is a gemstone and a variety of the mineral corundum",
      quantity: 100,
      weight: 21,
      cost: 7999999,
    },
    {
      categoryId: 1,
      description: "Ruby is a gemstone and a variety of the mineral corundum",
      quantity: 100,
      weight: 21,
      cost: 7999999,
    },
    {
      categoryId: 1,
      description: "Ruby is a gemstone and a variety of the mineral corundum",
      quantity: 100,
      weight: 21,
      cost: 7999999,
    },
    {
      categoryId: 1,
      description: "Ruby is a gemstone and a variety of the mineral corundum",
      quantity: 100,
      weight: 21,
      cost: 7999999,
    },
    {
      categoryId: 1,
      description: "Ruby is a gemstone and a variety of the mineral corundum",
      quantity: 100,
      weight: 21,
      cost: 7999999,
    },
    {
      categoryId: 1,
      description: "Ruby is a gemstone and a variety of the mineral corundum",
      quantity: 100,
      weight: 21,
      cost: 7999999,
    },
    {
      categoryId: 1,
      description: "Ruby is a gemstone and a variety of the mineral corundum",
      quantity: 100,
      weight: 21,
      cost: 7999999,
    },
    {
      categoryId: 1,
      description: "Ruby is a gemstone and a variety of the mineral corundum",
      quantity: 100,
      weight: 21,
      cost: 7999999,
    },
    {
      categoryId: 1,
      description: "Ruby is a gemstone and a variety of the mineral corundum",
      quantity: 100,
      weight: 21,
      cost: 7999999,
    },
    {
      categoryId: 1,
      description: "Ruby is a gemstone and a variety of the mineral corundum",
      quantity: 100,
      weight: 21,
      cost: 7999999,
    },
  ];

  const [isOpen, setIsOpen] = React.useState(false);
  const [isEdit, setIsEdit] = React.useState(false);
  const [categoryId, setCategoryId] = React.useState(1);
  const [description, setDescription] = React.useState("");
  const [quantity, setQuantity] = React.useState(0);
  const [weight, setWeight] = React.useState(0);
  const [cost, setCost] = React.useState(0);
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
                Admin
              </BreadcrumbItem>
              <BreadcrumbItem className="text-inherit text-2xl">
                Manage
              </BreadcrumbItem>
              <BreadcrumbItem className="text-inherit text-2xl">
                Jewelries
              </BreadcrumbItem>
            </Breadcrumbs>
          </div>
        </div>
        <div className="w-full mt-8 p-4">
          <Card className="p-8 relative overflow-visible">
            <CardHeader className="p-0 flex flex-row justify-center">
              <div className="rounded-md bg-sky-300 w-4/5 p-4 mt-[-4rem]">
                <p className="text-center pl-4 text-4xl text-bold">
                  Jewelries Management
                </p>
              </div>
            </CardHeader>
            <CardBody>
              <Button
                className="w-[12%] bg-green-500 text-white text-2xl"
                aria-label="add"
                onClick={() => {
                  setIsOpen(true);
                }}
              >
                <FontAwesomeIcon icon={faAdd} className="text-white-500" /> New
                Jewelry
              </Button>
              <Table aria-label="Users Table">
                <TableHeader>
                  <TableColumn className="text-2xl">Category</TableColumn>
                  <TableColumn className="text-2xl">Description</TableColumn>
                  <TableColumn className="text-2xl">Weight</TableColumn>
                  <TableColumn className="text-2xl">Quantity</TableColumn>
                  <TableColumn className="text-2xl">Cost</TableColumn>
                  <TableColumn></TableColumn>
                </TableHeader>
                {Jewelries.length == 0 ? (
                  <TableBody emptyContent={"No data to display."}>
                    {[]}
                  </TableBody>
                ) : (
                  <TableBody>
                    {Jewelries.map((jewelry, index) => (
                      <TableRow key={index}>
                        <TableCell className="text-2xl">
                          {jewelry.categoryId}
                        </TableCell>
                        <TableCell className="text-2xl">
                          {jewelry.description}
                        </TableCell>
                        <TableCell className="text-2xl">
                          {jewelry.weight} g
                        </TableCell>
                        <TableCell className="text-2xl">
                          {jewelry.quantity}
                        </TableCell>
                        <TableCell className="text-2xl">
                          {jewelry.cost} VNĐ
                        </TableCell>
                        <TableCell>
                          <Button
                            className="w-1/6 bg-yellow-500 text-white"
                            aria-label="edit"
                            onClick={() => {
                              setIsEdit(true);
                              setIsOpen(true);
                            }}
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
      <Modal
        size="5xl"
        isOpen={isOpen}
        onClose={() => {
          setIsOpen(false);
          setIsEdit(false);
        }}
      >
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-col gap-1">
                {isEdit
                  ? "Edit Jewelry Information"
                  : "Add Jewelry Information"}
              </ModalHeader>
              <ModalBody>
                <div className="flex flex-row">
                  <div className="w-2/5 flex justify-center items-start">
                    <Image
                      isBlurred
                      width={240}
                      src="https://nextui-docs-v2.vercel.app/images/album-cover.png"
                      alt="NextUI Album Cover"
                      className="m-5"
                    />
                  </div>
                  <div className="w-3/5">
                    <Select
                      isRequired
                      label="Jewelry Category"
                      placeholder="Select a category"
                      value={categoryId}
                      onChange={(e) => setCategoryId(e.target.value)}
                      className="w-full p-4"
                    >
                      <SelectItem key={1}>A</SelectItem>
                      <SelectItem key={2}>B</SelectItem>
                      <SelectItem key={3}>C</SelectItem>
                    </Select>
                    <Input
                      isRequired
                      type="text"
                      label="Description"
                      value={description}
                      onChange={(e) => setDescription(e.target.value)}
                      className="w-full p-4"
                    />
                    <Input
                      isRequired
                      type="number"
                      label="Quantity"
                      value={quantity}
                      onChange={(e) => setQuantity(e.target.value)}
                      className="w-full p-4"
                    />
                    <Input
                      isRequired
                      type="number"
                      label="Weight"
                      value={weight}
                      onChange={(e) => setWeight(e.target.value)}
                      className="w-full p-4"
                    />
                    <Input
                      isRequired
                      type="number"
                      label="Cost"
                      value={cost}
                      onChange={(e) => setCost(e.target.value)}
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
                  {isEdit ? "Save" : "Create"}
                </Button>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>

      <Modal size="2xl" isOpen={isConfirm} onClose={() => setIsConfirm(false)}>
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-col gap-1">
                Remove Jewelry
              </ModalHeader>
              <ModalBody>
                <div className="w-full flex items-center justify-center">
                  <p className="text-4xl">
                    Are you sure to delete this jewelry?
                  </p>
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

export default JewelryManage;
