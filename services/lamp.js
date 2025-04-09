class LampService {
  constructor() {
    this.mqqtService = require("./mqqt");
  }

  get() {
    return this.mqqtService.getState();
  }

  switch() {
    this.mqqtService.switch();
  }
}
module.exports = new LampService();
