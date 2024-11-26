import React from "react";
import { Col, Row } from "antd";
import { Link } from "react-router-dom";
const Header = () => {
  return (
    <div className="header">
      <Row className="bg-blue-400 h-16">
      <Col span={12}>
      <Link to={"/"}><button className="p-2 m-2 bg-slate-500 text-white">Go Back</button></Link>
      </Col>
      <Col span={12} className="pt-4 font-bold text-sm">All Task Details</Col>
      </Row>
    </div>
  );
};

export default Header;
