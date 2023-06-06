import { isIPv4 } from 'is-ip';

export class Validate {
    _errors = {}
    inputs = {};
    constructor(inputs) {
        this.inputs = inputs;
        this._errors = {};
    }
    ifEmpty (inputs) {
        for (let key in inputs) {
            const value = inputs[key];
            if (!value) {
                this._errors[key] = 'The field cannot be empty'
            } else {
                this._errors[key] = null
            }
        }
    }

    checkUid(value) {
        const isValid = /^\d+$/.test(value)
        if (isValid) {
            this._errors['uid'] = null
        } else {
            this._errors['uid'] = 'The ID should be a number'
        }
    }
    checkIp(value) {
        const isIp = isIPv4(value);
        if (!this._errors['ipv4']) {
            if (isIp) {
                this._errors['ipv4'] = null
            } else {
                this._errors['ipv4'] = 'This is not a valid IP address'
            }
        }
    }

    hasErrors() {
        const errors = Object.values(this._errors);
        return errors.some(el => el !== null)
    }

    get errors() {
        return this._errors
    }
}