import {
  db
} from "../../src/db";
import {
  withApiAuthRequired
} from '@auth0/nextjs-auth0';

export default withApiAuthRequired(async (req, res) => {
  try {
    const teeupid = req.body.teeupid;
    const userid = req.body.userid;

    await db.from('teeup_users')
      .where('teeupid', teeupid)
      .where('usersid', userid)
      .del()

    await db.from('teeup_suggestion_reactions')
      .where('teeup_id', teeupid)
      .where('user_id', userid)
      .del()

    await db.from('teeups_events')
      .where('teeup_id', teeupid)
      .where('user_id', userid)
      .del()

    await db.from('teeup_snapshots')
      .where('teeup_id', teeupid)
      .where('user_id', userid)
      .del()

    res.statusCode = 200;
    return res.json({ message: "User Removed" });
  } catch (error) {
    console.error(error)
    res.status(error.status || 500).end(error.message)
  }
});
