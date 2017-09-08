const bcrypt = require('bcryptjs');

module.exports = (sequelize, DataTypes) => {
    const modelOptions = {
        instanceMethods: {
            comparePassword: comparePasswords,
        },
        hooks: {
            beforeCreate: hashPassword,
        },
    };
    const User = sequelize.define('User', {
        email: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        password: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        firstName: {
            type: DataTypes.STRING,
        },
        lastName: {
            type: DataTypes.STRING,
        },
        role: {
            type: DataTypes.STRING,
            defaultValue: 'regular_user',
        },
        provider: {
            type: DataTypes.STRING,
        },
        providerId: {
            type: DataTypes.STRING,
        },
        jwtToken: {
            type: DataTypes.STRING,
        },
    }, modelOptions);

    User.associate = models => {
        User.hasMany(models.Todo, {
            foreignKey: 'sectionId',
            as: 'todoSection',
        });
    };
    // Compares two passwords.
    function comparePasswords(password, callback) {
        console.log('comparePasswords');
        bcrypt.compare(password, this.password, (error, isMatch) => {
            if (error) {
                return callback(error);
            }
            return callback(null, isMatch);
        });
    }

    // Hashes the password for a user object.
    function hashPassword(user) {
        console.log('hashPassword');
        if (user.changed('password')) {
            return bcrypt.hash(user.password, 10)
                .then(password => {
                    user.password = password;
                })
                .catch(ex => Promise.reject(ex));
        }
    }

    return User;
};
