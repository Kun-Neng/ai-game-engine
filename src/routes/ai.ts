import express from 'express';
import { AiGameService } from '../services/ai-game.service';

const router = express.Router();

router.post('/recommendation', async (req, res) => {
  const battleStatus = req.body;

  const aiGameService = new AiGameService();

  try {
    const result = await aiGameService.recommandWeaponPlacement(battleStatus);
    console.log(result);

    res.send(result);
  } catch (e: any) {
    console.log('POST error:', e);
    res.send(e.error);
  }
});

export default router;
