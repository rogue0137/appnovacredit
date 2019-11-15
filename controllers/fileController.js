const models = require("../models");

const getExt = filename => {
  return filename.split(".").pop();
};

const sendMetaDataToDB = async (ext, filename, description, tags) => {
  return await models.State.create({
    ext,
    filename,
    description,
    tags
  });
};

const getMetaData = async filename => {
  return models.State.findAll({
      limit: 1,
      where: {
          filename
      }
  });
};

const savedFile = async (
  ext,
  filename,
  description,
  tags,
  requestingBank,
  size,
  type
) => {
  return await models.File.create({
    ext,
    filename,
    description,
    tags,
    requestingBank,
    size,
    type
  });
};

const deleteFileMetaData = async id => {
  return models.File.destroy({
      where: {
          id
      }
  });
};

// phase1
const saveMetaData = async (req, res, next) => {
  try {
    const { body } = req;
    const { filename, description, tags } = body;
    const ext = getExt(filename);
    const metadata = await sendMetaDataToDB(ext, filename, description, tags);

    const { dataValues } = metadata;
    const { id } = dataValues;
    res.json(`Success: ${filename} metadata has been assigned the ID ${id}`);
  } catch (e) {
    console.log(`ERROR: ${e}`);
  }
};


const saveFile = async (req, res, next) => {
    try {
        const { fields, files } = req;
        const { requestingBank } = fields;
        const { size, name, type } = files.file;
        const newExt = getExt(name);
        const savedMetaData = await getMetaData(name);
        const { id, filename, description, tags, ext } = savedMetaData;

        if (newExt === ext) {
            const fileData = await savedFile(
                ext,
                filename,
                description,
                tags,
                requestingBank,
                size,
                type
            );

            const { dataValues } = fileData;
            const { id } = dataValues;
            res.json(`Success: ${filename} metadata has been assigned the ID ${id}`);
            res.json(`success`);
        } else {
            res.json(`The extension does not match`);
        }
    } catch (e) {
        console.log(`ERROR: ${e}`);
    }
};

module.exports = {
  saveMetaData,
  saveFile,
};
