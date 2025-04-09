class MqqtService {
  // Variabel untuk menyimpan status lampu
  lampuState = "OFF";

  constructor() {
    this.mqtt = require("mqtt");
    this.client = this.mqtt.connect(`mqtt://5.196.78.28`);
    this.connect();
    this.message();
  }

  connect() {
    console.log("Trying to connect MQQT...");
    this.client.on("connect", () => {
      this.client.subscribe("esp32/gpio4/state"); // Subscribe ke status lampu dari ESP32
      console.log("Connected to MQTT broker");
    });
  }

  // Menerima pesan dari ESP32
  message() {
    this.client.on("message", (topic, message) => {
      if (topic === "esp32/gpio4/state") {
        this.lampuState = message.toString();
        console.log(`Lampu sekarang: ${this.lampuState}`);
      }
    });
  }

  switch() {
    const status = this.lampuState === "OFF" ? "ON" : "OFF";
    this.client.publish("esp32/gpio4", status, () => {
      console.log(`Perintah dikirim: ${status}`);
    });
    console.log("state lampu", this.lampuState);
  }

  getState() {
    this.message();
    return this.lampuState;
  }
}
module.exports = new MqqtService();
