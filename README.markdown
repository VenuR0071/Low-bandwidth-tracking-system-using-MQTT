# Low Bandwidth Tracking System using MQTT

The Low Bandwidth Tracking System is designed to monitor the real-time location of vehicles (e.g., mining trucks) using ESP32 devices equipped with GPS modules. Location data is transmitted efficiently via MQTT over a secure VPN to a broker, ensuring low-bandwidth usage. A web-based dashboard visualizes the locations on a Leaflet map, and a mobile app (planned but not implemented) will subscribe to the broker for real-time updates. This system is ideal for applications like mining operations, logistics, or fleet management, where secure and efficient tracking is critical.

## Project Goals

- Track vehicle locations using ESP32 devices with GPS, sending data via MQTT.
- Ensure secure communication over a VPN (planned feature).
- Display real-time locations on a web dashboard using Leaflet.
- Simulate environmental sensor data (e.g., temperature, visibility) for monitoring.
- (Planned) Develop a mobile app to subscribe to MQTT topics for location updates.

## Tech Stack

### Hardware
- **ESP32 Microcontroller**: Equipped with a GPS module (e.g., NEO-6M) to capture latitude and longitude.
- **WebSocket-Compatible MQTT Broker**: Hosted at `ws://your-ipaddress:8083` (or local setup with Mosquitto).
- **Mobile with VisionX app**:a simple app for the phone to connect to the mptt server and publish messages.

### Software
- **HTML/CSS/JavaScript**: Builds the web dashboard for visualization.
- **Leaflet.js**: Renders the interactive map with OpenStreetMap and CARTO basemaps.
- **Paho MQTT (JavaScript)**: Subscribes to MQTT topics for real-time location updates.
- **Python** (for ESP32): Programs ESP32 to publish GPS data to MQTT topics (not implemented in provided files).
- **VPN** (planned): Ensures secure communication between ESP32, broker, and clients.

### Frontend
- **Web Dashboard**: Displays a map with vehicle markers and sensor data (temperature, visibility, etc.).
- **Custom Icons**: Uses `placeholder.png` (blue pin) for default markers and `mining-truck.png` for highlighted markers.

### Backend
- **MQTT Broker**: Receives GPS data from ESP32 devices and forwards it to subscribers.
- **ESP32 Scripts** (planned): Publish GPS data in JSON format (e.g., `{"deviceId": "1", "latitude": 12.9209, "longitude": 80.2397}`).

## Prerequisites

- **Hardware**:
  - ESP32 with a GPS module (e.g., NEO-6M).
  - A computer or server to host the web dashboard and MQTT broker.
- **Software**:
  - Node.js (for local development server, e.g., `live-server`).
  - MQTT broker supporting WebSocket (e.g., Mosquitto with WebSocket enabled).
  - MicroPython or Arduino IDE for programming ESP32.
- **Development Tools**:
  - Git for cloning the repository.
  - A web browser (e.g., Chrome, Firefox) to view the dashboard.
- **Assets**:
  - Custom icons: `placeholder.png` (blue pin) and `mining-truck.png` (mining truck) in a `static/icons/` directory.

## Installation

1. **Clone the Repository**
   ```bash
   git clone https://github.com/your-username/low-bandwidth-tracking-system.git
   cd low-bandwidth-tracking-system
   ```

2. **Set Up the Directory Structure**
   Create a `static/icons/` directory and place the following files:
   - `placeholder.png`: Blue map pin icon for default markers.
   - `mining-truck.png`: Mining truck icon for highlighted markers.
   Update paths in `maps.js` if necessary (current paths are hardcoded to `D:/Revised code/static/icons/`).

3. **Set Up a Local Server**
   Install `live-server` to host the dashboard:
   ```bash
   npm install -g live-server
   ```
   Run the server:
   ```bash
   live-server
   ```
   The dashboard will open in your default browser at `http://localhost:8080`.

4. **Configure MQTT Broker**
   - Use the provided broker at `ws://68.178.168.62:8083` (requires credentials `howin/howin`).
   - Alternatively, set up a local Mosquitto broker with WebSocket:
     ```bash
     sudo apt-get install mosquitto
     ```
     Edit `mosquitto.conf` to enable WebSocket (e.g., on port 8083), then restart:
     ```bash
     sudo systemctl restart mosquitto
     ```
   - Update the broker URL in `maps.js` if using a local broker.

