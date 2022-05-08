import express from "express";
import { Request, Response } from "express";
import { todoModel } from "../models";
export const todosController = express();



todosController.get("/", async (_req: Request, res: Response) => {
  const todos = await todoModel.find();

  const serializedTodos = todos.map((todo: any) => ({
    id: todo.id,
    title: todo.title,
    description: todo.description,
    status: todo.status,
  }));

  res.json({ todos: serializedTodos });
});

todosController.post("/", (req: Request, res: Response) => {
  const { todo } = req.body;
  const todoToSave = todoModel.create(todo);
  res.status(200);
});


// deleting an todo
todosController.delete("/delete/:id", async (req: Request, res: Response) => {
  const id = req.params.id;
  try {
    await todoModel.deleteOne({ id: id });
    res.status(201).json({
      message: "Todo deleted",
    });
  } catch (err) {
    return res.status(400).json({
      message: "Unable to delete",
    });
  }
});

// editing an todo
todosController.put("/edit/:id", async (req: Request, res: Response) => {
  const todoid = req.params.id;
  const { title, description, status } = req.body;
  console.log("ID: ", todoid);
  try {
    await todoModel.findByIdAndUpdate(
      todoid,
      { title, description, status }
    );
    res.status(201).json({
      message: "Todo updated",
    });
  } catch (err) {
    return res.status(400).json({
      message: "cant update the todo",
    });
  }
});


// get one todo with its title
todosController.get("/test/:id", async (req: Request, res: Response) => {
  const todoId = req.params.id;
  try {
    const onlyTodo = await todoModel.findById(todoId);
    res.status(201).json({
      message: "Single todo info",
      data: onlyTodo,
    });
  } catch (err) {
    return res.status(400).json({
      message: "we couldnt find your todo",
    });
  }
});