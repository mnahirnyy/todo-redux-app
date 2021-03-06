module.exports = {
    up: (queryInterface, Sequelize) =>
        queryInterface.createTable('Users', {
            id: {
                allowNull: false,
                autoIncrement: true,
                primaryKey: true,
                type: Sequelize.INTEGER
            },
            email: {
                type: Sequelize.STRING,
                allowNull: false,
            },
            password: {
                type: Sequelize.STRING,
                allowNull: false,
            },
            firstName: {
                type: Sequelize.STRING
            },
            lastName: {
                type: Sequelize.STRING
            },
            role: {
                type: Sequelize.STRING,
                defaultValue: 'regular_user',
            },
            provider: {
                type: DataTypes.STRING
            },
            providerId: {
                type: DataTypes.STRING
            },
            jwtToken: {
                type: DataTypes.STRING
            },
            createdAt: {
                allowNull: false,
                type: Sequelize.DATE
            },
            updatedAt: {
                allowNull: false,
                type: Sequelize.DATE
            },
        }),
    down: (queryInterface/*, Sequelize*/) => queryInterface.dropTable('Users'),
};