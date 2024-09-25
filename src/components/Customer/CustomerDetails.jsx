import React from 'react';
import { fetchCustomer } from '../../services/apirest';
import MapView from '../Map/MapView';

class CustomerDetails extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            customer: null,
            loading: true,
            error: null
        };
    }

    async componentDidMount() {
        await this.loadCustomer();
    }

    componentDidUpdate(prevProps) {
        if (prevProps.customerID !== this.props.customerID) {
            this.loadCustomer();
        }
    }

    loadCustomer = async () => {
        const { customerID } = this.props;
        if (!customerID) return;

        try {
            const customer = await fetchCustomer(customerID);
            this.setState({ customer, loading: false });
        } catch (error) {
            console.error(error);
            this.setState({ error: error.message || 'Error fetching customer', loading: false });
        }
    };

    getCoordinates = (location) => {
        const regex =  /POINT \(([^ ]+) ([^ ]+)\)/;
        const match = location.match(regex);
        if (match) {
            return {
                lat: parseFloat(match[2]),
                lng: parseFloat(match[1]),
            }
        }
        return null;
    }

    render() {

        const { customer, loading, error } = this.state;

        if (loading) return <div>Cargando...</div>;
        if (error) return <div>{error}</div>;
        
        const deliveryCoordinates = customer.deliveryLocation ? this.getCoordinates(customer.deliveryLocation) : null;

        return (
            <div className="mt-4">
                <p><strong>ID:</strong> {customer.customerID}</p>
                <p><strong>Nombre:</strong> {customer.customerName}</p>
                <p><strong>Categoría:</strong> {customer.customerCategoryName}</p>
                <p><strong>Grupo de Compra:</strong> {customer.buyingGroupName}</p>
                <p><strong>Contacto Primario:</strong> {customer.primaryContact}</p>
                <p><strong>Contacto Alternativo:</strong> {customer.alternateContact}</p>
                <p><strong>Cliente a Facturar:</strong> {customer.billToCustomer}</p>
                <p><strong>Método de Entrega:</strong> {customer.deliveryMethodName}</p>
                <p><strong>Ciudad de Entrega:</strong> {customer.deliveryCity}</p>
                <p><strong>Código Postal:</strong> {customer.deliveryPostalCode}</p>
                <p><strong>Teléfono:</strong> {customer.phoneNumber}</p>
                <p><strong>Fax:</strong> {customer.faxNumber}</p>
                <p><strong>Días de Gracia:</strong> {customer.paymentDays}</p>
                <p><strong>Sitio Web:</strong> <a href={customer.websiteURL}>{customer.websiteURL}</a></p>
                <p><strong>Dirección de Entrega 1:</strong> {customer.deliveryPostal1}</p>
                <p><strong>Dirección de Entrega 2:</strong> {customer.deliveryPostal2}</p>
                <p><strong>Ubicación de entrega:</strong> <span></span></p>
                {deliveryCoordinates && (
                    <div>
                        <MapView position={[deliveryCoordinates.lat,deliveryCoordinates.lng]}></MapView>
                    </div>
                )}
            </div>
        );
    }
}

export default CustomerDetails;