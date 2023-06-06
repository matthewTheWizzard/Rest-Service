import React from 'react';
import { render, screen } from '@testing-library/react';
import { GatewayList } from './GatewayList';

describe('GatewayList', () => {
    it('renders the gateway list', () => {
        const gateways = [
            { _id: 1, serialNumber: '123', name: 'Gateway 1', ipv4: '192.168.0.1', devices: [] },
            { _id: 2, serialNumber: '456', name: 'Gateway 2', ipv4: '192.168.0.2', devices: [] },
        ];
        const cb = () => {}

        render(<GatewayList onAddDevice={cb} onRemove={cb} onRemoveDevice={cb} gateways={gateways} />)

        expect(screen.getByText('192.168.0.1')).toBeInTheDocument();
        expect(screen.getByText('Gateway 2')).toBeInTheDocument();
        expect(screen.getByText('192.168.0.2')).toBeInTheDocument();
        expect(screen.getByText('Gateway 1')).toBeInTheDocument();
    });
});
