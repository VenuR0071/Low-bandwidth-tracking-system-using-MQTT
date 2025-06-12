// Simulated sensor data
function generateRandomTemperature() {
    return (Math.random() * 20 + 20).toFixed(2) + "°C";
}

function generateRandomVisibility() {
    return (Math.random() * 5 + 5).toFixed(2) + " km";
}

function updateSensorData() {
    document.getElementById("temperature").textContent = generateRandomTemperature();
    document.getElementById("visibility").textContent = generateRandomVisibility();
    // Update other sensor data here
}

// Update sensor data every 5 seconds (for demonstration purposes)
setInterval(updateSensorData, 1500);
