const express = require ('express');
const router = express.Router();
const Todo = require('../models/todo');

// GET root
router.get('/', (req, res, next) => {
  console.log(req.query); // query string
  res.send('Hello World!');
});

// GET todos
router.get('/todos', (req, res, next) => {
  Todo.find((err, todos) => {
    if (err) {
      return next(err);
    }
    res.json(todos);
  });
});

// POST todos
router.post('/todos', (req, res, next) => {
  Todo.create(req.body, (err, todo) => {
    if (err) {
      return next(err);
    }
    console.log(res.json(todo));
    res.json(todo);
  });
});

// GET todo by id
router.get('/todos/:id', (req, res, next) => {
  Todo.findById(req.params.id, (err, todo) => {
    if (err) {
      return next(err);
    }
    res.json(todo);
  });
});

// PUT todo by id
router.put('/todos/:id', (req, res, next) => {
  Todo.findByIdAndUpdate(req.params.id, req.body, (err, todo) => {
    if (err) {
      return next(err);
    }
    res.json(todo);
  });
});

// DELETE todo by id
router.delete('/todos/:id', (req, res, next) => {
  Todo.findByIdAndRemove(req.params.id, (err, todo) => {
    if (err) {
      return next(err);
    }
    res.json(todo);
  });
});

module.exports = router;

router.get('/todos', (req, res, next) => {
    //this will return all the data, exposing only the id and action field to the client
    Todo.find({}, 'action')
    .then(data => res.json(data))
    .catch(next)
});

router.post('/todos', (req, res, next) => {
    if(req.body.action){
    Todo.create(req.body)
      .then(data => res.json(data))
      .catch(next)
  }else {
    res.json({
      error: "The input field is empty"
    })
  }
});

router.delete('/todos/:id', (req, res, next) => {
    Todo.findOneAndDelete({"_id": req.params.id})
    .then(data => res.json(data))
    .catch(next)
})

module.exports = router;