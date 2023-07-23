import { Layout, Menu } from "antd";
import "./App.css";
import { Header } from "antd/es/layout/layout";
import Sider from "antd/es/layout/Sider";
import { Route, Routes, useLocation, useNavigate } from "react-router-dom";
import { BarChartOutlined, BranchesOutlined } from "@ant-design/icons";
import { useState } from "react";
import Dashboard from "./pages/dashboard/Dashboard";
import Commits from "./pages/commits/Commits";
import NotFound from "./pages/notFound/NotFound";
import Logo from "./assets/img/logo.jpg";

function App() {
  const navigate = useNavigate();
  const location = useLocation();

  const [collapsed, setCollapsed] = useState(false);

  const menuItems = [
    {
      label: "Commits",
      key: "/commits",
      icon: <BranchesOutlined />,
    },
    {
      label: "Dashboard",
      key: "/dashboard",
      icon: <BarChartOutlined />,
    },
  ];

  const handleMenuClick = (e) => {
    navigate(e.key);
  };

  const validateOptionsPath = (path) => {
    if (menuItems.find((item) => item.key === path)) {
      return path;
    }
    return "/commits";
  };
  return (
    <div className="h-full animation fade-in">
      <Layout>
        <Header className="header b-shadow"> <img src={Logo} alt="fulltime force logo" /> </Header>
        <Layout>
          <Sider
            breakpoint="lg"
            className="animation sider-expanded b-shadow"
            collapsible
            collapsed={collapsed}
            onCollapse={(value) => setCollapsed(value)}
          >
            <Menu
              mode="inline"
              defaultSelectedKeys={[validateOptionsPath(location.pathname)]}
              className="menu"
              onClick={handleMenuClick}
              items={menuItems}
            />
          </Sider>
          <Layout className=" layout-content">
            <div className="padding-content">
              <Routes>
                <Route path="/commits" element={<Commits />} />
                <Route path="/dashboard" element={<Dashboard />} />

                <Route path="*" element={<NotFound />} />
              </Routes>
            </div>
          </Layout>
        </Layout>
      </Layout>
    </div>
  );
}

export default App;
