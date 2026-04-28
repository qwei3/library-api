import * as recordService from '../services/recordService.js';

export async function getAllRecordsHandler(req, res, next) {
  try {
    const records = await recordService.getAllRecords(req.user.role);
    res.json(records);
  } catch (err) {
    next(err);
  }
}

export async function getRecordByIdHandler(req, res, next) {
  try {
    const record = await recordService.getRecordById(
      req.user.id,
      req.user.role,
      Number(req.params.id)
    );
    res.json(record);
  } catch (err) {
    next(err);
  }
}

export async function getMyRecordsHandler(req, res, next) {
  try {
    const records = await recordService.getMyRecords(req.user.id);
    res.json(records);
  } catch (err) {
    next(err);
  }
}

export async function createRecordHandler(req, res, next) {
  try {
    const record = await recordService.createRecord(req.user.id, req.body);
    res.status(201).json(record);
  } catch (err) {
    next(err);
  }
}

export async function updateRecordHandler(req, res, next) {
  try {
    const record = await recordService.updateRecord(
      req.user.id,
      req.user.role,
      Number(req.params.id),
      req.body
    );
    res.json(record);
  } catch (err) {
    next(err);
  }
}

export async function deleteRecordHandler(req, res, next) {
  try {
    await recordService.deleteRecord(
      req.user.id,
      req.user.role,
      Number(req.params.id)
    );
    res.status(204).send();
  } catch (err) {
    next(err);
  }
}