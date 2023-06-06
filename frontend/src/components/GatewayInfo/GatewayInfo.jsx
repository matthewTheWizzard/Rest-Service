import React from 'react';
import styles from './GatewayInfo.module.css'

const GatewayInfo = ({ gateway }) => {
    const { serialNumber, name, ipv4 } = gateway;

    return (
        <div className={styles.info}>
            <h3>Gateway Info</h3>
            <strong>Serial Number:</strong> {serialNumber}

            <strong>Name:</strong> {name}

            <strong>IP Address:</strong> {ipv4}
        </div>
    );
};

export { GatewayInfo };