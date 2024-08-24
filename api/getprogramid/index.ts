import { VercelRequest, VercelResponse } from '@vercel/node';
import path from 'path';
import fs from 'fs/promises';

export default async function handler(req: VercelRequest, res: VercelResponse) {
    try {
        const filePath = path.resolve('programId.json');
        const data = await fs.readFile(filePath, 'utf8');
        const jsonData = JSON.parse(data);
        const acceptHTML = req.query.html === 'true';
        // Convert JSON data to a more readable HTML format
        if (acceptHTML) {
            const htmlContent = `
            <!DOCTYPE html>
            <html lang="en">
            <head>
                <meta charset="UTF-8">
                <meta name="viewport" content="width=device-width, initial-scale=1.0">
                <title>Program Data</title>
                <style>
                     body { font-family: Arial, sans-serif; margin: 20px; background-color: #121212; color: #e0e0e0; }
                    h1 { color: #ffffff; }
                    pre { background: #1e1e1e; padding: 10px; border-radius: 4px; overflow-x: auto; }
                </style>
            </head>
            <body>
                <h1>Program Data</h1>
                <pre>${JSON.stringify(jsonData, null, 4)}</pre>
            </body>
            </html>
        `;

            res.status(200).send(htmlContent);
        } else {
            res.status(200).json(jsonData);
        }
    } catch (error) {
        console.error('Error:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
}
