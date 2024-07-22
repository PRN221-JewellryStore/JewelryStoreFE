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
  createPromotion,
  getAllPromotions,
  removePromotion,
  updatePromotion,
} from "src/api/promotionApi";
import NavBar from "src/components/Header/Navbar";
import Sidebar from "src/components/Sidebar/Sidebar";

const PromotionManagement = () => {
  const [promotions, setPromotions] = useState([]);
  const [isOpen, setIsOpen] = useState(false);
  const [isEdit, setIsEdit] = useState(false);
  const [id, setId] = useState("");
  const [description, setDescription] = useState("");
  const [condition, setCondition] = useState(0);
  const [reduce, setReduce] = useState(0);
  const [max, setMax] = useState(0);
  const [expire, setExpire] = useState("");
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
      const res = await getAllPromotions();
      setPromotions([...res]);
    } catch (error) {
      console.error("Lỗi:", error);
    }
  };

  const modalEditOpen = (promotion) => {
    setIsEdit(true);
    setIsOpen(true);
    setId(promotion.id);
    setDescription(promotion.description);
    setCondition(promotion.conditionsOfUse);
    setReduce(promotion.reducedPercent);
    setMax(promotion.maximumReduce);
    setExpire(promotion.expiresTime);
  };

  const modalClose = () => {
    setIsEdit(false);
    setIsOpen(false);
    setDescription("");
    setCondition(0);
    setReduce(0);
    setMax(0);
    setExpire("");
    setErr("");
  };

  const handleAddPromotion = async () => {
    if (description == "") {
      setErr("Nhập mô tả");
    } else if (condition <= 0) {
      setErr("Điều kiện dùng phải lớn hơn 0");
    } else if (reduce <= 0) {
      setErr("Tỷ lệ giảm phải lớn hơn 0");
    } else if (max <= 0) {
      setErr("Số tiền giảm tối đa phải lớn hơn 0");
    } else if (expire == "") {
      setErr("Chọn thời gian hết hạn");
    } else {
      try {
        await createPromotion(description, condition, reduce, max, expire);
        setMess("Thêm thành công !!!");
        modalClose();
        fetchData();
      } catch (error) {
        console.error("Lỗi:", error);
      }
    }
  };

  const handleUpdatePromotion = async () => {
    if (description == "") {
      setErr("Nhập mô tả");
    } else if (condition <= 0) {
      setErr("Điều kiện dùng phải lớn hơn 0");
    } else if (reduce <= 0) {
      setErr("Tỷ lệ giảm phải lớn hơn 0");
    } else if (max <= 0) {
      setErr("Số tiền giảm tối đa phải lớn hơn 0");
    } else if (expire == "") {
      setErr("Chọn thời gian hết hạn");
    } else {
      try {
        await updatePromotion(id, description, condition, reduce, max, expire);
        setMess("Đã cập nhật!!!");
        modalClose();
        fetchData();
      } catch (error) {
        console.error("Lỗi:", error);
      }
    }
  };

  const handleRemovePromotion = async () => {
    try {
      await removePromotion(id);
      setMess("Đã xóa!!!");
      setId("");
      setIsConfirm(false);
      fetchData();
    } catch (error) {
      console.error("Lỗi:", error);
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
                CT Khuyến mãi
              </BreadcrumbItem>
            </Breadcrumbs>
          </div>
        </div>
        <div className="w-full mt-8 p-4">
          <Card className="p-8 relative overflow-visible">
            <CardHeader className="p-0 flex flex-row justify-center">
              <div className="rounded-md bg-sky-500 w-3/4 p-4 mt-[-4rem]">
                <p className="text-center pl-4 text-4xl text-bold">
                  Quản lý Chương trình khuyến mãi
                </p>
              </div>
            </CardHeader>
            <CardBody>
              <Button
                className="w-1/6 bg-green-500 text-white text-xl"
                aria-label="add"
                onClick={() => {
                  setIsOpen(true);
                }}
              >
                <FontAwesomeIcon icon={faAdd} className="text-white-500" /> Thêm
                mới
              </Button>
              <Table aria-label="Users Table">
                <TableHeader>
                  <TableColumn className="text-2xl">Mô tả</TableColumn>
                  <TableColumn className="text-2xl">Điều kiện dùng</TableColumn>
                  <TableColumn className="text-2xl">Tỷ lệ giảm</TableColumn>
                  <TableColumn className="text-2xl">
                    Tiền giảm tối đa
                  </TableColumn>
                  <TableColumn className="text-2xl">
                    Thời gian hết hạn
                  </TableColumn>
                  <TableColumn className="text-2xl">Trạng thái</TableColumn>
                  <TableColumn></TableColumn>
                </TableHeader>
                {promotions.length == 0 ? (
                  <TableBody emptyContent={"Không có dữ liệu."}>{[]}</TableBody>
                ) : (
                  <TableBody>
                    {promotions
                      .slice((page - 1) * 8, page * 8)
                      .map((promotion) => (
                        <TableRow key={promotion.id}>
                          <TableCell className="text-2xl">
                            {promotion.description}
                          </TableCell>
                          <TableCell className="text-2xl">
                            {promotion.conditionsOfUse}
                          </TableCell>
                          <TableCell className="text-2xl">
                            {promotion.reducedPercent}
                          </TableCell>
                          <TableCell className="text-2xl">
                            {promotion.maximumReduce}
                          </TableCell>
                          <TableCell className="text-2xl">
                            {promotion.expiresTime.split("T")[0] +
                              " " +
                              promotion.expiresTime
                                .split("T")[1]
                                .substring(0, 8)}
                          </TableCell>
                          <TableCell className="text-2xl">
                            {promotion.status == "Active" ? (
                              <Chip color="success">{promotion.status}</Chip>
                            ) : (
                              <Chip color="danger">{promotion.status}</Chip>
                            )}
                          </TableCell>
                          <TableCell>
                            <Button
                              className="w-1/6 bg-yellow-500 text-white"
                              aria-label="edit"
                              onClick={() => modalEditOpen(promotion)}
                            >
                              <FontAwesomeIcon
                                icon={faEdit}
                                className="text-white-500"
                              />
                            </Button>
                            {promotion.deletedAt == null && (
                              <Button
                                className="w-1/6 bg-red-500 text-white"
                                aria-label="remove"
                                onClick={() => {
                                  setIsConfirm(true);
                                  setId(promotion.id);
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
                total={Math.ceil(promotions.length / 8)}
                initialPage={page}
                onChange={(newPage) => setPage(newPage)}
              />
            </CardFooter>
          </Card>
        </div>
      </div>
      <Modal size="2xl" isOpen={isOpen} onClose={() => modalClose}>
        <ModalContent>
          <>
            <ModalHeader className="flex flex-col gap-1">
              {isEdit ? "Chỉnh sửa thông tin" : "Thêm mới"}
            </ModalHeader>
            <ModalBody>
              <div className="flex flex-row justify-center">
                <div className="w-3/5">
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
                    label="Điều kiện dùng"
                    value={condition}
                    onChange={(e) => setCondition(e.target.value)}
                    className="w-full p-4"
                  />
                  <Input
                    isRequired
                    type="number"
                    label="Tỷ lệ giảm"
                    value={reduce}
                    onChange={(e) => setReduce(e.target.value)}
                    className="w-full p-4"
                  />
                  <Input
                    isRequired
                    type="number"
                    label="Giảm tối đa"
                    value={max}
                    onChange={(e) => setMax(e.target.value)}
                    className="w-full p-4"
                  />
                  {/* <DatePicker
                    isRequired
                    label="Expire date"
                    hideTimeZone
                    showMonthAndYearPickers
                    value={Date.parse(expire)}
                    onChange={(e) => setExpire(e.target.value)}
                    className="w-full p-4"
                  /> */}
                  <Input
                    isRequired
                    type="datetime-local"
                    label="Thời gian hết hạn"
                    value={expire}
                    onChange={(e) => setExpire(e.target.value)}
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
                onPress={isEdit ? handleUpdatePromotion : handleAddPromotion}
              >
                {isEdit ? "Lưu" : "Tạo"}
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
                <p className="text-4xl">Xóa khuyến mãi?</p>
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
                Không
              </Button>
              <Button color="success" onPress={handleRemovePromotion}>
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

export default PromotionManagement;
