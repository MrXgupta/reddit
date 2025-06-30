require("dotenv").config();
const snoowrap = require("snoowrap");

// Initialize Reddit client
const r = new snoowrap({
  userAgent: process.env.USER_AGENT,
  clientId: process.env.REDDIT_CLIENT_ID,
  clientSecret: process.env.REDDIT_CLIENT_SECRET,
  username: process.env.REDDIT_USERNAME,
  password: process.env.REDDIT_PASSWORD,
});

// Function to process comments
async function monitorComments() {
  console.log("Bot is running...");

  const subreddit = await r.getSubreddit("test");
  const comments = await subreddit.getNewComments({ limit: 10 });

  for (const comment of comments) {
    if (comment.body.toLowerCase().includes("/summarize") && !comment.saved) {
      const parent = await comment.parent();
      const text = parent.body || parent.title;
      const summary = "This is a summary placeholder.";

      await comment.reply(`**TL;DR:** ${summary}`);
      await comment.save();
      console.log(`Replied to comment ${comment.id}`);
    }
  }
}

// Run every 30 seconds
setInterval(monitorComments, 30 * 1000);
