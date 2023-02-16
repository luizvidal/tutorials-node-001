const express = require("express");
const server = express();
const port = 8080;

server.use(express.json());

const CRUD = {
	cursos: [
		{
			id: 0,
			name: "FullStack Master",
		},

		{
			id: 1,
			name: "Desenvolvimento de Games",
		},

		{
			id: 2,
			name: "Viver de Youtube",
		},
	],
  
	getById: (id) => {
		const curso = CRUD.cursos.find((curso) => curso.id == id);
		return curso;
	},

	get: () => {
		return CRUD.cursos;
	},
  
  post: (curso) => {
    CRUD.cursos.push(curso);
    return CRUD.get();
  },

	put: (id, curso) => {
		const index = CRUD.cursos.indexOf(CRUD.getById(id));
		CRUD.cursos[index] = curso;
		return CRUD.get();
	},
  
  delete: (id) => {
    const index = CRUD.cursos.indexOf(CRUD.getById(id));
    CRUD.cursos.splice(index, 1);
    return CRUD.get();
  }
};

server.get("/curso/:id", (req, res) => {
	const id = req.params.id;
	if (CRUD.getById(id)) res.status(200).json(CRUD.getById(id));
	else res.status(404).send(`Curso não encontrado!`);
});

server.get("/cursos", (req, res) => {
	res.status(200).json(CRUD.get());
});

server.post("/cursos", (req, res) => {
	res.status(201).json(CRUD.post(req.body));
});

server.put("/curso/:id", (req, res) => {
	const id = req.params.id;
  if (CRUD.getById(id)) res.status(200).json(CRUD.put(id, req.body))
  else res.status(404).send('Curso não encontrado!')
});

server.delete('/curso/:id', (req, res) => {
  const id = req.params.id;
  if (CRUD.getById(id)) res.status(200).json(CRUD.delete(id));
  else res.status(404).send('Curso não encontrado!')
})

server.listen(port, () => {
	console.log("Listenning on: http://localhost:8080");
});
