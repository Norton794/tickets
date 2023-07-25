const express = require('express');
const router = express.Router();
const sectorController = require('../controllers/sectorController');

router.get('/', sectorController.getSectors);
router.post('/', sectorController.createSector);
router.get('/:id', sectorController.getSectorById);
router.put('/:id', sectorController.updateSector);
router.delete('/:id', sectorController.deleteSector);

module.exports = router;
