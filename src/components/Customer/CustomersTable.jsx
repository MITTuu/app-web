import React from 'react';
import { fetchCustomers } from '../../services/apirest';

class CustomersTable extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            customerList: [],
            loading: true,
            error: null
        };
    }

    async componentDidMount() {
        await this.loadCustomers();
    }

    async componentDidUpdate(prevProps) {
        // Si los filtros cambian, recargar los clientes
        if (prevProps.filters !== this.props.filters) {
            await this.loadCustomers();
        }
    }

    loadCustomers = async () => {
        const { customerName, customerCategory, deliveryMethod } = this.props.filters;
        try {
            const customers = await fetchCustomers(customerName, customerCategory, deliveryMethod);
            this.setState({ customerList: customers, loading: false });
        } catch (error) {
            console.error(error);
            this.setState({ error: error.message || 'Error fetching customers', loading: false });
        }
    };

    render() {
        const { customerList, loading, error } = this.state;

        if (loading) return <div>Cargando...</div>;
        if (error) return <div>{error}</div>;

        return (
            <table className="table">
                <thead>
                    <tr>
                        <th>Nombre del Cliente</th>
                        <th>Categoría</th>
                        <th>Método de Entrega</th>
                        <th>Acción</th>
                    </tr>
                </thead>
                <tbody>
                    {customerList.map((customer, index) => (
                        <tr key={index}>
                            <td>{customer.customerName}</td>
                            <td>{customer.customerCategoryName}</td>
                            <td>{customer.deliveryMethodName}</td>
                            <td>
                                <button 
                                    type="button" 
                                    className="btn btn-primary"
                                    onClick={() => this.props.onShowDetails(customer.customerID)}
                                >
                                    Ver detalle
                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        );
    }
}

export default CustomersTable;