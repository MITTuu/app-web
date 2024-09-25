import axios from 'axios';

const apiUrl = 'http://localhost:5299/api/';

export const fetchCustomers = async (customerName = null, customerCategory = null, deliveryMethod = null) => {
    try {
        // Crear un objeto con los parámetros opcionales
        const params = {};
        if (customerName) params.customerName = customerName;
        if (customerCategory) params.customerCategory = customerCategory;
        if (deliveryMethod) params.deliveryMethod = deliveryMethod;

        // Realizar la solicitud GET con los parámetros
        const response = await axios.get(apiUrl + "Customers", { params });
        return response.data;
    } catch (error) {
        console.error('Error al obtener los clientes:', error);
        throw error;
    }
};

export const fetchCustomer = async (customerID = null) => {
    try {
        // Realizar la solicitud GET 
        const response = await axios.get(apiUrl + "Customers/" + customerID);
        return response.data;
    } catch (error) {
        console.error('Error al obtener los detalles del cliente:', error);
        throw error;
    }
};

export const fetchSuppliers = async (supplierName = null, supplierCategory = null, deliveryMethod = null) => {
    try {
        // Crear un objeto con los parámetros opcionales
        const params = {};
        if (supplierName) params.supplierName = supplierName;
        if (supplierCategory) params.supplierCategory = supplierCategory;
        if (deliveryMethod) params.deliveryMethod = deliveryMethod;

        // Realizar la solicitud GET con los parámetros
        const response = await axios.get(apiUrl + "Supplier", { params });
        return response.data;
    } catch (error) {
        console.error('Error al obtener los proveedores:', error);
        throw error;
    }
};

export const fetchSupplier = async (supplierID = null) => {
    try {
        // Realizar la solicitud GET 
        const response = await axios.get(apiUrl + "Supplier/" + supplierID);
        return response.data;
    } catch (error) {
        console.error('Error al obtener los detalles del proveedor:', error);
        throw error;
    }
};