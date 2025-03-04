import client from "../supabase/client";

const authorizeWithSupabase = async (req, res, next) => {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return res.status(401).json({ error: 'Missing or invalid authorization token' });
  }

  const token = authHeader.split(' ')[1];

  try {
    // Verify the JWT using Supabase
    const { data: user, error } = await client.auth.getUser(token);

    if (error || !user) {
      return res.status(401).json({ error: 'Unauthorized' });
    }

    // Attach the user object to the request for further use
    req.user = user;

    // Proceed to the next middleware or route
    next();
  } catch (err) {
    console.error('Authorization error:', err);
    res.status(500).json({ error: 'Internal server error during authorization' });
  }
};

module.exports = authorizeWithSupabase;
