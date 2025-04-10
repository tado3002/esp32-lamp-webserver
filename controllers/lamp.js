class LampController {
  constructor() {
    this.lampService = require("../services/lamp");
  }
  /**
   * @param {Request} req The date
   * @param {Response} res The string
   */
  async get(req, res) {
    const result = await this.lampService.get();
    res.json({ data: { result } });
  }

  /**
   * @param {Request} req The date
   * @param {Response} res The string
   */
  async switch(req, res) {
    await this.lampService.switch();
    await this.get(req, res);
  }
}

module.exports = new LampController();
