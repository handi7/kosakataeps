import { getDb } from "../../../database/database";

export default async function getKamus(req, res) {
  try {
    let query = `select * from kamus where kor like '${req.query.word}%' or ind like '${req.query.word}%';`;

    const result = await getDb(query);

    res.status(200).send(result);
  } catch (error) {
    console.log(error);
  }
}
