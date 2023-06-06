import React, { useState } from 'react';
import styles from './DeviceForm.module.css'
import { Validate } from "../../utils/validate.js";

const DeviceForm = ({ gatewayId, onAddDevice }) => {
    const [newDevice, setNewDevice] = useState({
        uid: '',
        vendor: '',
        status: 'online',
    });

    const [errors, setErrors] = useState({
        uid: null,
        vendor: null,
    });

    const handleAddDevice = e => {
        e.preventDefault();

        const validate = new Validate(newDevice)

        validate.ifEmpty(newDevice);
        validate.checkUid(newDevice.uid)
        const errors = validate.hasErrors()
        if (errors) {
            setErrors(validate.errors)
        } else {
            onAddDevice(gatewayId, newDevice);
            setNewDevice({ uid: '', vendor: '', status: 'online' });
            setErrors({ uid: null, vendor: null })
        }
    };

    const handleDeviceChange = e => {
        setNewDevice({ ...newDevice, [e.target.name]: e.target.value });
    };

    return (
        <form className={styles.form} onSubmit={handleAddDevice}>
            <h3>Add Device</h3>
            <label htmlFor="uid">UID:</label>
            <input
                type="text"
                id="uid"
                name="uid"
                value={newDevice.uid}
                onChange={handleDeviceChange}
            />
            {errors.uid && <span className={styles.error}>{errors.uid}</span>}
            <br />
            <label htmlFor="vendor">Vendor:</label>
            <input
                type="text"
                id="vendor"
                name="vendor"
                value={newDevice.vendor}
                onChange={handleDeviceChange}
            />
            {errors.vendor && <span className={styles.error}>{errors.vendor}</span>}
            <label htmlFor="status">Status:</label>
            <select
                id="status"
                name="status"
                value={newDevice.status}
                onChange={handleDeviceChange}
            >
                <option value="online">Online</option>
                <option value="offline">Offline</option>
            </select>
            <br />
            <button type="submit">Add Device</button>
        </form>
    );
};

export { DeviceForm };