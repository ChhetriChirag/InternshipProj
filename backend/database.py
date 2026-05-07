import sqlite3
from pathlib import Path


BASE_DIR = Path(__file__).resolve().parent
DB_PATH = BASE_DIR / "moodsync.db"


def get_connection():
    conn = sqlite3.connect(DB_PATH)
    conn.row_factory = sqlite3.Row
    return conn


def init_db():
    with get_connection() as conn:
        conn.execute(
            """
            CREATE TABLE IF NOT EXISTS entries (
                id INTEGER PRIMARY KEY,
                text TEXT NOT NULL,
                mood TEXT NOT NULL,
                score INTEGER NOT NULL,
                polarity REAL NOT NULL,
                quote TEXT NOT NULL,
                music TEXT NOT NULL,
                created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
            )
            """
        )
        conn.commit()


def save_entry(text, mood, score, polarity, quote, music):
    with get_connection() as conn:
        cursor = conn.execute(
            """
            INSERT INTO entries(text, mood, score, polarity, quote, music)
            VALUES (?, ?, ?, ?, ?, ?)
            """,
            (text, mood, score, polarity, quote, music),
        )
        conn.commit()
        return cursor.lastrowid


def get_entries():
    with get_connection() as conn:
        rows = conn.execute(
            """
            SELECT id, text, mood, score, polarity, quote, music, created_at
            FROM entries
            ORDER BY datetime(created_at) DESC
            """
        ).fetchall()
    return [dict(row) for row in rows]
