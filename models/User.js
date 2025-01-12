const { hashSync, compareSync } = require("bcryptjs");
const { dbConnection } = require("../configurations");
const { userValidator, loginValidator } = require("../validators");

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

  static login(loginData) {
    return new Promise((resolve, reject) => {
      //validate the login data after it is recieved
      const validation = loginValidator.validate(loginData);
      // if there is a validation error
      if (validation.error) {
        resolve({
          status: false,
          message: validation.error.message,
          
        });
      }

      dbConnection("users", async (collection) => {
        try {
          //get the user from the database
          const user = await collection.findOne({ username: loginData.username });
          

          //check the password and username correctness.
          if (!user || !compareSync(loginData.password, user.password)) {
            resolve({
              status: false,
              message: "The password or usename is not correct!",
            });
          } else {
            // in this section, all login credentials must be correct
            resolve({
              status: true,
              data: user,
            });
          }
        } catch (err) {
          reject({
            status: false,
            message: err.message,
          });
        }
      });
    });
  }
}
module.exports = User;
