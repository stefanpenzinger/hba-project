# ioBroker Live Demo

## Installation

This command runs an IoBroker container with the following settings:

- Port Mapping: **8081** (UI) and **1883** (MQTT)
- Container Name: iobroker
- Persistent volume mount: **iobroker_data** to `/opt/iobroker`
- Image: **buanet/iobroker**

``` bash
docker run -p 8081:8081 -p 1883:1883 --name iobroker -h iobroker -v iobroker_data:/opt/iobroker buanet/iobroker 
```

## Wizard

http://localhost:8081

## Adapters

- aWATTar
    - Adapt cron interval
- MQTT Broker/Server
- Scripting Enginge


## MQTT Subscription

``` bash
mosquitto_sub -t iobroker
```

## Scripts

- Create new Script
    - JavaScript
    - Name: test

``` javascript
const MQTT_TOPIC = "iobroker";
const ID_PREFIX = "awattar.0.prices";
const ID_SUFFIXES = ["bruttoPriceKwh", "end", "endDate", "nettoPriceKwh", "start", "startDate", "totalPriceKwh"];

async function sendAwattarForCurrentHour() {
    const currentHour = new Date().getHours();

    let outputJson = {};

    ID_SUFFIXES.forEach(id => {
        const value = getState(`${ID_PREFIX}.${currentHour}.${id}`).val;
        outputJson[id] = value;
    });

    sendTo('mqtt.0', 'sendMessage2Client', { topic: MQTT_TOPIC, message: JSON.stringify(outputJson), retain: true });
}

schedule("0 * * * *", sendAwattarForCurrentHour);
sendAwattarForCurrentHour(); // Call the function for manual testing
```