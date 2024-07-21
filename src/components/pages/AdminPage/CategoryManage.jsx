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
  Table,
  TableBody,
  TableCell,
  TableColumn,
  TableHeader,
  TableRow,
} from "@nextui-org/react";
import { useEffect, useState } from "react";
import {
  createCategory,
  getAllCategories,
  updateCategory,
} from "src/api/categoryApi";
import NavBar from "src/components/Header/Navbar";
import Sidebar from "src/components/Sidebar/Sidebar";

const CategoryManagement = () => {
  const [categories, setCategories] = useState([]);
  const [isOpen, setIsOpen] = useState(false);
  const [isEdit, setIsEdit] = useState(false);
  const [id, setId] = useState(0);
  const [name, setName] = useState("");
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
      const res = await getAllCategories();
      setCategories([...res]);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  const modalEditOpen = (cate) => {
    setIsEdit(true);
    setIsOpen(true);
    setId(cate.id);
    setName(cate.name);
  };

  const modalClose = () => {
    setIsEdit(false);
    setIsOpen(false);
    setId(0);
    setName("");
    setErr("");
  };

  const handleAddCate = async () => {
    try {
      await createCategory(name);
      setMess("Add category successfully !!!");
      modalClose();
      fetchData();
    } catch (error) {
      console.error("Error add cate:", error);
    }
  };

  const handleEditCate = async () => {
    try {
      await updateCategory(id, name);
      setMess("Add category successfully !!!");
      modalClose();
      fetchData();
    } catch (error) {
      console.error("Error edit cate:", error);
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
                Category
              </BreadcrumbItem>
            </Breadcrumbs>
          </div>
        </div>
        <div className="w-full mt-8 p-4">
          <Card className="p-8 relative overflow-visible">
            <CardHeader className="p-0 flex flex-row justify-center">
              <div className="rounded-md bg-sky-500 w-3/4 p-4 mt-[-4rem]">
                <p className="text-center pl-4 text-4xl text-bold">
                  Category Management
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
                Category
              </Button>
              <div className="w-full flex justify-center">
                <Table aria-label="Users Table" className="w-3/4">
                  <TableHeader>
                    <TableColumn className="text-2xl">Id</TableColumn>
                    <TableColumn className="text-2xl">Name</TableColumn>
                    <TableColumn className="text-2xl">Status</TableColumn>
                    <TableColumn></TableColumn>
                  </TableHeader>
                  {categories.length == 0 ? (
                    <TableBody emptyContent={"No data to display."}>
                      {[]}
                    </TableBody>
                  ) : (
                    <TableBody>
                      {categories
                        .slice((page - 1) * 8, page * 8)
                        .map((cate) => (
                          <TableRow key={cate.id}>
                            <TableCell className="text-2xl">
                              {cate.id}
                            </TableCell>
                            <TableCell className="text-2xl">
                              {cate.name}
                            </TableCell>
                            <TableCell className="text-2xl">
                              {cate.deletedAt == null ? (
                                <Chip color="success">On-Sell</Chip>
                              ) : (
                                <Chip color="danger">Removed</Chip>
                              )}
                            </TableCell>
                            <TableCell>
                              <Button
                                className="w-1/6 bg-yellow-500 text-white"
                                aria-label="edit"
                                onClick={() => modalEditOpen(cate)}
                              >
                                <FontAwesomeIcon
                                  icon={faEdit}
                                  className="text-white-500"
                                />
                              </Button>
                              {cate.deletedAt == null && (
                                <Button
                                  className="w-1/6 bg-red-500 text-white"
                                  aria-label="remove"
                                  onClick={() => {
                                    setIsConfirm(true);
                                    setId(cate.id);
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
              </div>
            </CardBody>
            <CardFooter>
              <Pagination
                showControls
                total={Math.ceil(categories.length / 8)}
                initialPage={page}
                onChange={(newPage) => setPage(newPage)}
              />
            </CardFooter>
          </Card>
        </div>
      </div>
      <Modal size="xl" isOpen={isOpen} onClose={() => modalClose}>
        <ModalContent>
          <>
            <ModalHeader className="flex flex-col gap-1">
              {isEdit
                ? "Edit Category Information"
                : "Add Category Information"}
            </ModalHeader>
            <ModalBody>
              <div className="flex flex-row justify-center">
                <div className="w-4/5">
                  {isEdit && (
                    <Input
                      isRequired
                      disabled
                      type="text"
                      label="Id"
                      value={id}
                      onChange={(e) => setId(e.target.value)}
                      className="w-full p-4"
                    />
                  )}
                  <Input
                    isRequired
                    type="text"
                    label="Name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
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
                onPress={isEdit ? handleEditCate : handleAddCate}
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
                <p className="text-4xl">
                  Are you sure to delete this category?
                </p>
              </div>
            </ModalBody>
            <ModalFooter>
              <Button
                color="danger"
                variant="light"
                onPress={() => {
                  setIsConfirm(false);
                  setId(0);
                }}
              >
                No
              </Button>
              <Button
                color="success"
                onPress={() => {
                  setIsConfirm(false);
                  setId(0);
                }}
              >
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

export default CategoryManagement;
