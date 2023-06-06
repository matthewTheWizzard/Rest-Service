import {useState} from "react";
import styles from './GatewayForm.module.css'
import { Validate } from "../../utils/validate.js";

const GatewayForm = ({ onAddGateway }) => {
    const [newGateway, setNewGateway] = useState({
        serialNumber: '',
        name: '',
        ipv4: '',
    });

    const [errors, setErrors] = useState({
        serialNumber: null,
        name: null,
        ipv4: null,
    })

    const handleInputChange = e => {
        setNewGateway({ ...newGateway, [e.target.name]: e.target.value });
    };

    const handleAddGateway = e => {
        e.preventDefault();

        const validate = new Validate(newGateway)
        validate.ifEmpty(newGateway)
        validate.checkIp(newGateway.ipv4)

        const hasErrors = validate.hasErrors();
        if (hasErrors) {
            setErrors(validate.errors)
        } else {
            onAddGateway(newGateway);
            setErrors({
                serialNumber: null,
                name: null,
                ipv4: null,
            })
            setNewGateway({ serialNumber: '', name: '', ipv4: '' });
        }
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
            {errors.serialNumber && <span className={styles.error}>{errors.serialNumber}</span>}
            <label htmlFor="name">Name:</label>
            <input
                type="text"
                id="name"
                name="name"
                value={newGateway.name}
                onChange={handleInputChange}
            />
            {errors.name && <span className={styles.error}>{errors.name}</span>}
            <label htmlFor="ipv4">IP Address:</label>
            <input
                type="text"
                id="ipv4"
                name="ipv4"
                value={newGateway.ipv4}
                onChange={handleInputChange}
            />
            {errors.ipv4 && <span className={styles.error}>{errors.ipv4}</span>}
            <button type="submit">Add Gateway</button>
        </form>
    );
};

export { GatewayForm };