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
} from "@nextui-org/react";
import { useState } from "react";
import NavBar from "src/components/Header/Navbar";
import Sidebar from "src/components/Sidebar/Sidebar";

const ViewOrder = () => {
  const [page, setPage] = useState(1);
  const [openDetail, setOpenDetail] = useState(false);

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
                <Card
                  shadow="sm"
                  isPressable
                  className="rounded-lg border-1 border-solid border-black"
                  onPress={() => setOpenDetail(true)}
                >
                  <CardBody className="overflow-visible p-0">
                    {/* <Image
                      shadow="sm"
                      radius="lg"
                      width="100%"
                      alt="order"
                      className="w-full object-cover h-[160px]"
                      src="https://nextui.org/images/hero-card.jpeg"
                    /> */}
                    <div className="rounded-lg w-full object-cover h-[300px]">
                      <div className="w-full flex flex-row p-2">
                        <b className="text-xl w-2/5">Khách hàng:</b>
                        <p className="w-3/5 text-default-500 text-xl">
                          Minh Tâm
                        </p>
                      </div>
                      <div className="w-full flex flex-row p-2">
                        <b className="text-xl w-2/5">Quầy hàng:</b>
                        <p className="w-3/5 text-default-500 text-xl">Đá cây</p>
                      </div>
                      <div className="w-full flex flex-row p-2">
                        <b className="text-xl w-2/5">Promotion:</b>
                        <p className="w-3/5 text-default-500 text-xl">abc</p>
                      </div>
                      <div className="w-full flex flex-row p-2">
                        <b className="text-xl w-2/5">Ghi chú:</b>
                        <p className="w-3/5 text-default-500 text-xl">
                          mới học C++ kiếm bạn học cùng hỗ trợ nhau ạ
                        </p>
                      </div>
                      <div className="w-full flex flex-row p-2">
                        <b className="text-xl w-2/5">Tổng tiền:</b>
                        <p className="w-3/5 text-default-500 text-xl">
                          500.000 VNĐ
                        </p>
                      </div>
                    </div>
                    <hr className="horizontal strong mt-0 mb-2" />
                  </CardBody>
                  <CardFooter className="text-small justify-center">
                    {/* <b className="text-2xl">Tổng tiền:</b>
                    <p className="text-default-500 text-2xl">500.000 VNĐ</p> */}
                    <Chip color="success" size="lg">
                      Paid
                    </Chip>
                  </CardFooter>
                </Card>
                <Card
                  shadow="sm"
                  isPressable
                  className="rounded-lg border-1 border-solid border-black"
                  onPress={() => setOpenDetail(true)}
                >
                  <CardBody className="overflow-visible p-0">
                    {/* <Image
                      shadow="sm"
                      radius="lg"
                      width="100%"
                      alt="order"
                      className="w-full object-cover h-[160px]"
                      src="https://nextui.org/images/hero-card.jpeg"
                    /> */}
                    <div className="rounded-lg w-full object-cover h-[300px]">
                      <div className="w-full flex flex-row p-2">
                        <b className="text-xl w-2/5">Khách hàng:</b>
                        <p className="w-3/5 text-default-500 text-xl">
                          Nhật Quang
                        </p>
                      </div>
                      <div className="w-full flex flex-row p-2">
                        <b className="text-xl w-2/5">Quầy hàng:</b>
                        <p className="w-3/5 text-default-500 text-xl">Đá cục</p>
                      </div>
                      <div className="w-full flex flex-row p-2">
                        <b className="text-xl w-2/5">Promotion:</b>
                        <p className="w-3/5 text-default-500 text-xl">abc</p>
                      </div>
                      <div className="w-full flex flex-row p-2">
                        <b className="text-xl w-2/5">Ghi chú:</b>
                        <p className="w-3/5 text-default-500 text-xl">
                          mới học C++ kiếm bạn học cùng hỗ trợ nhau ạ
                        </p>
                      </div>
                      <div className="w-full flex flex-row p-2">
                        <b className="text-xl w-2/5">Tổng tiền:</b>
                        <p className="w-3/5 text-default-500 text-xl">
                          300.000 VNĐ
                        </p>
                      </div>
                    </div>
                    <hr className="horizontal strong mt-0 mb-2" />
                  </CardBody>
                  <CardFooter className="text-small justify-center">
                    {/* <b className="text-2xl">Tổng tiền:</b>
                    <p className="text-default-500 text-2xl">500.000 VNĐ</p> */}
                    <Chip color="danger" size="lg">
                      Canceled
                    </Chip>
                  </CardFooter>
                </Card>
                <Card
                  shadow="sm"
                  isPressable
                  className="rounded-lg border-1 border-solid border-black"
                  onPress={() => setOpenDetail(true)}
                >
                  <CardBody className="overflow-visible p-0">
                    {/* <Image
                      shadow="sm"
                      radius="lg"
                      width="100%"
                      alt="order"
                      className="w-full object-cover h-[160px]"
                      src="https://nextui.org/images/hero-card.jpeg"
                    /> */}
                    <div className="rounded-lg w-full object-cover h-[300px]">
                      <div className="w-full flex flex-row p-2">
                        <b className="text-xl w-2/5">Khách hàng:</b>
                        <p className="w-3/5 text-default-500 text-xl">
                          Tấn Toàn
                        </p>
                      </div>
                      <div className="w-full flex flex-row p-2">
                        <b className="text-xl w-2/5">Quầy hàng:</b>
                        <p className="w-3/5 text-default-500 text-xl">Đá bào</p>
                      </div>
                      <div className="w-full flex flex-row p-2">
                        <b className="text-xl w-2/5">Promotion:</b>
                        <p className="w-3/5 text-default-500 text-xl">abc</p>
                      </div>
                      <div className="w-full flex flex-row p-2">
                        <b className="text-xl w-2/5">Ghi chú:</b>
                        <p className="w-3/5 text-default-500 text-xl">
                          mới học C++ kiếm bạn học cùng hỗ trợ nhau ạ
                        </p>
                      </div>
                      <div className="w-full flex flex-row p-2">
                        <b className="text-xl w-2/5">Tổng tiền:</b>
                        <p className="w-3/5 text-default-500 text-xl">
                          50.000 VNĐ
                        </p>
                      </div>
                    </div>
                    <hr className="horizontal strong mt-0 mb-2" />
                  </CardBody>
                  <CardFooter className="text-small justify-center">
                    {/* <b className="text-2xl">Tổng tiền:</b>
                    <p className="text-default-500 text-2xl">500.000 VNĐ</p> */}
                    <Chip color="primary" size="lg">
                      Shipping
                    </Chip>
                  </CardFooter>
                </Card>
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
          <Modal isOpen={openDetail} onOpenChange={() => setOpenDetail(false)}>
            <ModalContent>
              {(onClose) => (
                <>
                  <ModalHeader className="flex flex-col gap-1">
                    Modal Title
                  </ModalHeader>
                  <ModalBody>
                    <p>
                      Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                      Nullam pulvinar risus non risus hendrerit venenatis.
                      Pellentesque sit amet hendrerit risus, sed porttitor quam.
                    </p>
                    <p>
                      Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                      Nullam pulvinar risus non risus hendrerit venenatis.
                      Pellentesque sit amet hendrerit risus, sed porttitor quam.
                    </p>
                    <p>
                      Magna exercitation reprehenderit magna aute tempor
                      cupidatat consequat elit dolor adipisicing. Mollit dolor
                      eiusmod sunt ex incididunt cillum quis. Velit duis sit
                      officia eiusmod Lorem aliqua enim laboris do dolor
                      eiusmod. Et mollit incididunt nisi consectetur esse
                      laborum eiusmod pariatur proident Lorem eiusmod et. Culpa
                      deserunt nostrud ad veniam.
                    </p>
                  </ModalBody>
                  <ModalFooter>
                    <Button color="danger" variant="light" onPress={onClose}>
                      Close
                    </Button>
                    <Button color="primary" onPress={onClose}>
                      Action
                    </Button>
                  </ModalFooter>
                </>
              )}
            </ModalContent>
          </Modal>
        </div>
      </div>
    </div>
  );
};

export default ViewOrder;
