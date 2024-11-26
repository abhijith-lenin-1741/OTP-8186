import React from "react";
import {
  LaptopOutlined,
  NotificationOutlined,
  UserOutlined,
} from "@ant-design/icons";
import { Breadcrumb, Layout, Menu, theme } from "antd";
import TodoList from "./TodoList";
import { useDispatch, useSelector } from "react-redux";
import { findTodo } from "../utils/services";
import { changeStatus, getModifyData, toggleModal } from "../Redux/todoSlice";
import { Link, useNavigate } from "react-router-dom";

const Layouts = () => {
  const todo = useSelector((state) => state?.todo?.items);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { Header, Content, Footer, Sider } = Layout;
  const items1 = ["View All Task"].map((item, key) => ({
    key,
    label: item,
  }));
  const person = ["View Task Added"];
  const items2 = person.map((item, index) => {
    const key = String(index + 1);
    return {
      key: `sub${key}`,
      icon: React.createElement(UserOutlined),
      label: `${item}`,
      children: todo?.map((todo, pindex) => {
        const subKey = todo?.taskName;
        return {
          key: todo?.id,
          label: subKey,
        };
      }),
    };
  });
  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();

  const handleClick = ({ key }) => {
    const response = findTodo(key, todo);
    dispatch(toggleModal());
    dispatch(getModifyData(response));
  };
  const handleNavigate = () => {
    navigate("/allTask")
  }
  return (
    <Layout>
      <Header
        style={{
          display: "flex",
          alignItems: "center",
        }}
      >
        <div className="demo-logo" />
          <Menu
            theme="dark"
            mode="horizontal"
            defaultSelectedKeys={["2"]}
            items={items1}
            style={{
              flex: 1,
              minWidth: 0,
            }}
            onClick={handleNavigate}
          />
      </Header>
      <Content
        style={{
          padding: "0 48px",
        }}
      >
        <Breadcrumb
          style={{
            margin: "16px 0",
          }}
        >
          <Breadcrumb.Item>Home</Breadcrumb.Item>
          <Breadcrumb.Item onClick={() => dispatch(changeStatus())} className="cursor-pointer">Add New Task</Breadcrumb.Item>

        </Breadcrumb>
        <Layout
          style={{
            padding: "24px 0",
            background: colorBgContainer,
            borderRadius: borderRadiusLG,
          }}
        >
          <Sider
            style={{
              background: colorBgContainer,
            }}
            width={200}
          >
            <Menu
              mode="inline"
              defaultSelectedKeys={["1"]}
              defaultOpenKeys={["sub1"]}
              style={{
                height: "100%",
              }}
              items={items2}
              onClick={handleClick}
            />
          </Sider>
          <Content
            style={{
              padding: "0 24px",
              minHeight: 280,
            }}
          >
            <TodoList />
          </Content>
        </Layout>
      </Content>
      <Footer
        style={{
          textAlign: "center",
        }}
      >
        Todo Design ©{new Date().getFullYear()} Created by Abhijith Lenin
      </Footer>
    </Layout>
  );
};
export default Layouts;
