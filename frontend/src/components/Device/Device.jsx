import React from 'react';
import styles from './Device.module.css'

const Device = ({ device, onRemove }) => {
    const { uid, vendor, status } = device;

    return (
        <li className={styles.item}>
            <div>
                <strong>UID:</strong>
                <span>{uid}</span>
            </div>

            <div>
                <strong>Vendor:</strong> <span>{vendor}</span>
            </div>

            <div>
                <strong>Status:</strong> <span>{status}</span>
            </div>
            <button className={styles.deleteBtn} onClick={onRemove}>Remove Device</button>
        </li>
    );
};

export { Device };