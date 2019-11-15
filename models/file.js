'use strict';

module.exports = (sequelize, DataTypes) => {
    const File = sequelize.define('File', {
        filename: DataTypes.STRING,
        description: DataTypes.STRING,
        tags: DataTypes.ARRAY(DataTypes.STRING),
        ext: DataTypes.STRING,
        requestingBank: DataTypes.STRING,
        file: DataTypes.VIRTUAL
    }, {});
    File.associate = function(models) {
        // associations can be defined here
    };
    return File;
};