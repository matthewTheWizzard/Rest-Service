## Rest-Service
GUI: [https://app.netlify.com/sites/delicate-kringle-624cce/](https://delicate-kringle-624cce.netlify.app/)

Description:

This sample project is managing gateways - master devices that control multiple peripheral
devices.
It is a REST service (JSON/HTTP) for storing information about these
gateways and their associated devices. 

Programming language: JavaScript
Framework: Node.js/JavaScript + React
Database: MongoDB


Each gateway has:
- [x] a unique serial number (string) 
- [x] human-readable name (string),
- [x] IPv4 address (to be validated),
- [x] multiple associated peripheral devices.
Each peripheral device has:
- [x] a UID (number),
- [x] vendor (string),
- [x] date created,
- [x] status - online/offline.

- [ ] Provide an automated build.
- [x] Provide basic unit tests.

# Documentation:

endpoints:

MANAGE GATEWAYS

- **endpoint**: /gateways
- **METHOD**: GET
- **description**: shows all the gateways we currently have

RESPONSE:

```code
[
 {
  "_id": String,
  "serialNumber": String,
  "name": String,
  "ipv4": ipv4 validated,
  "devices": Devices
  }, 
  {
  "_id": String,
  "serialNumber": String,
  "name": String,
  "ipv4": ipv4 validated,
  "devices": Devices[]
 },
  ...
]
```

- ***endpoint**: /gateways/:id
- **METHOD**: GET
- **description**: shows a specific gateway

RESPONSE:

```code
{
  "_id": String,
  "serialNumber": String,
  "name": String,
  "ipv4": ipv4 validated,
  "devices": Devices[]
 }
 ```
 
- **endpoint**: /gateways
- **METHOD**: POST
- **description**: adds a new gateway to the list
- **BODY**: 
 ```code
 { serialNumber: Number, name: String, ipv4: ipv4 }
 ```

RESPONSE: 

```code
{
  "_id": String,
  "serialNumber": String,
  "name": String,
  "ipv4": ipv4 validated,
  "devices": []
 }
```

- **endpoint**: /gateways/:id_gateway
- **METHOD**: DELETE
- **description**: deletes a specific gateway

MANAGE DEVICES

- **endpoint**: /device
- **METHOD**: GET
- **description**: shows all the devices we currently have

RESPONSE:

```code
[
{ "_id": "String",
  "uid": Number,
  "vendor": "String",
  "status": "online | offline",
  "created": Date,
},
...
]
```

- **endpoint**: /device/:id_gateway
- **METHOD**: POST
- **description**: adds a new device to a chosen gateway
- **BODY**:

```code
{ uid: Number, vendor: String, status: online | offline }
```

- **endpoint**: /device/:id_gateway/:id_device
- **METHOD**: DELETE
- **description**: deletes a specific device from a chosen gateway

# Production: 

API address: https://rest-service-production.up.railway.app/

GUI: [https://app.netlify.com/sites/delicate-kringle-624cce/](https://delicate-kringle-624cce.netlify.app/)

# Development

You need to go to the "develop" branch in this repository. Download the git repository on your computer. 

Go to the backend folder -> type "npm install" in the terminal then type "npm start" to start a server

Go to the frontend folder -> type "npm install" in the terminal then type "npm run dev" to start a dev-server
