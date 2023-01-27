const sqlite3 = require("sqlite3");
const { open } = require("sqlite");

export const getDb = async (query) => {
  const db = await open({
    filename: "database/kamus-kr15.db",
    driver: sqlite3.Database,
  });

  return await db.all(query);
};
