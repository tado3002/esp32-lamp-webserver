const mqtt = require("mqtt");

class MqttService {
  lampState = {
    gpio2: "OFF",
    gpio16: "OFF",
  };

  constructor() {
    this.client = mqtt.connect("mqtt://mqtt.eclipsegate.my.id");
    this.setupConnection();
  }

  setupConnection() {
    console.log("Connecting to MQTT broker...");

    this.client.on("connect", () => {
      console.log("Connected to MQTT broker");
      this.subscribeTopics();
    });

    this.client.on("error", (err) => {
      console.error("MQTT connection error:", err);
    });

    this.client.on("message", (topic, message) => {
      this.handleMessage(topic, message.toString());
    });
  }

  subscribeTopics() {
    const topics = ["esp32/gpio2/state", "esp32/gpio16/state"];
    topics.forEach((topic) => {
      this.client.subscribe(topic, (err) => {
        if (err) {
          console.error(`Failed to subscribe to ${topic}:`, err);
        } else {
          console.log(`Subscribed to topic: ${topic}`);
        }
      });
    });
  }

  handleMessage(topic, message) {
    console.log(`Received message from ${topic}: ${message}`);
    this.updateStateByTopic(topic, message);
  }

  publish(topic, message) {
    return new Promise((resolve, reject) => {
      this.client.publish(topic, message, (err) => {
        if (err) {
          console.error("Publish error:", err);
          return reject(err);
        }
        console.log(`Message "${message}" published to "${topic}"`);
        resolve();
      });
    });
  }

  async switch(topic) {
    const currentState = this.getStateByTopic(topic);
    const newState = currentState === "OFF" ? "ON" : "OFF";

    await this.publish(topic, newState);
    console.log(`[${topic}] Switch command sent: ${newState}`);
  }

  async getState() {
    await this.publish("esp32/gpio2/get", "");
    await this.publish("esp32/gpio16/get", "");
    return this.lampState;
  }

  updateStateByTopic(topic, message) {
    if (topic === "esp32/gpio2/state") {
      this.lampState.gpio2 = message;
    } else if (topic === "esp32/gpio16/state") {
      this.lampState.gpio16 = message;
    }
  }

  getStateByTopic(topic) {
    if (topic === "esp32/gpio2") {
      return this.lampState.gpio2;
    } else if (topic === "esp32/gpio16") {
      return this.lampState.gpio16;
    }
    return null;
  }
}

module.exports = new MqttService();
