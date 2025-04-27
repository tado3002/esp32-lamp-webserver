class LampService {
  constructor() {
    this.mqqtService = require("./mqqt");
  }

  async get() {
    return await this.mqqtService.getState();
  }

  async switch(topic) {
    await this.mqqtService.switch(topic);
  }
}
module.exports = new LampService();
