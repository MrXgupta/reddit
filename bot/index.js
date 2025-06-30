require("dotenv").config();
const snoowrap = require("snoowrap");
const axios = require("axios");

const r = new snoowrap({
  userAgent: process.env.USER_AGENT,
  clientId: process.env.REDDIT_CLIENT_ID,
  clientSecret: process.env.REDDIT_CLIENT_SECRET,
  username: process.env.REDDIT_USERNAME,
  password: process.env.REDDIT_PASSWORD,
});

async function monitorMentions() {
  console.log("Bot is running...");

  const mentions = await r.getInbox({ filter: "mentions", limit: 10 });

  for (const mention of mentions) {
    if (!mention.new) continue;

    let textToSummarize = "";

    if (mention.parent_id.startsWith("t3_")) {
      // It's a post
      const post = await r.getSubmission(mention.parent_id.slice(3)).fetch();
      textToSummarize = post.selftext || post.title;
    } else if (mention.parent_id.startsWith("t1_")) {
      // It's a comment
      const comment = await r.getComment(mention.parent_id.slice(3)).fetch();
      textToSummarize = comment.body;
    }

    console.log(`Summarizing text: ${textToSummarize}`);

    const res = await axios.post("http://localhost:5000/summarize", {
      text: textToSummarize,
    });

    const summary = res.data.summary;

    await mention.reply(`**TL;DR:** ${summary} \n\n I am a bot that summarizes posts. This action was performed automatically.`);
    await r.markMessagesAsRead([mention]);

    console.log(`Replied to mention ${mention.id}`);
  }
}

setInterval(monitorMentions, 30 * 1000);