5. **Program ESP32**
   - Flash MicroPython on ESP32 using Thonny or esptool.py.
   - Write a script to read GPS data and publish to MQTT topics (1 to 10). Example JSON payload:
     ```json
     {"deviceId": "1", "latitude": 12.9209, "longitude": 80.2397}
     ```
   - Use the Paho MQTT library for MicroPython. Example:
     ```python
     from umqtt.simple import MQTTClient
     import time
     # Simulated GPS data
     client = MQTTClient("esp32_1", "68.178.168.62", port=8083, user="howin", password="howin")
     client.connect()
     while True:
         payload = {"deviceId": "1", "latitude": 12.9209, "longitude": 80.2397}
         client.publish("1", ujson.dumps(payload))
         time.sleep(2)
     ```

6. **Set Up VPN (Optional, Planned)**
   - Configure a VPN (e.g., OpenVPN) to secure MQTT communication.
   - Update ESP32 and dashboard to connect through the VPN.

## Running the Dashboard

1. **Start the MQTT Broker**
   Ensure the broker is running and accessible at `ws://68.178.168.62:8083` (or your local setup).

2. **Run ESP32 Scripts**
   Deploy the GPS publishing script on ESP32, ensuring it publishes to topics `1` to `10`.

3. **Launch the Dashboard**
   Run `live-server` (as above) and open `http://localhost:8080` in your browser.
   - The map will display markers for each device (topics 1 to 10).
   - Sensor data (temperature, visibility) will update every 1.5 seconds (simulated).
   - Click "Topic X" buttons to highlight a device’s marker with the mining truck icon.
   - Click "Reset Marker" to revert markers to the default blue pin icon.

## Usage

1. **View Vehicle Locations**
   - The map centers on coordinates `[12.920941717601204, 80.23976211560127]` (near Chennai, India).
   - Markers update in real-time as ESP32 devices publish GPS data to MQTT topics.

2. **Monitor Sensor Data**
   - The dashboard displays simulated sensor data (temperature, visibility, etc.).
   - Planned: Integrate real sensor data from ESP32 (e.g., humidity, rainfall).

3. **Interact with Markers**
   - Click a "Topic X" button to highlight the corresponding vehicle’s marker.
   - Use "Reset Marker" to clear highlights and revert to default icons.



## Limitations and Future Improvements

- **Current Limitations**:
  - Sensor data (temperature, visibility) is simulated; real ESP32 sensor integration is pending.
  - ESP32 GPS publishing script is not provided; currently relies on manual MQTT messages.
  - VPN for secure communication is planned but not implemented.
  - Mobile app for real-time updates is not developed; current implementation is web-based.
  - Hardcoded icon paths in `maps.js` (e.g., `D:/Revised code/static/icons/`) require adjustment.

- **Future Improvements**:
  - Develop the mobile app to subscribe to MQTT topics for location updates.
  - Implement VPN (e.g., OpenVPN) for secure MQTT communication.
  - Integrate real ESP32 GPS and sensor data (humidity, rainfall, etc.).
  - Add authentication for MQTT topics to restrict access.
  - Enhance the dashboard with more interactive features (e.g., historical tracking, alerts).

## Troubleshooting

- **Map Not Loading**:
  - Ensure internet access for OpenStreetMap and CARTO tile layers.
  - Verify Leaflet.js is loaded correctly (included via CDN in `index.html`).
- **MQTT Connection Fails**:
  - Check broker URL (`ws://68.178.168.62:8083`) and credentials (`howin/howin`).
  - Test with a local Mosquitto broker if the external broker is inaccessible.
- **Markers Not Updating**:
  - Confirm ESP32 is publishing to topics `1` to `10`.
  - Check browser console for MQTT message parsing errors in `maps.js`.
- **Icons Not Displaying**:
  - Update icon paths in `maps.js` to match your directory structure.

## Contributing

1. Fork the repository.
2. Create a feature branch (`git checkout -b feature/your-feature`).
3. Commit changes (`git commit -m 'Add your feature'`).
4. Push to the branch (`git push origin feature/your-feature`).
5. Open a Pull Request.

## Contact

For questions or feedback, open an issue on GitHub or contact the repository owner.

## Acknowledgments

- Leaflet.js for map visualization.
- Paho MQTT for efficient real-time communication.
- OpenStreetMap and CARTO for map tiles.
