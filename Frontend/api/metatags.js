import fs from 'fs';
import path from 'path';

export default async function handler(req, res) {
   const {id} = req.query;
   res.setHeader('Content-Type', 'application/json');
   res.send(id)
}