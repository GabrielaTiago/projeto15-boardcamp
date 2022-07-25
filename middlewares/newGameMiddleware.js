import { connection } from "../databases/postgres.js";
import { newGameSchema } from "../schemas/newGameSchema.js";

async function newGameMiddleware(req, res, next) {
  const { name, categoryId } = req.body;
  const validation = newGameSchema.validate(req.body, { abortEarly: true });

  if (validation.error) {
    return res.status(400).send(validation.error.details);
  }

  try {
    const { rows: validCategory } = await connection.query(
      `SELECT * FROM categories WHERE id = $1`,
      [categoryId]
    );

    if(!validCategory) return res.sendStatus(400);

    const { rows: validGame } = await connection.query(
      `SELECT * FROM games WHERE name = $1`,
      [name]
    );
    
    if (!validGame) return res.sendStatus(409);

  } catch (error) {
    console.error(error);
    res.status(500).send("Bad Request");
  }

  next();
}

export { newGameMiddleware };
