import { Table, Space, Popconfirm, Tag } from "antd";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import http from "../../../services/http";
const BASE = process.env.REACT_APP_API_URI;
const { Column } = Table;

export default function OrderTable() {
  const [refresh, setRefresh] = useState(false);
  const [data, setData] = useState([]);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        let res = await http.get(BASE + "/api/orders");
        console.log(res.data.allOrders);
        setData(res.data.allOrders);
      } catch (error) {}
    };
    fetchOrders();
  }, [refresh]);

  const changeStatus = async (id, status) => {
    try {
      await http.put(BASE + "/api/orders/" + id, { status: status });
    } catch (error) {}
    toast.success("Updated successfully.");
    setRefresh(!refresh);
  };

  const setColor = (status) => {
    if (status === "pending") {
      return "blue";
    } else if (status === "shipped") {
      return "orange";
    } else {
      return "green";
    }
  };

  return (
    <Table dataSource={data}>
      <Column title="Buyer" dataIndex="buyer" key="buyer" />
      <Column title="Email" dataIndex="email" key="email" />
      <Column title="Paid ($)" dataIndex="total" key="total" />
      <Column
        title="Status"
        dataIndex="status"
        key="status"
        render={(status, record) => (
          <>
            <Tag color={setColor(status)} key={record._id}>
              {status}
            </Tag>
          </>
        )}
      />
      <Column
        title="Action"
        key="action"
        render={(text, record) => (
          <Space size="middle">
            {record?.status === "pending" && (
              <Popconfirm
                title="Sure to mark shipped?"
                onConfirm={() => changeStatus(record._id, "shipped")}
                okButtonProps={{
                  className: "btn btn-dark",
                }}
              >
                <div className="rounded cursor-pointer text-white bg-orange-400 px-4 py-2 hover:bg-orange-500">
                  Mark Shipped
                </div>
              </Popconfirm>
            )}
            {record?.status === "shipped" && (
              <Popconfirm
                title="Sure to mark delivered?"
                onConfirm={() => changeStatus(record._id, "delivered")}
                okButtonProps={{
                  className: "btn btn-dark",
                }}
              >
                <div className="rounded cursor-pointer text-white bg-green-400 px-4 py-2 hover:bg-green-500">
                  Mark Delivered
                </div>
              </Popconfirm>
            )}
            {record?.status === "delivered" && (
              <div className="text-lg cursor-pointer text-green-400 hover:text-green-500">
                <i class="fa-solid fa-check"></i>
                Delivered
              </div>
            )}
          </Space>
        )}
      />
    </Table>
  );
}
