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
  //const [categoryName, setCategoryName] = useState("");
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [quantity, setQuantity] = useState(0);
  const [weight, setWeight] = useState(0);
  const [cost, setCost] = useState(0);
  const [selectedProduct, setSelectedProduct] = useState("");
  const [selectedCate, setSelectedCate] = useState(0);
  const [isConfirm, setIsConfirm] = useState(false);
  const [mess, setMess] = useState("");
  const [page, setPage] = useState(1);
  const [err, setErr] = useState("");
  const [search, setSearch] = useState("");
  const [img, setImg] = useState("");

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
      //setCategoryName(res[0]?.name);
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
          //categoryName
        );
        setMess("Thêm thành công !!!");
        setIsOpen(false);
        fetchData();
      } catch (error) {
        console.error("Error add product:", error);
      }
    } else if (description === "") {
      setErr("Nhập mô tả");
    } else if (name === "") {
      setErr("Nhập tên trang sức");
    } else if (cost <= 0) {
      setErr("Đơn giá phải lớn hơn 0");
    } else if (weight <= 0) {
      setErr("Khối lượng phải lớn hơn 0");
    } else if (quantity <= 0) {
      setErr("Số lượng phải lớn hơn 0");
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
    setImg(product.imgUrl);
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
    setCategoryId(1);
    setImg("");
    //setCategoryName(categories[0]?.name);
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
      setErr("Nhập mô tả");
    } else if (name === "") {
      setErr("Nhập tên trang sức");
    } else if (cost <= 0) {
      setErr("Đơn giá phải lớn hơn 0");
    } else if (weight <= 0) {
      setErr("Khối lượng phải lớn hơn 0");
    } else if (quantity <= 0) {
      setErr("Số lượng phải lớn hơn 0");
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

  const handleCreateImageChange = (e) => {
    const file = e.target.files ? e.target.files[0] : null;
    if (file && file.type.substr(0, 5) === "image") {
      const reader = new FileReader();
      reader.onloadend = () => {
        // Use a type assertion to tell TypeScript that reader.result will be a string
        setImg(reader.result);
      };
      reader.readAsDataURL(file);
    } else {
      setImg("https://nextui-docs-v2.vercel.app/images/album-cover.png"); // Reset to default or placeholder if not an image
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
                Trang sức
              </BreadcrumbItem>
            </Breadcrumbs>
          </div>
        </div>
        <div className="w-full mt-8 p-4">
          <Card className="p-8 relative overflow-visible">
            <CardHeader className="p-0 flex flex-row justify-center">
              <div className="rounded-md bg-sky-500 w-3/4 p-4 mt-[-4rem]">
                <p className="text-center pl-4 text-4xl text-bold">
                  Quản lý trang sức
                </p>
              </div>
            </CardHeader>
            <CardBody>
              <div className="w-full flex flex-row">
                <div className="flex justify-center items-center">
                  <Button
                    className="w-full bg-green-500 text-white text-2xl"
                    aria-label="add"
                    onClick={() => {
                      setIsOpen(true);
                    }}
                  >
                    <FontAwesomeIcon icon={faAdd} className="text-white-500" />{" "}
                    Thêm mới
                  </Button>
                </div>
                <div className="flex justify-center items-center w-1/4">
                  <Input
                    type="text"
                    placeholder="Tìm kiếm bằng tên hoặc mô tả ..."
                    className="w-full"
                    isClearable
                    onClear={() => setSearch("")}
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                  />
                </div>
                <Select
                  label="Danh mục"
                  defaultSelectedKeys={[String(selectedCate)]}
                  onChange={(e) => setSelectedCate(e.target.value)}
                  className="w-1/4 p-4"
                >
                  <SelectItem key={0}>Tất cả</SelectItem>
                  {categories.map((category) => (
                    <SelectItem key={category.id}>{category.name}</SelectItem>
                  ))}
                </Select>
              </div>
              <Table aria-label="Users Table">
                <TableHeader>
                  <TableColumn className="text-2xl">Tên trang sức</TableColumn>
                  <TableColumn className="text-2xl">Mô tả</TableColumn>
                  <TableColumn className="text-2xl">Danh mục</TableColumn>
                  <TableColumn className="text-2xl">Khối lượng</TableColumn>
                  <TableColumn className="text-2xl">Số lượng</TableColumn>
                  <TableColumn className="text-2xl">Đơn giá</TableColumn>
                  <TableColumn></TableColumn>
                </TableHeader>
                {jewelries.length == 0 ? (
                  <TableBody emptyContent={"Không có dữ liệu."}>{[]}</TableBody>
                ) : selectedCate == 0 ? (
                  <TableBody>
                    {jewelries
                      .filter(
                        (jewel) =>
                          jewel.name
                            .toLowerCase()
                            .includes(search.toLowerCase()) ||
                          jewel.description
                            .toLowerCase()
                            .includes(search.toLowerCase())
                      )
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
                ) : (
                  <TableBody>
                    {jewelries
                      .filter(
                        (jewelry) =>
                          (jewelry.categoryID == selectedCate &&
                            jewelry.name
                              .toLowerCase()
                              .includes(search.toLowerCase())) ||
                          (jewelry.categoryID == selectedCate &&
                            jewelry.description
                              .toLowerCase()
                              .includes(search.toLowerCase()))
                      )
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
              {selectedCate == 0 ? (
                <Pagination
                  showControls
                  total={Math.ceil(
                    jewelries.filter(
                      (jewel) =>
                        jewel.name
                          .toLowerCase()
                          .includes(search.toLowerCase()) ||
                        jewel.description
                          .toLowerCase()
                          .includes(search.toLowerCase())
                    ).length / 8
                  )}
                  initialPage={page}
                  onChange={(newPage) => setPage(newPage)}
                />
              ) : (
                <Pagination
                  showControls
                  total={Math.ceil(
                    jewelries.filter(
                      (jewelry) =>
                        (jewelry.categoryID == selectedCate &&
                          jewelry.name
                            .toLowerCase()
                            .includes(search.toLowerCase())) ||
                        (jewelry.categoryID == selectedCate &&
                          jewelry.description
                            .toLowerCase()
                            .includes(search.toLowerCase()))
                    ).length / 8
                  )}
                  initialPage={page}
                  onChange={(newPage) => setPage(newPage)}
                />
              )}
            </CardFooter>
          </Card>
        </div>
      </div>
      <Modal size="4xl" isOpen={isOpen} onClose={() => modalClose}>
        <ModalContent>
          <>
            <ModalHeader className="flex flex-col gap-1">
              {isEdit ? "Chỉnh sửa thông tin" : "Thêm mới"}
            </ModalHeader>
            <ModalBody>
              <div className="flex flex-row justify-center">
                <div className="w-2/5">
                  <Image
                    isBlurred
                    width={300}
                    src={img}
                    alt="NextUI Album Cover"
                    className="m-5"
                  />
                  <Input
                    onChange={handleCreateImageChange}
                    type="file"
                    name="Images"
                    accept="image/*"
                  />
                </div>
                <div className="w-3/5">
                  <Select
                    required
                    label="Danh mục"
                    defaultSelectedKeys={[String(categoryId)]}
                    onChange={(e) => {
                      setCategoryId(e.target.value);
                      // setCategoryName(
                      //   categories.filter(
                      //     (cate) => cate.id == e.target.value
                      //   )[0]?.name
                      // );
                    }}
                    className="w-full p-4"
                  >
                    {categories.map((category) => (
                      <SelectItem key={category.id}>{category.name}</SelectItem>
                    ))}
                  </Select>
                  <Input
                    isRequired
                    type="text"
                    label="Tên trang sức"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="w-full p-4"
                  />
                  <Input
                    isRequired
                    type="text"
                    label="Mô tả"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    className="w-full p-4"
                  />
                  <Input
                    isRequired
                    type="number"
                    label="Đơn giá"
                    value={cost}
                    onChange={(e) => setCost(e.target.value)}
                    className="w-full p-4"
                  />
                  <Input
                    isRequired
                    type="number"
                    label="Khối lượng"
                    value={weight}
                    onChange={(e) => setWeight(e.target.value)}
                    className="w-full p-4"
                  />
                  <Input
                    isRequired
                    type="number"
                    label="Số lượng"
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
                {isEdit ? "Lưu" : "Thêm"}
              </Button>
            </ModalFooter>
          </>
        </ModalContent>
      </Modal>

      <Modal size="2xl" isOpen={isConfirm} onClose={() => setIsConfirm(false)}>
        <ModalContent>
          <>
            <ModalHeader className="flex flex-col gap-1">Xác nhận</ModalHeader>
            <ModalBody>
              <div className="w-full flex items-center justify-center">
                <p className="text-4xl">Xóa trang sức này?</p>
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
                Không
              </Button>
              <Button color="success" onPress={() => handleDeleteProduct()}>
                Có
              </Button>
            </ModalFooter>
          </>
        </ModalContent>
      </Modal>

      <Modal size="2xl" isOpen={mess != ""} onClose={() => setMess("")}>
        <ModalContent>
          <>
            <ModalHeader className="flex flex-col gap-1">Thông báo</ModalHeader>
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
