const { verifySignUp } = require("../middleware");
const controller = require("../controllers/auth.controller");
const { fileUpload } = require('../middleware/multer');
const authJwt = require("../middleware/authJwt");
module.exports = function(app) {
  app.use(function(req, res, next) {
    res.header(
      "Access-Control-Allow-Headers",
      "x-access-token, Origin, Content-Type, Accept"
    );
    next();
  });

  app.post(
    "/api/auth/signup",fileUpload,
    [
      verifySignUp.checkDuplicateUsernameOrEmail,
      verifySignUp.checkRolesExisted
    ],
    controller.signup
  );

  app.post("/api/auth/signin", controller.signin);
app.post("/api/auth/reset", controller.resetPassword);
 app.get("/verify-email/:id", controller.verifyEmail)
  app.get("/reset-password/:token", controller.gettoken);
  app.post("/reset-password/:token",controller.posttoken);
  app.put('/api/auth/update/:id',
  
    fileUpload,
    controller.updateUserById,
  );
  app.get('/api/auth/users', controller.getAllUsers);
  app.delete('/api/auth/delete/:id', controller.deleteUser);
  app.get('/api/auth/getID/:id', controller.getUserById);
  app.get('/api/auth/bannedUser/:id', controller.bannedUser);

};
