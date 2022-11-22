import { getDb } from "../../database/database";

export default async function getKamus(req, res) {
  try {
    let query = `select * from kamus where bab = 3;`;

    const result = await getDb(query);

    console.log(result);

    res.status(200).send(result);
  } catch (error) {
    console.log(error);
  }
}
