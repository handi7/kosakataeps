import { getDb } from "../../../database/database";

export default async function getKamus(req, res) {
  try {
    let query = `select * from antonim where kor1 like '${req.query.word}%' 
                or kor2 like '${req.query.word}%' or ind1 like '${req.query.word}%'
                or ind2 like '${req.query.word}%';`;

    const result = await getDb(query);

    res.status(200).send(result);
  } catch (error) {
    console.log(error);
  }
}
