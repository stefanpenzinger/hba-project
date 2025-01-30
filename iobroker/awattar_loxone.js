const BASE_DATAPOINT = 'awattar.0.prices';
const BRUTTO_PRICE = 'bruttoPriceKwh';
const MQTT_BROKER_TOPIC = 'awattar/switch'; // MQTT topic
const TOTAL_HOURS = 24;

async function activateLoxoneWithAwattar() {
    try {
         if (!(await existsStateAsync(MQTT_BROKER_TOPIC))) {
            await createStateAsync(MQTT_BROKER_TOPIC, {
                name: 'Awattar Switch',
                type: 'number',
                role: 'value',
                read: true,
                write: true
            });
            console.log(`State "${MQTT_BROKER_TOPIC}" created successfully.`);
        }

        // Fetch all 24-hour prices
        const priceData = [];
        for (let hour = 0; hour < TOTAL_HOURS; hour++) {
            const datapoint = `${BASE_DATAPOINT}.${hour}.${BRUTTO_PRICE}`;
            console.log(datapoint);

            const state = getState(datapoint);
            if (!state || state.val === null || state.val === undefined) {
                log(`Missing price data for hour ${hour}`, 'warn');
                continue;
            }
            priceData.push({ hour, price: state.val });
        }

        // Sort hours by price (ascending for cheapest, descending for expensive)
        const sortedByCheapest = [...priceData].sort((a, b) => a.price - b.price);
        const sortedByExpensive = [...priceData].sort((a, b) => b.price - a.price);

        // Get the 3 cheapest and 3 most expensive hours
        const cheapestHours = sortedByCheapest.slice(0, 3).map(h => h.hour);
        const expensiveHours = sortedByExpensive.slice(0, 3).map(h => h.hour);

        // Get the current hour
        const currentHour = new Date().getHours();

        // Determine if the current hour is in the cheapest or expensive hours
        const isCheapest = cheapestHours.includes(currentHour);
        const isExpensive = expensiveHours.includes(currentHour);

        // Send corresponding MQTT message
        const mqttValue = isCheapest ? 1 : isExpensive ? 0 : null;
        
        if (mqttValue !== null) {
            sendTo('mqtt.0', 'sendMessage2Client', { topic: `${MQTT_BROKER_TOPIC}`, message: `${mqttValue}`, retain: true });
            console.log(`MQTT message sent: ${mqttValue} for hour ${currentHour}`);
        } else {
            console.log(`Current hour ${currentHour} is not among the 3 cheapest or most expensive.`);
        }
    } catch (error) {
        console.log(`Error fetching or processing Awattar prices: ${error.message}`, 'error');
    }
}

// Call the function for manual testing
activateLoxoneWithAwattar();

