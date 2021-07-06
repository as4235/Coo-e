import {
  db
} from "../../../src/db";
import {
  withApiAuthRequired
} from '@auth0/nextjs-auth0';

export default withApiAuthRequired(async (req, res) => {
  try {
    const {
      id
    } = req.query;

    const teeups = await db.select('teeup.id as teeupid', 'teeup.name as teeupnames',
      'teeup_status.value as teeup_status', 'teeup_users.archived', 'user_status.value as user_status')
      .from("teeup")
      .join('teeup_users', 'teeup.id', 'teeup_users.teeupid')
      .join('user_status', 'teeup_users.status', 'user_status.id')
      .join('users', 'teeup_users.usersid', 'users.id')
      .join('teeup_status', 'teeup_status.id', 'teeup.status')
      .join('user_contact_mechanism', 'users.id', 'user_contact_mechanism.userid')
      .join('contact_mechanism', 'contact_mechanism.id', 'user_contact_mechanism.contactmechanismid')
      .where('contact_mechanism.value', "ilike", id);

    res.statusCode = 200;
    return res.json(teeups);
  } catch (error) {
    console.error(error)
    res.status(error.status || 500).end(error.message)
  }
});
