# MoodSync AI - Full Stack AI Mood Journal

MoodSync AI is a full stack mood journal web app where users write daily thoughts and get:
- AI sentiment mood classification (`Happy`, `Sad`, `Angry`, `Anxious`, `Neutral`)
- Mood score (0-100) and polarity
- Motivational quote
- Music recommendation
- Beautiful history cards and charts

## Tech Stack

- Frontend: React + Vite + Tailwind CSS + Axios + Recharts
- Backend: Flask + Flask-CORS + SQLite + TextBlob
- Deployment: Vercel (frontend) + Render (backend)

## Project Structure

```text
frontend/
  src/components
  src/pages
  src/services
backend/
  app.py
  database.py
  sentiment.py
  requirements.txt
  runtime.txt
  Procfile
```

## Features

- Dark modern UI with gradient + glassmorphism cards
- Animated landing section for MoodSync AI
- Mood journal input with loading animation
- AI response section with mood, score, quote, music, emoji
- SQLite persistence for all entries
- History page with:
  - Entry cards
  - Weekly mood line chart
  - Mood distribution pie chart
- Toast notifications
- Empty state UI
- Random quote and music suggestion generator based on mood

## Local Setup

### 1) Clone and open project

```bash
git clone <your-repo-url>
cd "Interndhip project"
```

### 2) Backend setup (Flask)

```bash
cd backend
python -m venv .venv
```

#### Windows PowerShell

```powershell
.venv\Scripts\Activate.ps1
```

#### macOS/Linux

```bash
source .venv/bin/activate
```

Install dependencies:

```bash
pip install -r requirements.txt
python -m textblob.download_corpora
```

Create backend environment file (`backend/.env` optional):

```env
PORT=5000
FRONTEND_URL=http://localhost:5173
```

Run backend:

```bash
python app.py
```

Backend runs at `http://127.0.0.1:5000`.

### 3) Frontend setup (React + Vite)

In a new terminal:

```bash
cd frontend
npm install
```

Create frontend env file `frontend/.env`:

```env
VITE_API_BASE_URL=http://127.0.0.1:5000
```

Run frontend:

```bash
npm run dev
```

Frontend runs at `http://localhost:5173`.

## API Endpoints

### `POST /analyze`

Request:

```json
{
  "text": "I am feeling very hopeful and productive today."
}
```

Response:

```json
{
  "id": 1,
  "mood": "Happy",
  "score": 87,
  "polarity": 0.74,
  "quote": "Keep shining. Your energy inspires everyone around you.",
  "music": "Chill Pop Playlist"
}
```

### `GET /entries`

Response:

```json
{
  "entries": [
    {
      "id": 1,
      "text": "I am feeling very hopeful and productive today.",
      "mood": "Happy",
      "score": 87,
      "polarity": 0.74,
      "quote": "...",
      "music": "...",
      "created_at": "2026-05-07 10:10:10"
    }
  ]
}
```

## Database Schema

SQLite database file is auto-created at `backend/moodsync.db`.

```sql
CREATE TABLE entries(
  id INTEGER PRIMARY KEY,
  text TEXT,
  mood TEXT,
  score INTEGER,
  polarity REAL,
  quote TEXT,
  music TEXT,
  created_at TIMESTAMP
);
```

## Deployment

## Deploy Backend on Render

1. Push code to GitHub.
2. Create a new **Web Service** in Render from this repo.
3. Set root directory to `backend`.
4. Build command:
   - `pip install -r requirements.txt`
5. Start command:
   - `gunicorn app:app`
6. Add environment variable:
   - `FRONTEND_URL=https://<your-vercel-domain>`
7. Deploy and copy your Render URL.

## Deploy Frontend on Vercel

1. Import repo in Vercel.
2. Set project root to `frontend`.
3. Framework preset: `Vite`.
4. Add environment variable:
   - `VITE_API_BASE_URL=https://<your-render-domain>`
5. Deploy.

`frontend/vercel.json` already includes SPA rewrite config.

## Production Notes

- CORS is enabled via `FRONTEND_URL` env variable in Flask.
- `Procfile`, `runtime.txt`, and `requirements.txt` are ready for Render.
- Frontend API URL is controlled using `VITE_API_BASE_URL`.

## Useful Commands

Frontend:

```bash
cd frontend
npm run dev
npm run build
npm run preview
```

Backend:

```bash
cd backend
python app.py
gunicorn app:app
```
