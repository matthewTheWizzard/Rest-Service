import './App.css'
import { GatewayForm, GatewayList } from './components'
import {useEffect, useState} from "react";

const BASE_LINK = 'https://rest-service-production.up.railway.app'

function App(){
    const [gateways, setGateways] = useState([]);

    useEffect(() => {
        fetch(BASE_LINK + '/gateways')
            .then(response => response.json())
            .then(data => setGateways(data))
            .catch(error => console.error('Error:', error));
    }, []);

    const addGateway = newGateway => {
        fetch(BASE_LINK + '/gateways', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(newGateway),
        })
            .then(response => response.json())
            .then(data => {
                setGateways([...gateways, data]);
            })
            .catch(error => console.error('Error:', error));
    };

    const removeGateway = id => {
        fetch(`${BASE_LINK}/gateways/${id}`, {
            method: 'DELETE',
        })
            .then(response => response.json())
            .then(() => {
                const updatedGateways = gateways.filter(gateway => gateway._id !== id);
                setGateways(updatedGateways);
            })
            .catch(error => console.error('Error:', error));
    };

    const removeDevice = (gatewayId, deviceId) => {
        fetch(`${BASE_LINK}/device/${gatewayId}/${deviceId}`, {
            method: 'DELETE',
        })
            .then(response => response.json())
            .then(data => {
                const updatedGateways = gateways.map(gateway => {
                    if (gateway._id === gatewayId) {
                        const updatedDevices = gateway.devices.filter(
                            device => device._id !== deviceId
                        );
                        return { ...gateway, devices: updatedDevices };
                    }
                    return gateway;
                });
                setGateways(updatedGateways);
            })
            .catch(error => console.error('Error:', error));
    };

    const addDevice = (gatewayId, newDevice) => {
        fetch(`${BASE_LINK}/device/${gatewayId}`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(newDevice),
        })
            .then(response => response.json())
            .then(data => {
                const updatedGateways = gateways.map(gateway => {
                    if (gateway._id === gatewayId) {

                        if (gateway.devices.length >= 10) {
                            alert('You cannot add more than 10 devices to one Gateway')
                            return { ...gateway, devices: gateway.devices }
                        }

                        const updatedDevices = [...gateway.devices, data];
                        return { ...gateway, devices: updatedDevices };
                    }
                    return gateway;
                });
                setGateways(updatedGateways);
            })
            .catch(error => console.error('Error:', error));
    };

    return (
        <>
            <h1>Gateways</h1>
            <GatewayForm onAddGateway={addGateway} />
            <GatewayList
                gateways={gateways}
                onRemove={removeGateway}
                onRemoveDevice={removeDevice}
                onAddDevice={addDevice}
            />
        </>
    );
}

export default App;
