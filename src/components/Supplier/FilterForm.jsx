import React from "react";

class FilterForm extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            supplierName: '',
            supplierCategory: '',
            deliveryMethod: ''
        };
    }

    handleInputChange = (e) => {
        const { name, value } = e.target;
        this.setState({ [name]: value }, () => {
            // Llamar a la función de filtro del padre automáticamente después de actualizar el estado
            this.props.onFilterChange(this.state);
        });
    };

    handleReset = () => {
        this.setState({
            customerName: '',
            customerCategory: '',
            deliveryMethod: ''
        });
        // Restablecer los filtros en el padre
        this.props.onFilterChange({
            supplierName: '',
            supplierCategory: '',
            deliveryMethod: ''
        });
    };

    render() {
        return (
            <form className="mb-4">
                <div className="row">
                    <div className="col">
                        <input
                            type="text"
                            name="supplierName"
                            className="form-control"
                            placeholder="Nombre del proveedor"
                            value={this.state.supplierName}
                            onChange={this.handleInputChange} 
                        />
                    </div>
                    <div className="col">
                        <input
                            type="text"
                            name="supplierCategory"
                            className="form-control"
                            placeholder="Categoría"
                            value={this.state.supplierCategory}
                            onChange={this.handleInputChange} 
                        />
                    </div>
                    <div className="col">
                        <input
                            type="text"
                            name="deliveryMethod"
                            className="form-control"
                            placeholder="Método de entrega"
                            value={this.state.deliveryMethod}
                            onChange={this.handleInputChange}
                        />
                    </div>
                    <div className="col-auto">
                        <button type="button" className="btn btn-secondary mx-2" onClick={this.handleReset}>Restaurar filtros</button>
                    </div>                 
                </div>
            </form>
        );
    }

}

export default FilterForm;