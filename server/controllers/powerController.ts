import { Request, Response, NextFunction } from 'express';
import db from '../models/powerModel.js';
import { powerControllerType } from '../../types';

const powerController: powerControllerType = {
  //fetch state power data
  loadState: async (req: Request, res: Response, next: NextFunction) => {
    const state: string = req.params.state;
    try {
      const loadState = [state];
      const stateEnergy =
        'SELECT SUM("total_mw") AS total_mw, SUM("hydro_mw") AS hydro_mw, SUM("wind_mw") AS wind_mw, SUM("solar_mw") AS solar_mw, SUM("geo_mw") AS geo_mw, SUM("bio_mw") AS bio_mw, SUM("hydrops_mw") AS hydroPs_mw FROM power_plants WHERE power_plants."state" ILIKE $1';

      //fetch all energy of given state
      const data = await db.query(stateEnergy, loadState);

      const energyAll: any = data.rows[0];
      const totalMW: number = energyAll.total_mw;
      const energyTotal: any = Object.values(energyAll).reduce(
        (a: any, b: any) => a + b,
        0
      );
      const renewTotal: number = energyTotal - totalMW;
      const renewPct: number = Math.floor((renewTotal / totalMW) * 10000) / 100;
      const nonRenewPct: number = 100 - renewPct;

      //store energy percent in object
      const breakdown: any = {};
      breakdown.state = state;
      breakdown.nonrenew_mw = nonRenewPct;
      breakdown.renew_mw = renewPct;

      for (let key in energyAll) {
        breakdown[key] =
          Math.floor((energyAll[key] / renewTotal) * 10000) / 100;
      }

      delete breakdown.total_mw;
      breakdown.hydro_mw += breakdown.hydrops_mw;
      delete breakdown.hydrops_mw;

      res.locals.stateData = breakdown;

      //send breakdown to frontend
      return next();
    } catch (err) {
      return next({
        log: `Error in the powerController.loadState: ${err}`,
        message: { err: 'Error in fetching state data' },
        status: 500,
      });
    }
  },
};

export default powerController;
