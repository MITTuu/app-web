import React from "react";
import { fetchSupplier } from "../../services/apirest";
import MapView from "../Map/MapView";

class SupplierDetails extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            supplier: null,
            loading: true,
            error: null
        };
    }

    async componentDidMount() {
        await this.loadSupplier();
    }

    componentDidUpdate(prevProps) {
        if (prevProps.supplierID !== this.props.supplierID) {
            this.loadSupplier();
        }
    }

    loadSupplier = async () => {
        const { supplierID } = this.props;

        if (!supplierID) return;

        try {
            const supplier = await fetchSupplier(supplierID);
            this.setState({ supplier, loading: false });
        } catch (error) {
            console.log(error);
            this.setState({ error: error.message || 'Error fetching suppliers', loading: false })
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
        const { supplier, loading, error } = this.state;
        
        if (loading) return <div>Cargando...</div>;
        if (error) return <div>{error}</div>;
        
        const deliveryCoordinates = supplier.deliveryLocation ? this.getCoordinates(supplier.deliveryLocation) : null;

        return (
            <div className="mt-4">
                <p><strong>ID:</strong> {supplier.supplierID}</p>
                <p><strong>Código del Proveedor:</strong> {supplier.supplierReference}</p>
                <p><strong>Nombre:</strong> {supplier.supplierName}</p>
                <p><strong>Categoría:</strong> {supplier.supplierCategoryName}</p>
                <p><strong>Contacto Primario:</strong> {supplier.primaryContact}</p>
                <p><strong>Contacto Alternativo:</strong> {supplier.alternateContact}</p>
                <p><strong>Método de Entrega:</strong> {supplier.deliveryMethodName}</p>
                <p><strong>Ciudad de Entrega:</strong> {supplier.deliveryCity}</p>
                <p><strong>Código Postal:</strong> {supplier.deliveryPostalCode}</p>
                <p><strong>Teléfono:</strong> {supplier.phoneNumber}</p>
                <p><strong>Fax:</strong> {supplier.faxNumber}</p>
                <p><strong>Días de Gracia:</strong> {supplier.paymentDays}</p>
                <p><strong>Sitio Web:</strong> <a href={supplier.websiteURL}>{supplier.websiteURL}</a></p>
                <p><strong>Dirección de Entrega 1:</strong> {supplier.deliveryPostal1}</p>
                <p><strong>Dirección de Entrega 2:</strong> {supplier.deliveryPostal2}</p>
                <p><strong>Banco:</strong> {supplier.bankAccountName}</p>
                <p><strong>Número de cuenta cliente:</strong> {supplier.bankAccountNumber}</p>
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

export default SupplierDetails;