require("dotenv").config();

const { Client, WebhookClient } = require('discord.js');

const client = new Client({
  partials: ['MESSAGE', 'REACTION']
});

const webhookClient = new WebhookClient(
  process.env.WEBHOOK_ID,
  process.env.WEBHOOK_TOKEN,
);

const botUserID = process.env.BOT_USER_ID;
const PREFIX = "<@!" + botUserID + ">";

const https = require("https");

client.on('ready', () => {
  console.log(`${client.user.tag} has logged in.`);
});

client.on('message', async (message) => {
  if (message.author.bot) return;
  if (message.content.startsWith(PREFIX)) {
    const [CMD_NAME, ...args] = message.content
      .trim()
      .substring(PREFIX.length)
      .trim()
      .split(/\s+/);

    console.log("CMD_NAME :: " + CMD_NAME);

    // Simple hello command
    if (CMD_NAME === 'hello') {
      return message.reply(
        "Hello! I am a robot! :robot:"
      );
    }
    // Help command
    else if (CMD_NAME === 'help') {
      return message.reply(
        "Try one of the following commands:\n" +
        "- stats [game_name]\n" +
        "- nextpick\n" +
        "- nextgame\n" +
        "- lastpick\n" +
        "- lastgame\n"
      );
    }
    // Stats command
    else if (CMD_NAME === 'stats') {
      return message.reply(
        "The `stats` command has not been implemented yet... sorry!"
      );
    }
    // Stats command
    else if (CMD_NAME === 'nextpick') {
      return message.reply(
        "The `nextpick` command has not been implemented yet... sorry!"
      );
    }
    // Stats command
    else if (CMD_NAME === 'nextgame') {
      return message.reply(
        "The `nextgame` command has not been implemented yet... sorry!"
      );
    }
    // Stats command
    else if (CMD_NAME === 'lastpick') {
      return message.reply(
        "The `lastpick` command has not been implemented yet... sorry!"
      );
    }
    // Stats command
    else if (CMD_NAME === 'lastgame') {
      return message.reply(
        "The `lastgame` command has not been implemented yet... sorry!"
      );
    }
    // Catfact command
    else if (CMD_NAME === 'catfact') {
      https.get('https://catfact.ninja/fact', (resp) => {
        let data = '';

        resp.on('data', (chunk) => {
          data = data + chunk.toString();
        });

        resp.on('end', () => {
          const fact = JSON.parse(data).fact;
          return message.reply(fact);

        }).on("error", (err) => {
          console.log("CatFacts Error :: " + err.message);
        });
      });
    }
    // Dogfact command
    else if (CMD_NAME === 'dogfact') {
      https.get('https://dog-facts-api.herokuapp.com/api/v1/resources/dogs?number=1', (resp) => {
        let data = '';

        resp.on('data', (chunk) => {
          data = data + chunk.toString();
        });

        resp.on('end', () => {
          const fact = JSON.parse(data)[0].fact;
          return message.reply(fact);

        }).on("error", (err) => {
          console.log("CatFacts Error :: " + err.message);
        });
      });
    }
  }
});

// https://discordjs.guide/miscellaneous/parsing-mention-arguments.html#how-discord-mentions-work
function getUserFromMention(mention) {
  if (!mention) return;

  if (mention.startsWith('<@') && mention.endsWith('>')) {
    mention = mention.slice(2, -1);

    if (mention.startsWith('!')) {
      mention = mention.slice(1);
    }

    return client.users.cache.get(mention);
  }
}


// client.on('messageReactionAdd', (reaction, user) => {
//   const { name } = reaction.emoji;
//   const member = reaction.message.guild.members.cache.get(user.id);
//   if (reaction.message.id === '738666523408990258') {
//     switch (name) {
//       case '🍎':
//         member.roles.add('738664659103776818');
//         break;
//       case '🍌':
//         member.roles.add('738664632838782998');
//         break;
//       case '🍇':
//         member.roles.add('738664618511171634');
//         break;
//       case '🍑':
//         member.roles.add('738664590178779167');
//         break;
//     }
//   }
// });

// client.on('messageReactionRemove', (reaction, user) => {
//   const { name } = reaction.emoji;
//   const member = reaction.message.guild.members.cache.get(user.id);
//   if (reaction.message.id === '738666523408990258') {
//     switch (name) {
//       case '🍎':
//         member.roles.remove('738664659103776818');
//         break;
//       case '🍌':
//         member.roles.remove('738664632838782998');
//         break;
//       case '🍇':
//         member.roles.remove('738664618511171634');
//         break;
//       case '🍑':
//         member.roles.remove('738664590178779167');
//         break;
//     }
//   }
// });

client.login(process.env.DISCORDJS_BOT_TOKEN);
