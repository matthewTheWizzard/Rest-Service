import React from 'react';
import styles from './GatewayInfo.module.css'

const GatewayInfo = ({ gateway }) => {
    const { serialNumber, name, ipv4 } = gateway;

    return (
        <div className={styles.info}>
            <h3>Gateway Info</h3>
            <strong>Serial Number:</strong> <span>{serialNumber}</span>

            <strong>Name:</strong> <span>{name}</span>

            <strong>IP Address:</strong> <span>{ipv4}</span>
        </div>
    );
};

export { GatewayInfo };