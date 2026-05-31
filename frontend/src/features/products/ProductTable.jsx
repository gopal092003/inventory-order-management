import PropTypes from "prop-types";
import {
  Edit,
  Trash2,
} from "lucide-react";

import DataTable from "../../components/shared/DataTable";
import StatusBadge from "../../components/shared/StatusBadge";

import { formatCurrency } from "../../utils/formatCurrency";

const ProductTable = ({
  products,
  loading,
  onEdit,
  onDelete,
}) => {
  const getStockBadge = (
    stockQuantity
  ) => {
    if (stockQuantity === 0) {
      return (
        <StatusBadge
          status="danger"
          label="Out of Stock"
        />
      );
    }

    if (stockQuantity <= 10) {
      return (
        <StatusBadge
          status="warning"
          label="Low Stock"
        />
      );
    }

    return (
      <StatusBadge
        status="success"
        label="In Stock"
      />
    );
  };

  const columns = [
    {
      key: "name",
      title: "Product Name",
    },

    {
      key: "sku",
      title: "SKU",
    },

    {
      key: "price",
      title: "Price",
      render: (row) =>
        formatCurrency(
          row.price
        ),
    },

    {
      key: "stock_quantity",
      title: "Stock",
    },

    {
      key: "status",
      title: "Status",
      render: (row) =>
        getStockBadge(
          row.stock_quantity
        ),
    },

    {
      key: "actions",
      title: "Actions",
      render: (row) => (
        <div className="table-actions">
          <button
            type="button"
            className="table-action table-action--edit"
            onClick={() =>
              onEdit(row)
            }
            aria-label="Edit product"
          >
            <Edit size={16} />
          </button>

          <button
            type="button"
            className="table-action table-action--delete"
            onClick={() =>
              onDelete(row)
            }
            aria-label="Delete product"
          >
            <Trash2 size={16} />
          </button>
        </div>
      ),
    },
  ];

  return (
    <DataTable
      columns={columns}
      data={products}
      loading={loading}
      emptyTitle="No Products Found"
      emptyDescription="Create your first product to start managing inventory."
    />
  );
};

ProductTable.propTypes = {
  products: PropTypes.array,
  loading: PropTypes.bool,
  onEdit: PropTypes.func.isRequired,
  onDelete: PropTypes.func.isRequired,
};

export default ProductTable;