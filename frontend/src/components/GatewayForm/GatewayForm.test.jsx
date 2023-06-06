import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import { GatewayForm } from './GatewayForm';

describe('GatewayForm', () => {
    it('renders the gateway form', () => {
        const { getByLabelText, getByText } = render(<GatewayForm />);

        expect(getByLabelText('Serial Number:')).toBeInTheDocument();
        expect(getByLabelText('Name:')).toBeInTheDocument();
        expect(getByLabelText('IP Address:')).toBeInTheDocument();
        expect(getByText('Add Gateway')).toBeInTheDocument();
    });

    it('submits the form with correct values', () => {
        const handleSubmit = vitest.fn();
        const { getByLabelText, getByText } = render(<GatewayForm onAddGateway={handleSubmit} />);


        fireEvent.change(getByLabelText('Serial Number:'), { target: { value: '123456' } });
        fireEvent.change(getByLabelText('Name:'), { target: { value: 'Test Gateway' } });
        fireEvent.change(getByLabelText('IP Address:'), { target: { value: '192.168.0.1' } });


        fireEvent.click(getByText('Add Gateway'));


        expect(handleSubmit).toHaveBeenCalledWith({
            serialNumber: '123456',
            name: 'Test Gateway',
            ipv4: '192.168.0.1',
        });
    });
});