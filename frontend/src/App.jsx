import './App.css'
import { GatewayForm, GatewayList } from './components'
import {useEffect, useState} from "react";


function App(){
    const [gateways, setGateways] = useState([]);

    useEffect(() => {
        fetch('http://localhost:3000/gateways')
            .then(response => response.json())
            .then(data => setGateways(data))
            .catch(error => console.error('Error:', error));
    }, []);

    const addGateway = newGateway => {
        fetch('http://localhost:3000/gateways', {
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
        fetch(`http://localhost:3000/gateways/${id}`, {
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
        fetch(`http://localhost:3000/device/${gatewayId}/${deviceId}`, {
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
        fetch(`http://localhost:3000/device/${gatewayId}`, {
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
