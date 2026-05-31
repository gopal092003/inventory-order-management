import { useMemo, useState } from "react";
import { Plus } from "lucide-react";

import PageHeader from "../../components/layout/PageHeader";
import SearchBar from "../../components/shared/SearchBar";
import ConfirmDialog from "../../components/ui/ConfirmDialog";

import ProductTable from "./ProductTable";
import ProductModal from "./ProductModal";

import useFetch from "../../hooks/useFetch";

import {
  searchByFields,
} from "../../utils/helpers";

import {
  getProducts,
  deleteProduct,
} from "./api";

import {
  notify,
} from "../../components/ui/ToastProvider";

const Products = () => {
  const {
    data: products = [],
    loading,
    refetch,
  } = useFetch(getProducts);

  const [search, setSearch] =
    useState("");

  const [isModalOpen, setIsModalOpen] =
    useState(false);

  const [
    selectedProduct,
    setSelectedProduct,
  ] = useState(null);

  const [
    showDeleteDialog,
    setShowDeleteDialog,
  ] = useState(false);

  const [
    deleting,
    setDeleting,
  ] = useState(false);

  // ==========================================
  // Search
  // ==========================================

  const filteredProducts =
    useMemo(() => {
      return searchByFields(
        products,
        search,
        [
          "name",
          "sku",
        ]
      );
    }, [products, search]);

  // ==========================================
  // Modal Actions
  // ==========================================

  const openCreateModal =
    () => {
      setSelectedProduct(null);
      setIsModalOpen(true);
    };

  const openEditModal = (
    product
  ) => {
    setSelectedProduct(
      product
    );

    setIsModalOpen(true);
  };

  const closeModal = () => {
    setSelectedProduct(null);
    setIsModalOpen(false);
  };

  // ==========================================
  // Delete
  // ==========================================

  const openDeleteDialog = (
    product
  ) => {
    setSelectedProduct(
      product
    );

    setShowDeleteDialog(true);
  };

  const closeDeleteDialog =
    () => {
      setSelectedProduct(null);
      setShowDeleteDialog(false);
    };

  const handleDelete =
    async () => {
      if (
        !selectedProduct
      ) {
        return;
      }

      try {
        setDeleting(true);

        await deleteProduct(
          selectedProduct.id
        );

        notify.success(
          "Product deleted successfully."
        );

        await refetch();

        closeDeleteDialog();
      } catch (error) {
        notify.error(
          error.message
        );
      } finally {
        setDeleting(false);
      }
    };

  return (
    <>
      <PageHeader
        title="Products"
        description="Manage inventory products and stock levels."
        actionLabel="Add Product"
        actionIcon={
          <Plus size={16} />
        }
        onAction={
          openCreateModal
        }
      />

      <div className="page-toolbar">
        <SearchBar
          value={search}
          onChange={setSearch}
          placeholder="Search products by name or SKU..."
        />
      </div>

      <ProductTable
        products={
          filteredProducts
        }
        loading={loading}
        onEdit={
          openEditModal
        }
        onDelete={
          openDeleteDialog
        }
      />

      <ProductModal
        isOpen={isModalOpen}
        product={
          selectedProduct
        }
        onClose={
          closeModal
        }
        onSuccess={refetch}
      />

      <ConfirmDialog
        isOpen={
          showDeleteDialog
        }
        title="Delete Product"
        message={`Are you sure you want to delete "${selectedProduct?.name}"? This action cannot be undone.`}
        confirmText="Delete"
        loading={deleting}
        variant="danger"
        onConfirm={
          handleDelete
        }
        onClose={
          closeDeleteDialog
        }
      />
    </>
  );
};

export default Products;