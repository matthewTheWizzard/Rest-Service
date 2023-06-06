import React from 'react';
import { render } from '@testing-library/react';
import { Device } from './Device.jsx';

describe('GatewayDevice', () => {
    const device = {
        uid: 1,
        vendor: 'Vendor',
        status: 'online',
    };

    it('renders the gateway device', () => {
        const { getByText } = render(<Device device={device} />);


        expect(getByText('Vendor')).toBeInTheDocument();
        expect(getByText('online')).toBeInTheDocument();
    });
});
