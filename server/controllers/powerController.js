const db = require('../models/powerModel');

const powerController = {};

//fetch state power data
powerController.loadState = async (req, res, next) => {
  const state = req.params.state;
  try {
    const loadState = [state];
    const stateEnergy =
      'SELECT SUM("Total_MW") AS total_mw, SUM("Hydro_MW") AS hydro_mw, SUM("Wind_MW") AS wind_mw, SUM("Solar_MW") AS solar_mw, SUM("Geo_MW") AS geo_mw, SUM("Bio_MW") AS bio_mw, SUM("HydroPS_MW") AS hydroPs_mw FROM power_plants WHERE power_plants."State" ILIKE $1';

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
