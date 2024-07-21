import { faAdd, faEdit, faRemove } from "@fortawesome/free-solid-svg-icons";
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
import { useEffect, useState } from "react";
import { getAllCategories } from "src/api/categoryApi";
import {
  createProduct,
  deleteProduct,
  getAllProducts,
  updateProduct,
} from "src/api/productApi";
import NavBar from "src/components/Header/Navbar";
import Sidebar from "src/components/Sidebar/Sidebar";

const JewelryManage = () => {
  const [jewelries, setJewwelries] = useState([]);
  const [categories, setCategories] = useState([]);
  const [isOpen, setIsOpen] = useState(false);
  const [isEdit, setIsEdit] = useState(false);
  const [categoryId, setCategoryId] = useState(1);
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [quantity, setQuantity] = useState(0);
  const [weight, setWeight] = useState(0);
  const [cost, setCost] = useState(0);
  const [selectedProduct, setSelectedProduct] = useState("");
  const [isConfirm, setIsConfirm] = useState(false);
  const [mess, setMess] = useState("");
  const [page, setPage] = useState(1);
  const [err, setErr] = useState("");

  useEffect(() => {
    fetchData();
  }, []);

  useEffect(() => {
    fetchData();
  }, [page]);

  const fetchData = async () => {
    try {
      const response = await getAllProducts();
      setJewwelries([...response]);
      const res = await getAllCategories();
      setCategories([...res]);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  // const getCategoryName = async (id) => {
  //   try {
  //     await getCategory(id);
  //   } catch (error) {
  //     console.error("Error fetching posts:", error);
  //   }
  // };

  const handleAddProduct = async () => {
    if (description !== "" && cost > 0 && weight > 0 && quantity > 0) {
      try {
        await createProduct(
          Number(cost),
          Number(weight),
          Number(quantity),
          description,
          name,
          Number(categoryId)
        );
        setMess("Add product successfully !!!");
        setIsOpen(false);
        fetchData();
      } catch (error) {
        console.error("Error add product:", error);
      }
    } else if (description === "") {
      setErr("Please type description");
    } else if (name === "") {
      setErr("Please type name");
    } else if (cost <= 0) {
      setErr("Cost must be large than 0");
    } else if (weight <= 0) {
      setErr("Weight must be large than 0");
    } else if (quantity <= 0) {
      setErr("Quantity must be large than 0");
    }
  };

  const modalEditOpen = (product) => {
    setIsEdit(true);
    setIsOpen(true);
    setSelectedProduct(product.id);
    setCost(product.cost);
    setQuantity(product.quantity);
    setWeight(product.weight);
    setDescription(product.description);
    setName(product.name);
    setCategoryId(product.categoryID);
  };

  const modalClose = () => {
    setIsEdit(false);
    setIsOpen(false);
    setSelectedProduct("");
    setCost(0);
    setQuantity(0);
    setWeight(0);
    setDescription("");
    setName("");
    setCategoryId();
    setErr("");
  };

  const handleEditProduct = async () => {
    if (description !== "" && cost > 0 && weight > 0 && quantity > 0) {
      try {
        await updateProduct(
          selectedProduct,
          Number(cost),
          Number(weight),
          Number(quantity),
          description,
          name,
          Number(categoryId)
        );
        setMess("Edit product successfully !!!");
        setIsOpen(false);
        fetchData();
      } catch (error) {
        console.error("Error edit product:", error);
      }
    } else if (description === "") {
      setErr("Please type description");
    } else if (name === "") {
      setErr("Please type name");
    } else if (cost <= 0) {
      setErr("Cost must be large than 0");
    } else if (weight <= 0) {
      setErr("Weight must be large than 0");
    } else if (quantity <= 0) {
      setErr("Quantity must be large than 0");
    }
  };

  const handleDeleteProduct = async () => {
    try {
      await deleteProduct(selectedProduct);
      setMess("Remove product successfully !!!");
      setSelectedProduct("");
      setIsConfirm(false);
      fetchData();
    } catch (error) {
      console.error("Error delete product:", error);
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
                Jewelries
              </BreadcrumbItem>
            </Breadcrumbs>
          </div>
        </div>
        <div className="w-full mt-8 p-4">
          <Card className="p-8 relative overflow-visible">
            <CardHeader className="p-0 flex flex-row justify-center">
              <div className="rounded-md bg-sky-500 w-3/4 p-4 mt-[-4rem]">
                <p className="text-center pl-4 text-4xl text-bold">
                  Jewelries Management
                </p>
              </div>
            </CardHeader>
            <CardBody>
              <Button
                className="w-1/6 bg-green-500 text-white text-2xl"
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
                  <TableColumn className="text-2xl">Name</TableColumn>
                  <TableColumn className="text-2xl">Description</TableColumn>
                  <TableColumn className="text-2xl">Category</TableColumn>
                  <TableColumn className="text-2xl">Weight</TableColumn>
                  <TableColumn className="text-2xl">Quantity</TableColumn>
                  <TableColumn className="text-2xl">Cost</TableColumn>
                  <TableColumn className="text-2xl">Status</TableColumn>
                  <TableColumn></TableColumn>
                </TableHeader>
                {jewelries.length == 0 ? (
                  <TableBody emptyContent={"No data to display."}>
                    {[]}
                  </TableBody>
                ) : (
                  <TableBody>
                    {jewelries
                      .slice((page - 1) * 8, page * 8)
                      .map((jewelry) => (
                        <TableRow key={jewelry.id}>
                          <TableCell className="text-2xl">
                            {jewelry.name}
                          </TableCell>
                          <TableCell className="text-2xl">
                            {jewelry.description}
                          </TableCell>
                          <TableCell className="text-2xl">
                            {jewelry.category.name}
                          </TableCell>
                          <TableCell className="text-2xl">
                            {jewelry.weight}
                          </TableCell>
                          <TableCell className="text-2xl">
                            {jewelry.quantity}
                          </TableCell>
                          <TableCell className="text-2xl">
                            {jewelry.cost.toLocaleString("en-US", {
                              style: "decimal",
                              minimumFractionDigits: 0,
                              maximumFractionDigits: 0,
                            })}{" "}
                            VNĐ
                          </TableCell>
                          <TableCell className="text-2xl">
                            {jewelry.deletedAt == null ? (
                              <Chip color="success">On-Sell</Chip>
                            ) : (
                              <Chip color="danger">Removed</Chip>
                            )}
                          </TableCell>
                          <TableCell>
                            <Button
                              className="w-1/6 bg-yellow-500 text-white"
                              aria-label="edit"
                              onClick={() => modalEditOpen(jewelry)}
                            >
                              <FontAwesomeIcon
                                icon={faEdit}
                                className="text-white-500"
                              />
                            </Button>
                            {jewelry.deletedAt == null && (
                              <Button
                                className="w-1/6 bg-red-500 text-white"
                                aria-label="remove"
                                onClick={() => {
                                  setIsConfirm(true);
                                  setSelectedProduct(jewelry.id);
                                }}
                              >
                                <FontAwesomeIcon
                                  icon={faRemove}
                                  className="text-white-500"
                                />
                              </Button>
                            )}
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
                total={Math.ceil(jewelries.length / 8)}
                initialPage={page}
                onChange={(newPage) => setPage(newPage)}
              />
            </CardFooter>
          </Card>
        </div>
      </div>
      <Modal size="3xl" isOpen={isOpen} onClose={() => modalClose}>
        <ModalContent>
          <>
            <ModalHeader className="flex flex-col gap-1">
              {isEdit ? "Edit Jewelry Information" : "Add Jewelry Information"}
            </ModalHeader>
            <ModalBody>
              <div className="flex flex-row justify-center">
                {/* <div className="w-2/5 flex justify-center items-start">
                  <Image
                    isBlurred
                    width={240}
                    src="https://nextui-docs-v2.vercel.app/images/album-cover.png"
                    alt="NextUI Album Cover"
                    className="m-5"
                  />
                </div> */}
                <div className="w-3/5">
                  <Select
                    required
                    label="Jewelry Category"
                    defaultSelectedKeys={[String(categoryId)]}
                    onChange={(e) => setCategoryId(e.target.value)}
                    className="w-full p-4"
                  >
                    {categories.map((category) => (
                      <SelectItem key={category.id}>{category.name}</SelectItem>
                    ))}
                  </Select>
                  <Input
                    isRequired
                    type="text"
                    label="Name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="w-full p-4"
                  />
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
                    label="Cost"
                    value={cost}
                    onChange={(e) => setCost(e.target.value)}
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
                    label="Quantity"
                    value={quantity}
                    onChange={(e) => setQuantity(e.target.value)}
                    className="w-full p-4"
                  />
                  {err !== "" && <strong>{err}</strong>}
                </div>
              </div>
            </ModalBody>
            <ModalFooter>
              <Button color="danger" variant="light" onPress={modalClose}>
                Close
              </Button>
              <Button
                color="success"
                onPress={isEdit ? handleEditProduct : handleAddProduct}
              >
                {isEdit ? "Save" : "Create"}
              </Button>
            </ModalFooter>
          </>
        </ModalContent>
      </Modal>

      <Modal size="2xl" isOpen={isConfirm} onClose={() => setIsConfirm(false)}>
        <ModalContent>
          <>
            <ModalHeader className="flex flex-col gap-1">
              Remove Jewelry
            </ModalHeader>
            <ModalBody>
              <div className="w-full flex items-center justify-center">
                <p className="text-4xl">Are you sure to delete this jewelry?</p>
              </div>
            </ModalBody>
            <ModalFooter>
              <Button
                color="danger"
                variant="light"
                onPress={() => {
                  setIsConfirm(false);
                  setSelectedProduct({});
                }}
              >
                No
              </Button>
              <Button color="success" onPress={() => handleDeleteProduct()}>
                Yes
              </Button>
            </ModalFooter>
          </>
        </ModalContent>
      </Modal>

      <Modal size="2xl" isOpen={mess != ""} onClose={() => setMess("")}>
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
              <Button color="primary" onPress={() => setMess("")}>
                OK
              </Button>
            </ModalFooter>
          </>
        </ModalContent>
      </Modal>
    </div>
  );
};

export default JewelryManage;
