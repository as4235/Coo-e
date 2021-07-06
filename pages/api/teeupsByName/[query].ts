import {
  db
} from "../../../src/db";
import {
  withApiAuthRequired
} from '@auth0/nextjs-auth0';

export default withApiAuthRequired(async (req, res) => {
  try {
    const {
      query
    } = req.query;
    const value = '%' + query + '%';

    const teeups = await db.select('teeup.id as teeupid', 'teeup.name as teeupname',
      'teeup_status.value as teeupstatus', 'users.name as createdby',
      'teeup.createdat', 'teeup_users.archived')
      .from("teeup")
      .join('teeup_users', 'teeup.id', 'teeup_users.teeupid')
      .join('users', 'users.id', 'teeup.createdby')
      .join('teeup_status', 'teeup_status.id', 'teeup.status')
      .where('teeup.name', 'ilike', value);

    res.statusCode = 200;
    return res.json(teeups);
  } catch (error) {
    console.error(error)
    res.status(error.status || 500).end(error.message)
  }
});
