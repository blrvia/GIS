const db = require('../config/db');

const LandParcel = {
  // Get parcels filtered by department and category (if specified)
  async getParcels(department, category) {
    let query = `SELECT id, survey_no, category, ST_AsGeoJSON(geom) AS geometry, department_id FROM land_parcels WHERE department_id = $1`;
    const params = [department];

    if (category) {
      query += ` AND category = $2`;
      params.push(category);
    }
    const { rows } = await db.query(query, params);
    return rows;
  },

  // For admin: get all parcels with optional filters
  async getAllParcels(category) {
    let query = `SELECT id, survey_no, category, ST_AsGeoJSON(geom) AS geometry, department_id FROM land_parcels`;
    const params = [];
    if (category) {
      query += ` WHERE category = $1`;
      params.push(category);
    }
    const { rows } = await db.query(query, params);
    return rows;
  },

  // Add parcel
  async addParcel(survey_no, category, geomGeoJSON, department_id) {
    const query = `
      INSERT INTO land_parcels (survey_no, category, geom, department_id)
      VALUES ($1, $2, ST_SetSRID(ST_GeomFromGeoJSON($3), 4326), $4)
      RETURNING *`;
    const params = [survey_no, category, JSON.stringify(geomGeoJSON), department_id];
    const { rows } = await db.query(query, params);
    return rows[0];
  },

  // Update parcel by id
  async updateParcel(id, survey_no, category, geomGeoJSON, department_id) {
    const query = `
      UPDATE land_parcels
      SET survey_no=$2, category=$3, geom=ST_SetSRID(ST_GeomFromGeoJSON($4), 4326), department_id=$5
      WHERE id=$1 RETURNING *`;
    const params = [id, survey_no, category, JSON.stringify(geomGeoJSON), department_id];
    const { rows } = await db.query(query, params);
    return rows[0];
  },

  // Delete parcel
  async deleteParcel(id) {
    const query = `DELETE FROM land_parcels WHERE id=$1`;
    await db.query(query, [id]);
    return true;
  },
};

module.exports = LandParcel;

