import React from "react";
import { fetchSuppliers } from '../../services/apirest';

class SupplierTable extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            supplierList: [],
            loading: true,
            error: null
        };
    }

    async componentDidMount() {
        await this.loadSuppliers();
    }

    async componentDidUpdate(prevProps) {
        // Si los filtros cambian, recargar los proveedores
        if (prevProps.filters !== this.props.filters) {
            await this.loadSuppliers();
        }
    }

    loadSuppliers = async () => {
        const { supplierName, supplierCategory, deliveryMethod } = this.props.filters;

        try {
            const suppliers = await fetchSuppliers(supplierName, supplierCategory, deliveryMethod);
            this.setState({ supplierList: suppliers, loading: false });
        } catch (error) {
            console.log(error);
            this.setState({ error: error.message || 'Error fetching suppliers', loading: false })
        }
    };

    render() {
        const { supplierList, loading, error } = this.state;

        if (loading) return <div>Cargando...</div>;
        if (error) return <div>{error}</div>;
        return (
            <table className="table">
                <thead>
                    <tr>
                        <th>Nombre del Proveedor</th>
                        <th>Categoría</th>
                        <th>Método de Entrega</th>
                        <th>Acción</th>                      
                    </tr>
                </thead>
                <tbody>
                    {supplierList.map((supplier, index) => (
                        <tr key={index}>
                            <td>{supplier.supplierName}</td>
                            <td>{supplier.supplierCategoryName}</td>
                            <td>{supplier.deliveryMethodName}</td>
                            <td>
                                <button 
                                    type="button" 
                                    className="btn btn-primary"
                                    onClick={() => this.props.onShowDetails(supplier.supplierID)}
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

export default SupplierTable;