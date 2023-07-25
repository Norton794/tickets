const sectorService = require('../services/sectorService');

async function getSectors(req, res) {
  try {
    const sectors = await sectorService.getAllSectors();
    res.json(sectors);
  } catch (error) {
    res.status(500).json({ message: 'An error occurred while fetching sectors' });
  }
}

async function getSectorById(req, res) {
  const { id } = req.params;
  try {
    const sector = await sectorService.getSectorById(parseInt(id));
    if (sector) {
      res.json(sector);
    } else {
      res.status(404).json({ message: 'sector not found' });
    }
  } catch (error) {
    res.status(500).json({ message: 'An error occurred while fetching the sector' });
  }
}

async function createSector(req, res) {
  const { name } = req.body;
  try {
    const newSector = await sectorService.createSector(name);
    res.json(newSector);
  } catch (error) {
    res.status(500).json({ message: 'An error occurred while creating a Sector' });
  }
}

async function updateSector(req, res) {
  const { id } = req.params;
  const { name } = req.body;
  try {
    const updatedSector = await sectorService.updateSector(parseInt(id), name);
    if (updatedSector) {
      res.json(updatedSector);
    } else {
      res.status(404).json({ message: 'sector not found' });
    }
  } catch (error) {
    res.status(500).json({ message: 'An error occurred while updating the sector' });
  }
}

async function deleteSector(req, res) {
  const { id } = req.params;
  try {
    const isDeleted = await sectorService.deleteSector(parseInt(id));
    if (isDeleted) {
      res.json({ message: 'sector deleted successfully' });
    } else {
      res.status(404).json({ message: 'sector not found' });
    }
  } catch (error) {
    res.status(500).json({ message: 'An error occurred while deleting the sector' });
  }
}

module.exports = {
  getSectors,
  getSectorById,
  createSector,
  updateSector,
  deleteSector,
};
