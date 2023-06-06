import React, { useState } from 'react';
import styles from './DeviceForm.module.css'

const DeviceForm = ({ gatewayId, onAddDevice }) => {
    const [newDevice, setNewDevice] = useState({
        uid: '',
        vendor: '',
        status: 'online',
    });

    const handleAddDevice = e => {
        e.preventDefault();
        onAddDevice(gatewayId, newDevice);
        setNewDevice({ uid: '', vendor: '', status: 'online' });
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
            <br />
            <label htmlFor="vendor">Vendor:</label>
            <input
                type="text"
                id="vendor"
                name="vendor"
                value={newDevice.vendor}
                onChange={handleDeviceChange}
            />
            <br />
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