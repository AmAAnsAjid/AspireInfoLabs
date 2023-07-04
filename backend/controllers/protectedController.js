/**
 * Handles the protected route.
 * Only allows access if the request contains a valid token.
 */
exports.protected = (req, res) => {
    res.json({ message: 'Protected route accessed successfully' });
  };
  