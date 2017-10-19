const notAllowed = ['poop', 'toot', 'shoot', 'geez', 'golly', 'frick', 'frack'];

module.exports = (req, res, next) => {
  while (notAllowed.find(word => req.body.text.includes(word.toLowerCase()))) {
    const badWord = notAllowed.find(word =>
      req.body.text.includes(word.toLowerCase())
    );
    req.body.text = req.body.text.replace(badWord, '*'.repeat(badWord.length));
  }
  next();
};
