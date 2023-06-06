import React from 'react';
import { Gateway } from '../Gateway';
import styles from './GatewayList.module.css'

const GatewayList = ({ gateways, onRemove, onRemoveDevice, onAddDevice }) => {
    return (
        <ul className={styles.list}>
            {gateways.map(gateway => (
                <Gateway
                    key={gateway._id}
                    gateway={gateway}
                    onRemove={onRemove}
                    onRemoveDevice={onRemoveDevice}
                    onAddDevice={onAddDevice}
                />
            ))}
        </ul>
    );
};

export { GatewayList };