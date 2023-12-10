const db = require('../models/powerModel');

const powerController = {};

//fetch state power data
powerController.loadState = async (req, res, next) => {
  const state = req.params.state;
  try {
    const loadState = [state];
    const stateEnergy =
      'SELECT SUM("total_mw") AS total_mw, SUM("hydro_mw") AS hydro_mw, SUM("wind_mw") AS wind_mw, SUM("solar_mw") AS solar_mw, SUM("geo_mw") AS geo_mw, SUM("bio_mw") AS bio_mw, SUM("hydrops_mw") AS hydroPs_mw FROM power_plants WHERE power_plants."state" ILIKE $1';

    //fetch all energy of given state
    const data = await db.query(stateEnergy, loadState);

    const energyAll = data.rows[0];
    const totalMW = energyAll.total_mw;
    const renewTotal =
      Object.values(energyAll).reduce((a, b) => a + b, 0) - totalMW;
    const renewPct = Math.floor((renewTotal / totalMW) * 10000) / 100;
    const nonRenewPct = 100 - renewPct;

    //store energy percent in object
    breakdown = {};
    breakdown.state = state;
    breakdown.nonrenew_mw = nonRenewPct;
    breakdown.renew_mw = renewPct;

    for (let key in energyAll) {
      breakdown[key] = Math.floor((energyAll[key] / renewTotal) * 10000) / 100;
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
};

module.exports = powerController;
