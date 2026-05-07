from random import choice
from textblob import TextBlob


MOOD_CONTENT = {
    "Happy": {
        "quotes": [
            "Keep shining. Your energy inspires everyone around you.",
            "Joy grows when you share it.",
            "Today is proof that your heart can lead with light.",
        ],
        "music": [
            "Chill Pop Playlist",
            "Feel-Good Indie Mix",
            "Sunny Morning Acoustic",
        ],
    },
    "Sad": {
        "quotes": [
            "You are allowed to rest. Healing is still progress.",
            "Even cloudy days pass. Be kind to yourself today.",
            "Your feelings are valid, and brighter moments will return.",
        ],
        "music": [
            "Soft Piano Reflections",
            "Lo-fi Comfort Beats",
            "Gentle Rain Ambience",
        ],
    },
    "Angry": {
        "quotes": [
            "Breathe slowly. Calm is your strength.",
            "You can turn intense energy into focused action.",
            "Pause, reset, and choose your next step with clarity.",
        ],
        "music": [
            "Deep Focus Instrumentals",
            "Grounding Drums Session",
            "Ambient Reset Playlist",
        ],
    },
    "Anxious": {
        "quotes": [
            "One step at a time is enough.",
            "You are safe in this moment. Breathe and return to now.",
            "Small progress still counts. Keep going.",
        ],
        "music": [
            "Calm Breathing Sounds",
            "Peaceful Nature Tones",
            "Slow Chill Electronic",
        ],
    },
    "Neutral": {
        "quotes": [
            "Consistency creates change. Keep checking in with yourself.",
            "Balance is powerful. Stay present.",
            "A calm day is also a good day.",
        ],
        "music": [
            "Balanced Focus Playlist",
            "Smooth Jazz Lounge",
            "Daily Productivity Mix",
        ],
    },
}


def classify_mood(text: str):
    blob = TextBlob(text)
    polarity = float(blob.sentiment.polarity)
    lower_text = text.lower()

    if any(word in lower_text for word in ["angry", "mad", "furious", "annoyed"]):
        mood = "Angry"
    elif any(word in lower_text for word in ["anxious", "worried", "nervous", "panic"]):
        mood = "Anxious"
    elif polarity >= 0.25:
        mood = "Happy"
    elif polarity <= -0.25:
        mood = "Sad"
    else:
        mood = "Neutral"

    # Convert polarity -1..1 to 0..100 score.
    score = round((polarity + 1) * 50)
    score = max(0, min(100, score))

    mood_data = MOOD_CONTENT[mood]
    quote = choice(mood_data["quotes"])
    music = choice(mood_data["music"])

    return {
        "mood": mood,
        "score": score,
        "polarity": round(polarity, 3),
        "quote": quote,
        "music": music,
    }
