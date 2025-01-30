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