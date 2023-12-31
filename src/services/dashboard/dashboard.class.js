/* eslint-disable no-unused-vars */
exports.Dashboard = class Dashboard {
  constructor(options) {
    this.options = options || {};
  }

  setup(app) {
    this.app = app;
  }

  async find(params) {
    const sequelize = await this.app.get('sequelizeClient');

    const queryTotal = await sequelize.query(`
    SELECT COUNT(*) as total_data FROM inventory
    `);

    const queryTahun = await sequelize.query(`
    SELECT YEAR(created_at) as year, COUNT(*) as total_data FROM inventory GROUP BY YEAR(created_at) ORDER BY created_at
    `);

    const data = await sequelize.query(`
    SELECT status, COUNT(*) as total_data
    FROM inventory
    GROUP BY status;
    `);

    const dataLocation = await sequelize.query(`
    SELECT location.lokasi, COUNT(*) as total_data
    FROM inventory
    JOIN location on location.id = inventory.id_location
    GROUP BY id_location;
    `);

    const total = queryTotal[0][0].total_data;
    const tahun = queryTahun[0];
    const location = dataLocation[0];
    const result = {
      total,
      data_status: data[0],
      data_tahun: tahun,
      data_location: location
    };

    return result;
  }

  async get(id, params) {
    return {
      id, text: `A new message with ID: ${id}!`
    };
  }

  async create(data, params) {
    if (Array.isArray(data)) {
      return Promise.all(data.map(current => this.create(current, params)));
    }

    return data;
  }

  async update(id, data, params) {
    return data;
  }

  async patch(id, data, params) {
    return data;
  }

  async remove(id, params) {
    return { id };
  }
};
