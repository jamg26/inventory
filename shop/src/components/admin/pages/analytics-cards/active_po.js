import React, { useState, useEffect } from "react";
import axios from "axios";
import { Typography, Table, Space, Empty } from "antd";
import { api_base_url } from "../../../../keys/index";
import {
  ArrowRightOutlined,
  UserOutlined,
  ShoppingCartOutlined,
} from "@ant-design/icons";
const { Text } = Typography;
function UserCount({ po }) {
  const [filteredlist, setfilteredlist] = useState([]);
  useEffect(() => {
    console.log("po", po);
    if (po.length != 0) {
      const temp = [];
      for (let c = 0; c < po.length; c++) {
        if (po[c].status == "Open") {
          temp.push({
            _id: po[c]._id,
            po_no: po[c].po_no,
            name: po[c].transfer_name,
            type: po[c].type,
            status: po[c].status,
          });
        }
      }
      setfilteredlist(temp);
    }
  }, [po]);
  const columns = [
    {
      title: "No.",
      dataIndex: "po_no",
      key: "po_no",
    },
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "Type",
      dataIndex: "type",
      key: "type",
    },
    {
      title: "Status",
      dataIndex: "status",
      key: "status",
      align: "center",
      render: (value, row, index) => {
        if (value == "Issued") {
          return [
            <Typography key={index} style={{ color: "Green" }}>
              {value}
            </Typography>,
          ];
        } else if (value == "Void") {
          return [
            <Typography key={index} style={{ color: "Red" }}>
              {value}
            </Typography>,
          ];
        } else if (value == "DRAFT") {
          return [
            <Typography key={index} style={{ color: "Orange" }}>
              {"Draft"}
            </Typography>,
          ];
        } else {
          return [<Typography key={index}>{value}</Typography>];
        }
      },
    },
  ];
  return [
    <div style={{ overflow: "auto", maxHeight: "30vh", minHeight: "30vh" }}>
      {filteredlist.length != 0 ? (
        <Table
          columns={columns}
          dataSource={filteredlist}
          pagination={{ position: ["bottomCenter"], size: "small" }}
        />
      ) : (
        <Empty />
      )}
    </div>,
  ];
}

export default UserCount;
