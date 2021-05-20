const express = require("express");
const cors = require("cors");

const { v4: uuidv4, validate: isUuid } = require('uuid');

const app = express();

app.use(express.json());
app.use(cors());
//app.use(checkId);

const repositories = [];

/*function checkId(request, response, next){
  const  {id} = request.params;
  if(!isUuid(id)){
    return response.status(400).json({error: "Invalid Id"});
  }
  else 
    return next();


}
*/

app.get("/repositories", (request, response) => {
  

  return response.json(repositories);

});

app.post("/repositories", (request, response) => {
    const {title, url, techs} = request.body;
    const repository = {id: uuidv4(),title, url,techs, likes: 0};

    repositories.push(repository);
    return response.json(repository);

  
});

app.put("/repositories/:id", (request, response) => {
  const {id} = request.params;
  const {title,url,techs} = request.body;
  //checkId();
  const repositoryIndex = repositories.findIndex(repository=> repository.id === id);
  if (repositoryIndex <0){
    return response.status(400).json({error:"Repositório não encontrado"});
  }
  else{
    const OldRepository = repositories[repositoryIndex];
  
    const repository = {
      id,
      url,
      title,
      techs,
      likes: OldRepository.likes
  }

  if (repository.title==null)
    repository.title=OldRepository.title;
  else if (repository.url ==null)
    repository.url=OldRepository.url;
  else if (repository.techs ==null)
    repository.techs=OldRepository.techs;
  

  repositories[repositoryIndex] = repository;
  return response.json(repository);
  }
  
});

app.delete("/repositories/:id", (request, response) => {
  const {id} = request.params;
  const repositoryIndex = repositories.findIndex(repository => repository.id === id);

  if (repositoryIndex <0) {
    return response.status(400).json({error: "Repositório inválido"});
  }
  else{
    repositories.splice(repositoryIndex,1);
    return response.status(204).send();
  }
});

app.post("/repositories/:id/like", (request, response) => {
  const {id} = request.params;
  const repository = repositories.find(repository => repository.id ===id);

  if (repository === undefined){
    return response.status(400).json({error: "Repositório não encontrado"});
  }
  else {
    repository.likes += 1;
    return response.json(repository);
  }


});

module.exports = app;
