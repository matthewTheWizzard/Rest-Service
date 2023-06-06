import {useState} from "react";
import styles from './GatewayForm.module.css'

const GatewayForm = ({ onAddGateway }) => {
    const [newGateway, setNewGateway] = useState({
        serialNumber: '',
        name: '',
        ipv4: '',
    });

    const handleInputChange = e => {
        setNewGateway({ ...newGateway, [e.target.name]: e.target.value });
    };

    const handleAddGateway = e => {
        e.preventDefault();
        onAddGateway(newGateway);
        setNewGateway({ serialNumber: '', name: '', ipv4: '' });
    };

    return (
        <form className={styles.form} onSubmit={handleAddGateway}>
            <h2>Add a Gateway</h2>
            <label htmlFor="serialNumber">Serial Number:</label>
            <input
                type="text"
                id="serialNumber"
                name="serialNumber"
                value={newGateway.serialNumber}
                onChange={handleInputChange}
            />

            <label htmlFor="name">Name:</label>
            <input
                type="text"
                id="name"
                name="name"
                value={newGateway.name}
                onChange={handleInputChange}
            />

            <label htmlFor="ipv4">IP Address:</label>
            <input
                type="text"
                id="ipv4"
                name="ipv4"
                value={newGateway.ipv4}
                onChange={handleInputChange}
            />

            <button type="submit">Add Gateway</button>
        </form>
    );
};

export { GatewayForm };