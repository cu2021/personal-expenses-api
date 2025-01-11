const { hashSync } = require("bcryptjs");
const { dbConnection } = require("../configurations");

class User {
  constructor(userData) {
    this.userData = userData;
  }

  save(cb) {
    dbConnection("users", async (collection) => {
      try {
        // password hashing.
        const hashedPassword = hashSync(this.userData.password);
        this.userData.password = hashedPassword;

        //insert into database.
        await collection.insertOne(this.userData).then((result) => {
          cb({
            status: true,
            message: "User has been created successfully",
          });
        });
      } catch (err) {
        cb({
          status: false,
          message: err.message,
        });
      }
    });
  }

  static validate(userData) {
    try {
      const validationResult = userValidator.validate(userData);
      return validationResult;
    } catch (err) {
      return false;
    }
  }

  isExist() {
    return new Promise((resolve, reject) => {
      dbConnection("users", async (collection) => {
        try {
          //If there exists a user with the same email or username?
          const user = await collection.findOne({
            $or: [
              { username: this.userData.username },
              { email: this.userData.email },
            ],
          });

          if (!user) {
            resolve({ check: false });
          } else {
            if (user.email === this.userData.email) {
              resolve({
                check: true,
                message: "The email is already used",
              });
            } else if (user.username === this.userData.username) {
              resolve({
                check: true,
                message: "The username is already used",
              });
            }
          }
        } catch (err) {
          reject(err);
        }
      });
    });
  }
}
module.exports = User;
