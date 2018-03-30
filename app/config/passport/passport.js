var userpat = require("./app/models/userpat")

module.exports = function(passport) {
    var opts = {};
    opts.jwtFromRequest = ExtractJwt.fromAuthHeader();
    opts.secretOrKey = "12345";
    passport.use(new JwtStrategy(opts, function(jwt_payload, done) {
      userpat.findOne({id: jwt_payload.id}, function(err, userpat) {
            if (err) {
                return done(err, false);
            }
            if (userpat) {
                done(null, userpat);
            } else {
                done(null, false);
            }
        });
    }));
  };