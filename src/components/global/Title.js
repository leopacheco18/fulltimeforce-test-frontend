import React from "react";
import { ReloadOutlined } from "@ant-design/icons";
import { Button } from "antd";

const Title = ({ title = "", reload }) => {
  return (
    <div>
      <h2 className="title">
        {title}
        <Button type="default" className="float-right" onClick={reload}>
          <ReloadOutlined />
        </Button>
      </h2>
      <hr className="title-hr" />
    </div>
  );
};

export default Title;
