const express = require('express');
const router = express.Router();
const firebaseAuthMiddleware = require('../middleware/firebaseAuthMiddleware');
const landParcelController = require('../controllers/landParcelController');

router.use(firebaseAuthMiddleware);

router.get('/', landParcelController.getParcels);
router.post('/', landParcelController.addParcel);
router.put('/:id', landParcelController.updateParcel);
router.delete('/:id', landParcelController.deleteParcel);

module.exports = router;

