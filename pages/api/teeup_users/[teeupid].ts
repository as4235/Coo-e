import {
  db
} from "../../../src/db";
import {
  withApiAuthRequired
} from '@auth0/nextjs-auth0';

export default withApiAuthRequired(async (req, res) => {
  try {
    const {
      teeupid
    } = req.query;

    const teeups = await db.select('users.name as participants', 'contact_mechanism.value', 'users.id as userid',
      'teeup_users.teeupid', 'teeup_users.is_organiser as org', 'user_status.value as user_status')
      .from("teeup_users")
      .join('user_status', 'teeup_users.status', 'user_status.id')
      .join('users', 'users.id', 'teeup_users.usersid')
      .join('user_contact_mechanism', 'users.id', 'user_contact_mechanism.userid')
      .join('contact_mechanism', 'contact_mechanism.id', 'user_contact_mechanism.contactmechanismid')
      .where('teeup_users.teeupid', '=', teeupid);

    res.statusCode = 200;
    return res.json(teeups);
  } catch (error) {
    console.error(error)
    res.status(error.status || 500).end(error.message)
  }
});
