import { Request, Response, NextFunction } from "express";
import * as Joi from "joi"

export const validateRequest = (schema: Joi.Schema) => {
  return (req: Request, res: Response, next: NextFunction) => {
    const { error } = schema.validate(req.body);
    if (error) {
      return res.status(400).json({ error: error.details[0].message });
    }
    next();
  };
};

export const checkUserId = (req: Request, res: Response, next: NextFunction) => {
  const { userId } = req.params;
  const convertedId = parseInt(userId);
  if (!userId || isNaN(convertedId)) {
    return res.status(400).json({ error: 'Invalid user id' });
  }
  next();
};
export const checkBookId = (req: Request, res: Response, next: NextFunction) => {
  const { bookId } = req.params;
  const convertedId = parseInt(bookId);
  if (!bookId || isNaN(convertedId)) {
    return res.status(400).json({ error: 'Invalid book id' });
  }
  next();
};
