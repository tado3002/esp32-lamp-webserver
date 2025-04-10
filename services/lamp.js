class LampService {
  constructor() {
    this.mqqtService = require("./mqqt");
  }

  async get() {
    return await this.mqqtService.getState();
  }

  async switch() {
    await this.mqqtService.switch();
  }
}
module.exports = new LampService();
