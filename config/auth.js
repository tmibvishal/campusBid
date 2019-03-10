module.exports = {
    ensureAuthenticated: function(redirectLinkAfterLogin){
      return function(req, res, next) {

          req.flash("redirectLink", redirectLinkAfterLogin);

          if (req.isAuthenticated()) {
              return next();
          }
          req.flash('error_msg', 'Please log in to view that resource');
          res.redirect('/users/login');
      };
    }
};