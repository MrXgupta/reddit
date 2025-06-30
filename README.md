# Reddit Summarizer Bot

This project is a Reddit bot that listens for mentions and replies with a summary of the mentioned post or comment using a transformer model.

---

## Prerequisites

- Python 3.8+
- Node.js 14+
- pip (Python package installer)
- npm (Node package manager)

---

## Setup Instructions

Clone the repository:

```bash
git clone https://github.com/Mrxgupta/reddit-summarizer-bot.git
cd reddit-summarizer-bot
```

## Python Setup (Summarizer Service)
### Create and activate a virtual environment:

```
source venv/bin/activate
Upgrade pip and install dependencies:
python3 -m venv venv
pip install --upgrade pip
pip install flask transformers
```

# Node.js Setup (Reddit Bot)
## Navigate to the bot directory and install dependencies:

```aiignore
cd bot
npm install
```

### Create .env for Reddit Credentials
Inside the bot folder, create an .env file with the following content:

```
REDDIT_CLIENT_ID=your_client_id
USER_AGENT=your_user_agent
REDDIT_CLIENT_SECRET=your_client_secret
REDDIT_USERNAME=your_reddit_username
REDDIT_PASSWORD=your_reddit_password

```
### Replace the values with your actual Reddit API credentials.

---

# Running the Services
## Step 1: Start the summarizer API

Open a terminal, activate the Python environment, and run:

```aiignore
cd /path/to/reddit-summarizer-bot
source venv/bin/activate
python summarizer/summarizer.py
```
### The summarizer service will start on http://localhost:5000.

## Step 2: Start the Reddit bot

Open another terminal and run:

```
cd /path/to/reddit-summarizer-bot/bot
node index.js
```


# How It Works
- The Node.js bot polls Reddit every 30 seconds for new mentions.

- When it finds a mention, it retrieves the content of the post or comment.

- It sends the text to the summarizer API.

- The summarizer API uses the facebook/bart-large-cnn model to generate a summary.

- The bot replies to the mention with the summary.

- The first run will automatically download the model (about ~1GB).

Notes:

Make sure both services are running simultaneously.