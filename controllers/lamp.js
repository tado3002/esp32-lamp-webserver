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
    const data = Object.entries(result).map((lamp) =>
      Object({
        topic: lamp[0],
        state: lamp[1],
      }),
    );
    res.json({ data });
  }

  /**
   * @param {Request} req The date
   * @param {Response} res The string
   */
  async switch(req, res) {
    const topic = req.params.topic;
    await this.lampService.switch(topic);
    await this.get(req, res);
  }
}

module.exports = new LampController();
