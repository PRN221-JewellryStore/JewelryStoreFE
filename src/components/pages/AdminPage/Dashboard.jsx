import Sidebar from "src/components/Sidebar/Sidebar";
import NavBar from "src/components/Header/Navbar";
import {
  BreadcrumbItem,
  Breadcrumbs,
  Card,
  CardHeader,
} from "@nextui-org/react";
import { CardBody, CardFooter } from "reactstrap";

const Dashboard = () => {
  const data1 = [
    { name: "Jan", uv: 4000, pv: 2400, amt: 2400 },
    { name: "Feb", uv: 3000, pv: 1398, amt: 2210 },
    { name: "Mar", uv: 2000, pv: 9800, amt: 2290 },
    { name: "Apr", uv: 2780, pv: 3908, amt: 2000 },
    { name: "May", uv: 1890, pv: 4800, amt: 2181 },
    { name: "Jun", uv: 2390, pv: 3800, amt: 2500 },
    { name: "Jul", uv: 3490, pv: 4300, amt: 2100 },
  ];

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
                Dashboard
              </BreadcrumbItem>
            </Breadcrumbs>
          </div>
        </div>
        <div className="w-full p-4 flex">
          <Card className="w-1/4 m-4">
            <CardHeader>Doanh thu hôm nay</CardHeader>
            <CardBody>1111111111111 VNĐ</CardBody>
            <CardFooter>+ 55%</CardFooter>
          </Card>
        </div>
        <div className="w-full mt-8 p-4 flex"></div>
      </div>
    </div>
  );
};

export default Dashboard;
