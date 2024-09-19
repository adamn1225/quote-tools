import axios from 'axios';

export default async function handler(req, res) {
    if (req.method === 'POST') {
        const { input_text } = req.body;
        try {
            const response = await axios.post('http://localhost:8000/generate', { input_text });
            res.status(200).json(response.data);
        } catch (error) {
            res.status(500).json({ error: 'Error generating text' });
        }
    } else {
        res.status(405).json({ error: 'Method not allowed' });
    }
}