class LampController {
  constructor() {
    this.lampService = require("../services/lamp");
  }

  get(req, res) {
    const result = this.lampService.get();
    res.json({ result });
  }

  /**
   * @param {Request} req The date
   * @param {Response} res The string
   */
  switch(req, res) {
    this.lampService.switch();
    res.json({ message: "OK" });
  }
}

module.exports = new LampController();
