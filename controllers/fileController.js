const _ = require("lodash");
const fs = require('fs-extra');
const pathMod = require('path');
const models = require("../models");
const { State } = models;
const { File } = models;

const getExt = filename => {
  return filename.split(".").pop();
};

const sendMetaDataToDB = async (ext, filename, description, tags) => {
    return State.create({
        ext,
        filename,
        description,
        tags
    });
};

const getMetaData = async filename => {
  return State.findAll({
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
  type,
  filepath
) => {
  return await File.create({
    ext,
    filename,
    description,
    tags,
    requestingBank,
    size,
    type,
    filepath
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
    const ext = getExt(filename);
    const metadata = await sendMetaDataToDB(ext, filename, description, tags);

    const { dataValues } = metadata;
    const { id } = dataValues;
    res.json(`Success: ${filename} metadata has been assigned the ID ${id}`);
  } catch (e) {
    console.log(`ERROR: ${e}`);
    res.json(`Failure`);
  }
};

// phase 2
const saveFile = async (req, res, next) => {
    try {
        const { fields, files } = req;
        const { requestingBank } = fields;
        const { size, name, type, path } = files.file;
        const newExt = getExt(name);
        const savedMetaData = await getMetaData(name);
        const { dataValues } = savedMetaData[0];
        const { filename, description, tags, ext } = dataValues;
        const stateId = savedMetaData[0].id;
        if (newExt === ext) {
            const fromPath = pathMod.join(__dirname + '/../' + path);
            const toPath = pathMod.join(__dirname + '/../novaCredit/' + name);
            await fs.copy(fromPath, toPath, (e) => {
                if (e) throw e;
                console.log(`File moved from ${fromPath} to ${toPath}`);
            });
            const fileData = await savedFile(
                ext,
                filename,
                description,
                tags,
                requestingBank,
                size,
                type,
                toPath
            );
            const { dataValues } = fileData;
            const { id } = dataValues;
            await deleteFileMetaData(stateId);
            res.json(`Success: ${filename} has been assigned the ID ${id}`);
        } else {
            res.json(`The extension does not match`);
        }
    } catch (e) {
        console.log(`ERROR: ${e}`);
        res.json(`Failure`);
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
        res.json(savedFile[0]);
    } catch (e) {
        console.log(`ERROR: ${e}`);
        res.json(`Failure`);
    }
}
module.exports = {
  saveMetaData,
  saveFile,
  getSavedFileInfo
};
