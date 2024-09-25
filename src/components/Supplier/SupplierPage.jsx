import React from "react";
import FilterForm from './FilterForm';
import SupplierTable from './SupplierTable';
import SupplierDetails from "./SupplierDetails";
import { Modal } from "react-bootstrap";

class supplierPage extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            filters: {
                supplierName: '',
                supplierCategory: '',
                deliveryMethod: ''
            },
            selectedSupplierID: null,
            showModal: false
        };
    }

    handleFilterChange = (filters) => {
        this.setState({ filters });
    };

    handleShowDetails = (supplierID) => {
        this.setState({
            selectedSupplierID: supplierID,
            showModal: true
        });
    };

    handleCloseModal = () => {
        this.setState({
            showModal: false,
            selectedCustomerID: null
        });
    };

    render() {
        const { filters, showModal, selectedSupplierID } = this.state;

        return (
            <div className="container mt-5">
                <h1>Proveedores</h1>
                <br />
                <FilterForm onFilterChange={this.handleFilterChange} />
                <SupplierTable filters={filters} onShowDetails={this.handleShowDetails} />
                <Modal show={showModal} onHide={this.handleCloseModal}>
                    <Modal.Header closeButton>
                        <Modal.Title>Detalles del Proveedor</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        {selectedSupplierID && <SupplierDetails supplierID={selectedSupplierID} />}
                    </Modal.Body>
                </Modal>   
            </div>
        );

    }
}

export default supplierPage;