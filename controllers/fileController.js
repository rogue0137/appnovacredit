const _ = require("lodash");
const models = require("../models");
const { State } = models;
const { File } = models;

const getExt = filename => {
  return filename.split(".").pop();
};

const sendMetaDataToDB = async (ext, filename, description, tags) => {
    return State.create({
        ext: ext,
        filename: filename,
        description: description,
        tags: tags
    });
};

const getMetaData = async filename => {
  return State.findAll({
      limit: 1,
      where: {
          filename: filename
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
  return await File.create({
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
  return State.destroy({
      where: {
          id
      }
  });
};

// phase1
const saveMetaData = async (req, res, next) => {
  try {
    const { fields } = req;
    const { filename, description, tags } = fields;
    console.log(tags);
    const ext = getExt(filename);
    const metadata = await sendMetaDataToDB(ext, filename, description, tags);

    const { dataValues } = metadata;
    const { id } = dataValues;
    res.json(`Success: ${filename} metadata has been assigned the ID ${id}`);
  } catch (e) {
    console.log(`ERROR: ${e}`);
  }
};

// phase 2
const saveFile = async (req, res, next) => {
    try {
        const { fields, files } = req;
        const { requestingBank } = fields;
        const { size, name, type } = files.file;
        const newExt = getExt(name);
        const savedMetaData = await getMetaData(name);
        const { dataValues } = savedMetaData[0];
        const { filename, description, tags, ext } = dataValues;
        const stateId = savedMetaData[0].id;
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
            await deleteFileMetaData(stateId);
            res.json(`Success: ${filename} metadata has been assigned the ID ${id}`);
        } else {
            res.json(`The extension does not match`);
        }
    } catch (e) {
        console.log(`ERROR: ${e}`);
    }
};

// :id
const getSavedFileInfo = async (req, res, next)=> {
    try {
        const { id } = req.params;
        const idAsInt = parseInt(id);
        const savedFile = await File.findAll({
            limit: 1,
            where: {
                id: idAsInt
            },
            raw: true
        });
        console.log(savedFile);
        res.json(savedFile);
    } catch (e) {
        console.log(`ERROR: ${e}`);
    }
}
module.exports = {
  saveMetaData,
  saveFile,
  getSavedFileInfo
};
