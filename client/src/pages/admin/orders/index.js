import { Button } from "antd";
import React from "react";
import OrderTable from "./Table";
import { useNavigate } from "react-router-dom";

const AdminOrdersPage = () => {
  const navigate = useNavigate();

  return (
    <div className="w-full h-full p-10">
      <div className="flex justify-between mb-8">
        <Button
          onClick={() => navigate(-1)}
          type="link"
          className="justify-self-end"
        >
          &larr; Back
        </Button>
        <h2 className="text-4xl font-semibold">Orders</h2>
        <div></div>
      </div>
      <OrderTable />
    </div>
  );
};

export default AdminOrdersPage;
