import { VercelRequest, VercelResponse } from '@vercel/node';
import express, { Request, Response } from 'express';
import path from 'path';
import fs from 'fs';

const app = express();

// Define a route with a parameter
app.get('/api/getrealms/:programid', (req: Request, res: Response) => {
    const { programid } = req.params; // Extract the programid from the URL

    if (!programid) {
        res.status(400).json({ error: 'Invalid program ID' });
        return;
    }

    // Construct the file path, targeting the `programIds` directory
    const filePath = path.resolve(`programIds/${programid}.json`);

    // Read the file asynchronously
    fs.readFile(filePath, 'utf8', (err, data) => {
        if (err) {
            if (err.code === 'ENOENT') {
                res.status(404).json({ error: 'File not found' });
            } else {
                res.status(500).json({ error: 'An error occurred while reading the file' });
            }
            return;
        }

        try {
            const jsonData = JSON.parse(data);
            const acceptHTML = req.query.html === 'true';
            if (acceptHTML) {


                // Convert JSON data to a more readable HTML format
                const htmlContent = `
                <!DOCTYPE html>
                <html lang="en">
                <head>
                    <meta charset="UTF-8">
                    <meta name="viewport" content="width=device-width, initial-scale=1.0">
                    <title>Program ID: ${programid}</title>
                    <style>
                    body { font-family: Arial, sans-serif; margin: 20px; background-color: #121212; color: #e0e0e0; }
                    h1 { color: #ffffff; }
                    pre { background: #1e1e1e; padding: 10px; border-radius: 4px; overflow-x: auto; }
                    </style>
                </head>
                <body>
                    <h1>Data for Program ID: ${programid}</h1>
                    <pre>${JSON.stringify(jsonData, null, 4)}</pre>
                </body>
                </html>
            `;
                res.status(200).send(htmlContent);
            } else {
                res.status(200).json(jsonData);
            }
        } catch (parseErr) {
            res.status(500).json({ error: 'Failed to parse JSON file' });
        }
    });
});

// Export the express app as a Vercel serverless function
export default (req: VercelRequest, res: VercelResponse) => {
    app(req, res);
};
