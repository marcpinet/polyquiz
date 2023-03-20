const { Router } = require('express')

const { Resident } = require('../../../models')
const manageAllErrors = require('../../../utils/routes/error-management')

const router = new Router()

router.get('/', (req, res) => {
  try {
    res.status(200).json(Resident.get())
  } catch (err) {
    manageAllErrors(res, err)
  }
})

router.get('/:residentNum', (req, res) => {
  try {
    res.status(200).json(Resident.getById(req.params.residentNum))
  } catch (err) {
    manageAllErrors(res, err)
  }
})

router.post('/', async (req, res) => {
  try {
    const { id } = req.body;
    const existingResident = await Resident.findOne({ id });
    if (existingResident) {
      return res.status(409).json({ error: 'Resident already exists' });
    }
    const resident = Resident.create({ ...req.body })
    res.status(201).json(resident)
  } catch (err) {
    console.log(err)
    manageAllErrors(res, err)
  }
})

router.put('/:residentNum', (req, res) => {
  try {
    res.status(200).json(Resident.update(req.params.residentNum, req.body))
  } catch (err) {
    manageAllErrors(res, err)
  }
})

router.delete('/:residentNum', (req, res) => {
  try {
    Resident.delete(req.params.residentNum)
    res.status(204).end()
  } catch (err) {
    manageAllErrors(res, err)
  }
})

module.exports = router
