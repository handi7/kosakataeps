import { getDb } from "../../../database/database";

export default async function getKamus(req, res) {
  try {
    let query = `select * from kamus where kor like '${req.body.word}%' or ind like '${req.body.word}%';`;

    const result = await getDb(query);

    res.status(200).json(result);
  } catch (error) {
    console.log(error);
  }
}
