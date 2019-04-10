function GetConfig() {}

const someRandomWelcomeMessage = "Welcome back !";
const realRoutes = [
  "/api/users",
  "/api/posts",
  "/api/proxy",
  "/api/likes",
  "/api/comments"
];
//load all configs into config
//TODO : DO better !
const config = {
  someRandomWelcomeMessage: someRandomWelcomeMessage,
  realRoutes: realRoutes
};

GetConfig.item = function(parameterName) {
  return config[parameterName];
};

module.exports = GetConfig;
