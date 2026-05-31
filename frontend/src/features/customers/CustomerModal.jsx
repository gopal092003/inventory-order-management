import Modal from "../../components/ui/Modal";
import CustomerForm from "./CustomerForm";

const CustomerModal = ({
  isOpen,
  customer,
  onClose,
  onSuccess,
}) => {
  const handleSuccess = async () => {
    if (onSuccess) {
      await onSuccess();
    }

    onClose();
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title={
        customer
          ? "Edit Customer"
          : "Add Customer"
      }
    >
      <CustomerForm
        customer={customer}
        onSuccess={handleSuccess}
        onCancel={onClose}
      />
    </Modal>
  );
};

export default CustomerModal;
