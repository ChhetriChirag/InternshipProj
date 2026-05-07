import os
from flask import Flask, jsonify, request
from flask_cors import CORS
from database import get_entries, init_db, save_entry
from sentiment import classify_mood


def create_app():
    app = Flask(__name__)
    allowed_origins = os.getenv("FRONTEND_URL", "*")
    CORS(app, resources={r"/*": {"origins": allowed_origins}})

    init_db()

    @app.get("/health")
    def health():
        return jsonify({"status": "ok"})

    @app.post("/analyze")
    def analyze():
        payload = request.get_json(silent=True) or {}
        text = (payload.get("text") or "").strip()
        if not text:
            return jsonify({"error": "Text is required."}), 400

        result = classify_mood(text)
        entry_id = save_entry(
            text,
            result["mood"],
            result["score"],
            result["polarity"],
            result["quote"],
            result["music"],
        )
        return jsonify({"id": entry_id, **result}), 201

    @app.get("/entries")
    def entries():
        return jsonify({"entries": get_entries()})

    return app


app = create_app()

if __name__ == "__main__":
    app.run(host="0.0.0.0", port=int(os.getenv("PORT", 5000)), debug=True)
