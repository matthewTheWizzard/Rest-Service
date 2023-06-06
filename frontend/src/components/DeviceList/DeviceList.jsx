import React from 'react';
import { Device } from '../Device';
import styles from './DeviceList.module.css'

const DeviceList = ({ devices, onRemove }) => {
    return (
        <ul className={styles.devices}>
            {devices.map(device => (
                <Device
                    key={device._id}
                    device={device}
                    onRemove={() => onRemove(device._id)}
                />
            ))}
        </ul>
    );
};

export { DeviceList };