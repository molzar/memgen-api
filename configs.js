function GetConfig() {}

//put all conf here
const configDB = {
    user: 'memgen',
    password: 'memgen',
    database: 'memgen',
    host: 'localhost',
    port: 5432
};
const someRandomWelcomeMessage = 'Welcome back !';
const realRoutes = ["/api/users", "/api/posts"];
//load all configs into config
//TODO : DO better !
const config = {"configDB" : configDB, "someRandomWelcomeMessage" : someRandomWelcomeMessage, "realRoutes" : realRoutes};

GetConfig.DB = function(){
    return configDB;
};

GetConfig.item = function(parameterName){
  return config[parameterName];
};

module.exports = GetConfig;