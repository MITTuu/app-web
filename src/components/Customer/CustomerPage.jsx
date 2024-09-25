import React from 'react';
import FilterForm from './FilterForm';
import CustomersTable from './CustomersTable';
import CustomerDetails from './CustomerDetails';
import { Modal } from 'react-bootstrap';

class CustomerPage extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            filters: {
                customerName: '',
                customerCategory: '',
                deliveryMethod: ''
            },
            selectedCustomerID: null,
            showModal: false
        };
    }

    handleFilterChange = (filters) => {
        this.setState({ filters });
    };

    handleShowDetails = (customerID) => {
        this.setState({
            selectedCustomerID: customerID,
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
        const { filters, showModal, selectedCustomerID } = this.state;

        return (
            <div className="container mt-5">
                <h1>Clientes</h1>
                <br/>
                <FilterForm onFilterChange={this.handleFilterChange} />
                <CustomersTable filters={filters} onShowDetails={this.handleShowDetails} />

                <Modal show={showModal} onHide={this.handleCloseModal}>
                    <Modal.Header closeButton>
                        <Modal.Title>Detalles del Cliente</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        {selectedCustomerID && <CustomerDetails customerID={selectedCustomerID} />}
                    </Modal.Body>
                </Modal>
            </div>
        );
    }
}

export default CustomerPage;