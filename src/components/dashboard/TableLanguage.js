import {  Table } from "antd";
import React from "react";
const columns = [
  {
    title: "Language",
    dataIndex: "language",
    key: "language",
  },
  {
    title: "Lines",
    dataIndex: "lines",
    key: "lines",
  },
  {
    title: "Percent",
    dataIndex: "percent",
    key: "percent",
  },
];

const TableLanguage = ({ title, data }) => {
  return (
    <div className="doughnut-container">
      <div className="doughnut-title">
        <h3>{title}</h3>
      </div>
      <div className="table-language-body">
        <Table columns={columns} dataSource={data} />
      </div>
    </div>
  );
};

export default TableLanguage;
