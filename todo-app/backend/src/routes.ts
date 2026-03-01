import mysql from "mysql2/promise";
import { Router, Request, Response } from 'express';
import pool from './db';

const router = Router();

// TODOの型定義
interface Todo {
  id: number;
  title: string;
  completed: boolean;
  created_at: Date;
}

// TODO一覧取得
router.get('/todos', async (req: Request, res: Response) => {
  const [rows] = await pool.query<mysql.RowDataPacket[]>('SELECT * FROM todos ORDER BY created_at DESC');
  res.json(rows as Todo[]);
});

// TODO作成
router.post('/todos', async (req: Request, res: Response) => {
  const { title } = req.body as { title: string };
  const [result] = await pool.query<mysql.ResultSetHeader>(
    'INSERT INTO todos (title) VALUES (?)',
    [title]
  );
  res.json({ id: result.insertId, title, completed: false });
});

// TODO更新
router.put('/todos/:id', async (req: Request, res: Response) => {
  const { completed } = req.body as { completed: boolean };
  await pool.query('UPDATE todos SET completed = ? WHERE id = ?', [completed, req.params.id]);
  res.json({ message: 'updated' });
});

// TODO削除
router.delete('/todos/:id', async (req: Request, res: Response) => {
  await pool.query('DELETE FROM todos WHERE id = ?', [req.params.id]);
  res.json({ message: 'deleted' });
});

export default router;