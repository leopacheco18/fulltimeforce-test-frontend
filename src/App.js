import { Layout, Menu } from "antd";
import "./App.css";
import { Header } from "antd/es/layout/layout";
import Sider from "antd/es/layout/Sider";
import { Route, Routes, useLocation, useNavigate } from "react-router-dom";
import { BarChartOutlined, BranchesOutlined }  from "@ant-design/icons";
import { useState } from "react";
import Dashboard from "./pages/dashboard/Dashboard";
import Commits from "./pages/commits/Commits";
import NotFound from "./pages/notFound/NotFound";

function App() {
  const navigate = useNavigate();
  const location = useLocation()
  
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
    if(menuItems.find((item) => item.key === path)){
      return path
    }
    return '/commits';
  
  }
  return (
    <div className="h-full">
        <Layout
          className="animation layout-expanded"
        >
          <Header
            className="animation header-expanded"
          ></Header>
          <Layout>
              <Sider
                breakpoint="lg"
                className={`animation sider-expanded b-shadow`}
                collapsible
                collapsed={collapsed}
                onCollapse={(value) => setCollapsed(value)}
              >
                <Menu
                  mode="inline"
                  defaultSelectedKeys={[validateOptionsPath(location.pathname)]}
                  style={{
                    height: "100%",
                    borderRight: 0,
                  }}
                  onClick={handleMenuClick}
                  items={menuItems}
                />
              </Sider>
              <Layout className="padding-content layout-content">
                <Routes>
                  <Route path="/commits" element={<Commits />} />
                  <Route path="/dashboard" element={<Dashboard />} />

                  <Route path="*" element={<NotFound />} />
                </Routes>
              </Layout>
          </Layout>
        </Layout>

    </div>
  );
}

export default App;
