import React from 'react';
import { DeviceList, GatewayInfo, DeviceForm} from '../../components'
import styles from './Gateway.module.css'

const Gateway = ({ gateway, onRemove, onRemoveDevice, onAddDevice }) => {
    const { _id, devices } = gateway;

    const handleRemoveDevice = deviceId => {
        onRemoveDevice(_id, deviceId);
    };

    return (
        <li className={styles.item}>
            <GatewayInfo gateway={gateway} />
            <strong>Devices:</strong>
            {
                devices.length ?
                    <DeviceList devices={devices} onRemove={handleRemoveDevice} />
                    :
                    <>no devices yet</>
            }
            <DeviceForm gatewayId={_id} onAddDevice={onAddDevice} />
            <hr />
            <button className={styles.deleteBtn} onClick={() => onRemove(_id)}>Remove Gateway</button>
            <hr />
        </li>
    );
};

export { Gateway };