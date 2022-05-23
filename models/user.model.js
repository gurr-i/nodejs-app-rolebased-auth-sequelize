module.exports = (sequelize, Sequelize) => {
    const User = sequelize.define("users", {
        username: {
            type: Sequelize.STRING,
            validate: {
                notEmpty: true,  // don't allow empty strings  
            }
        },
        email: {
            type: Sequelize.STRING,
            validate: {
                isEmail: true,
                notEmpty: true,
            }
        },
        password: {
            type: Sequelize.STRING,

            // getter

            // get() {
            //     const rawValue = this.getDataValue('username');
            //     return rawValue ? rawValue.toUpperCase() : null;
            //   }

            // Setter

            // set(value) {
            //     // Storing passwords in plaintext in the database is terrible.
            //     // Hashing the value with an appropriate cryptographic hash function is better.
            //     this.setDataValue('password', hash(value));
            // },

            validate: {
                notEmpty: true,
                // len: [8,25], // only allow values with length between 2 and 10
            }
        }
    });
    return User;
}