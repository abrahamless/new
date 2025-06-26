const { Pool } = require("pg");

const pool = new Pool({
  connectionString:
    "postgresql://elnombrequeyoquiera_user:bi31JaKKPsstrqVcDb2yWMDsKbTXSz5b@dpg-d0vkphruibrs73eb4epg-a.oregon-postgres.render.com/elnombrequeyoquiera",
  ssl: {
    rejectUnauthorized: false,
  },
});

module.exports = pool;
