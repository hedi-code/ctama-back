const {
  create,
  getUserByUserEmail,
  getUserByUserId,
  getUsers,
  updateUser,
  deleteUser,
} = require("./user.service");
const { sign } = require("jsonwebtoken");
const Joi = require("@hapi/joi");

const loginSchema = Joi.object({
  email: Joi.string().required().email(),
  password: Joi.string().required().min(2),
});

module.exports = {
  createUser: (req, res) => {
    const body = req.body;
    const salt = genSaltSync(10);
    create(body, (err, results) => {
      if (err) {
        console.log(err);
        return res.status(500).json({
          success: 0,
          message: "Database connection errror",
        });
      }
      return res.status(200).json({
        success: 1,
        data: results,
      });
    });
  },
  login: (req, res) => {
    const body = req.body;
    const { error } = loginSchema.validate(req.body);
    if (error) return res.send(error.details[0]);
    getUserByUserEmail(body.email, (err, results) => {
      if (err) {
        console.log(err);
      }
      if (!results) {
        return res.json({
          success: 0,
          message: "Invalid email or password",
        });
      }
      const result = body.password == results.password;
      if (result) {
        results.password = undefined;
        const jsontoken = sign({ result: results }, "qwe1234", {
          expiresIn: "1h",
        });

        return res.json({
          success: 1,
          message: "login successfully",
          token: jsontoken,
          user: results,
        });
      } else {
        return res.json({
          success: 0,
          message: "Invalid email or password",
        });
      }
    });
  },
  getUserByUserId: (req, res) => {
    const id = req.params.id;
    getUserByUserId(id, (err, results) => {
      if (err) {
        console.log(err);
        return;
      }
      if (!results) {
        return res.json({
          success: 0,
          message: "Record not Found",
        });
      }
      results.password = undefined;
      return res.json({
        success: 1,
        data: results,
      });
    });
  },
  getUsers: (req, res) => {
    getUsers((err, results) => {
      if (err) {
        console.log(err);
        return;
      }
      return res.json({
        success: 1,
        data: results,
      });
    });
  },
  updateUsers: (req, res) => {
    const body = req.body;
    /*const salt = genSaltSync(10);
    body.password = hashSync(body.password, salt);*/
    updateUser(body, (err, results) => {
      if (err) {
        console.log(err);
        return;
      }
      return res.json({
        success: 1,
        message: "updated successfully",
      });
    });
  },
  updateUserPassword: (req, res) => {
    const body = req.body;
    /*const salt = genSaltSync(10);
    body.password = hashSync(body.password, salt);*/
    updateUserPassword(body, (err, results) => {
      if (err) {
        console.log(err);
        return;
      }
      return res.json({
        success: 1,
        message: "updated successfully",
      });
    });
  },
  deleteUser: (req, res) => {
    const id = req.params.id;
    deleteUser(id, (err, results) => {
      if (err) {
        console.log(err);
        return;
      }
      return res.json({
        success: 1,
        message: "user deleted successfully",
      });
    });
  },
};
