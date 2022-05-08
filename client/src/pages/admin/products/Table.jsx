import { Table, Space, Popconfirm, message } from "antd";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import http from "../../../services/http";

const { Column } = Table;

const BASE = process.env.REACT_APP_API_URI;

function App({ refresh, setRefresh, showEdit, editItem }) {
  const [data, setData] = useState([]);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        let res = await http.get(BASE + "/api/products");
        setData(res.data.allProducts);
      } catch (error) {
        toast.error(error);
      }
    };
    fetchProducts();
  }, [refresh]);

  const onRemove = async (product) => {
    try {
      await http.delete(`${BASE}/api/products/${product._id}`);
      message.success("Deleted successfully.");
      setRefresh();
    } catch (err) {}
  };

  return (
    <Table dataSource={data}>
      <Column title="Full Name" dataIndex="name" key="name" />
      <Column title="Stocks" dataIndex="stock" key="stock" />
      <Column title="Actual Price" dataIndex="actualPrice" key="actualPrice" />
      <Column
        title="Discounted Price"
        dataIndex="discountedPrice"
        key="discountedPrice"
      />
      <Column
        title="Action"
        key="action"
        render={(text, record) => (
          <Space size="middle">
            <div
              className="text-lg cursor-pointer text-blue-400 hover:text-blue-700"
              onClick={() => {
                editItem(record);
                showEdit();
              }}
            >
              <i className="fa-solid fa-pen-to-square mx-1"></i>
              Edit
            </div>
            <Popconfirm
              title="Sure to remove?"
              onConfirm={() => onRemove(record)}
              okButtonProps={{
                className: "btn btn-dark",
              }}
            >
              <div className="text-lg cursor-pointer text-red-400 hover:text-red-500">
                <i className="fa-solid fa-trash-can mx-1"></i>
                Delete
              </div>
            </Popconfirm>
          </Space>
        )}
      />
    </Table>
  );
}

export default App;
