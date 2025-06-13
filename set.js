const fs = require('fs-extra');
const { Sequelize } = require('sequelize');
if (fs.existsSync('set.env'))
    require('dotenv').config({ path: __dirname + '/set.env' });
const path = require("path");
const databasePath = path.join(__dirname, './database.db');
const DATABASE_URL = process.env.DATABASE_URL === undefined
    ? databasePath
    : process.env.DATABASE_URL;
module.exports = { session: process.env.SESSION_ID || 'LUCKY-XFORCE••<=>eyJub2lzZUtleSI6eyJwcml2YXRlIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiU0F4d3BQQ0FWQThUWWF2OTRzU2MzSXFtSWN0VWxXOHArd2xSWGljYkIzVT0ifSwicHVibGljIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiTXdDK0NjTzUzbDN2ZE9TQk1vQUpoMmhLOXB4QzJCdlpvc0wzWEVwMEx5MD0ifX0sInBhaXJpbmdFcGhlbWVyYWxLZXlQYWlyIjp7InByaXZhdGUiOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiJFRDcwc2FTbjFYcWxVNkVDRkhEbWlEdDlSZGZSeWZIS1VmUFlIcWhtdjBRPSJ9LCJwdWJsaWMiOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiJPdko0NEI5c0IyZCthaVNJVGJ0VkFHMzlkTjZuUXNUVXJmbnZwRG9Wb2lFPSJ9fSwic2lnbmVkSWRlbnRpdHlLZXkiOnsicHJpdmF0ZSI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6InNKNlcyWlUrUVkxUlE4MitCMmNyaDhiVEVXb1hIV2JlblNlWmt4V1NoMHc9In0sInB1YmxpYyI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6IjZ0dmc2QVdZRHBSdTFYWVFlRWJ2YWN2R3YyUHhPaVVHaTI1dW5XMEd5bHM9In19LCJzaWduZWRQcmVLZXkiOnsia2V5UGFpciI6eyJwcml2YXRlIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiaUdZeUpJMTZVUXRNcElRRTd5S3FGdmxOUXpBbmZTbWxUWHQ3Z3pqVmRFTT0ifSwicHVibGljIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiMDBKUDNUdWxxQlJJeTdUMHVjN0NQT3BrdzAzeERvb3BLZHVqaGN1bWNWTT0ifX0sInNpZ25hdHVyZSI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6IklSMk9vall2czU0bktMZHEzVVkweExJaEtqSXBrLzVTYTNlMGE2SS9jMlVCVEpaRzVRKzhTNHZJa1JJMjlid0IzRUl0b2toeVZPa0VCZVZTOXIvUGpBPT0ifSwia2V5SWQiOjF9LCJyZWdpc3RyYXRpb25JZCI6MTQ4LCJhZHZTZWNyZXRLZXkiOiJXQWNPSUdyWjM2ZytHck1iMXN4aDlPZFZ4M1hPRlZlZU1DQlZ1ZVdUL1ZJPSIsInByb2Nlc3NlZEhpc3RvcnlNZXNzYWdlcyI6W3sia2V5Ijp7InJlbW90ZUppZCI6IjI1NDc2OTY3NzMwNUBzLndoYXRzYXBwLm5ldCIsImZyb21NZSI6dHJ1ZSwiaWQiOiJGMTE4QTg1RDZCMDVBQjNDODc4RDQyNzYwMjhGQjhGOSJ9LCJtZXNzYWdlVGltZXN0YW1wIjoxNzQ5ODMwNDI0fSx7ImtleSI6eyJyZW1vdGVKaWQiOiIyNTQ3Njk2NzczMDVAcy53aGF0c2FwcC5uZXQiLCJmcm9tTWUiOnRydWUsImlkIjoiQUVFRDFDMkFDNzE0QjA1NjYyRTAxQUMzMTI2NDU5ODQifSwibWVzc2FnZVRpbWVzdGFtcCI6MTc0OTgzMDQzM31dLCJuZXh0UHJlS2V5SWQiOjMxLCJmaXJzdFVudXBsb2FkZWRQcmVLZXlJZCI6MzEsImFjY291bnRTeW5jQ291bnRlciI6MSwiYWNjb3VudFNldHRpbmdzIjp7InVuYXJjaGl2ZUNoYXRzIjpmYWxzZX0sImRldmljZUlkIjoiM1FRd1o3LTJRZC01a3ZJOWJ6MGx3QSIsInBob25lSWQiOiI4ZTY4ODcxZC04NTI3LTRkNmItOGNiYS00YzAwNjgxNmQ0MjYiLCJpZGVudGl0eUlkIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiY1puOGU3LytCdkRmdSsyV05CYXQ0bVNRUU1jPSJ9LCJyZWdpc3RlcmVkIjp0cnVlLCJiYWNrdXBUb2tlbiI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6InFqUHpiejNFQUUzclJDdmNlUW0yS015NnkrND0ifSwicmVnaXN0cmF0aW9uIjp7fSwicGFpcmluZ0NvZGUiOiJGUkVERVpSQSIsIm1lIjp7ImlkIjoiMjU0NzY5Njc3MzA1OjQ3QHMud2hhdHNhcHAubmV0IiwibGlkIjoiMzMxMjM0MDg1OTMwNzc6NDdAbGlkIiwibmFtZSI6IkNvbndheTM2MCJ9LCJhY2NvdW50Ijp7ImRldGFpbHMiOiJDT3ZXenRBSEVJQ1dzY0lHR0FFZ0FDZ0EiLCJhY2NvdW50U2lnbmF0dXJlS2V5IjoiN0hOODVHcnNPZmkxK3VvbzM3WkJlWmZUU1JqRVp1aC9KaFVwWlJhclEzUT0iLCJhY2NvdW50U2lnbmF0dXJlIjoieEx6N1BQOG1Za1ltSmFRd2hlOXF1VFhBRTVVMk1SeEFWTDNKQ3FDdUhvT0N1cjJBRWVOWEtudVRndmxZYzBTZW1jZVF5VGdBL1Y0T1ZQT0JiL0NxQVE9PSIsImRldmljZVNpZ25hdHVyZSI6ImYwSlpSNDg0NFhzZUs1TTVHZDdUeHV1YmpjZ2hoWTRkOVNQS2xDUnRBcjRHUndjYnl0dXFPWDE2cUtha0U0V0ZaU3JtWlpNR2Z1UTRZeUFkcHcrMWdBPT0ifSwic2lnbmFsSWRlbnRpdGllcyI6W3siaWRlbnRpZmllciI6eyJuYW1lIjoiMjU0NzY5Njc3MzA1OjQ3QHMud2hhdHNhcHAubmV0IiwiZGV2aWNlSWQiOjB9LCJpZGVudGlmaWVyS2V5Ijp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiQmV4emZPUnE3RG40dGZycUtOKzJRWG1YMDBrWXhHYm9meVlWS1dVV3EwTjAifX1dLCJwbGF0Zm9ybSI6ImFuZHJvaWQiLCJyb3V0aW5nSW5mbyI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6IkNCSUlDQT09In0sImxhc3RBY2NvdW50U3luY1RpbWVzdGFtcCI6MTc0OTgzMDQxMywibGFzdFByb3BIYXNoIjoiUFdrNUIiLCJteUFwcFN0YXRlS2V5SWQiOiJBQUFBQUUrcCJ9',
    PREFIXE: process.env.PREFIX || "V",
    GITHUB : process.env.GITHUB|| 'https://github.com/mr-X-force/LUCKY-MD-XFORCE',
    OWNER_NAME : process.env.OWNER_NAME || "Conway",
    NUMERO_OWNER : process.env.NUMERO_OWNER || "254769677305",
    DEV : process.env.DEV || "254769677305",
              
    AUTO_READ_STATUS: process.env.AUTO_READ_STATUS || "yes",
    AUTO_DOWNLOAD_STATUS: process.env.AUTO_DOWNLOAD_STATUS || 'non',
    AUTO_REACT: process.env.AUTO_REACTION || "non",  
     AUTO_SAVE_CONTACTS : process.env.AUTO_SAVE_CONTACTS || 'no',
    URL: process.env.URL || "https://files.catbox.moe/uw4l17.jpeg",  
    URL2: process.env.URL2 || "https://files.catbox.moe/3o37c5.jpeg",
    AUTO_REACT_STATUS: process.env.AUTO_REACT_STATUS || 'non',              
    CHAT_BOT: process.env.CHAT_BOT || "off",              
    AUTO_READ_MESSAGES: process.env.AUTO_READ_MESSAGES || "yes",
    AUTO_BLOCK: process.env.AUTO_BLOCK || 'no', 
    GCF: process.env.GROUP_HANDLE || 'yes', 
    AUTO_REPLY : process.env.AUTO_REPLY || "no", 
    AUTO_STATUS_TEXT: process.env.AUTO_STATUS_TEXT || 'Your Status Seen By LUCKY-MD-XFORCE',   
    AUTO_STATUS_REPLY: process.env.AUTO_STATUS_REPLY || 'no',
    AUTO_BIO: process.env.AUTO_BIO || 'yes',       
    ANTI_CALL_TEXT : process.env.ANTI_CALL_TEXT || '',             
    GURL: process.env.GURL  || "https://whatsapp.com/channel/0029VaihcQv84Om8LP59fO3f",
    WEBSITE :process.env.GURL || "https://whatsapp.com/channel/0029VaihcQv84Om8LP59fO3f",
    CAPTION : process.env.CAPTION || "LUCKY-MD-XFORCE",
    BOT : process.env.BOT_NAME || 'LUCKY-MD-XFORCE',
    MODE: process.env.PUBLIC_MODE || "no",              
    TIMEZONE: process.env.TIMEZONE || "Africa/Dodoma", 
    PM_PERMIT: process.env.PM_PERMIT || 'no',
    HEROKU_APP_NAME : process.env.HEROKU_APP_NAME || null,
    HEROKU_API_KEY : process.env.HEROKU_API_KEY || null,
    WARN_COUNT : process.env.WARN_COUNT || '3' ,
    ETAT : process.env.PRESENCE || '2',
    DP : process.env.STARTING_BOT_MESSAGE || "yes",
    LUCKY_ADM : process.env.ANTI_DELETE_MESSAGE || 'yes',
    ANTI_DELETE_GROUP : process.env.ANTI_DELETE_GROUP || 'no',
    ANTI_CALL: process.env.ANTI_CALL || 'yes', 
    AUDIO_REPLY : process.env.AUDIO_REPLY || 'yes', 
    CHAT_BOT : process.env.CHATBOT_INBOX || "no",
    VOICE_CHATBOT_INBOX : process.env.VOICE_CHATBOT_INBOX || "no",
    DATABASE_URL,
    DATABASE: DATABASE_URL === databasePath
        ? "postgres://db_7xp9_user:6hwmTN7rGPNsjlBEHyX49CXwrG7cDeYi@dpg-cj7ldu5jeehc73b2p7g0-a.oregon-postgres.render.com/db_7xp9" : "postgres://db_7xp9_user:6hwmTN7rGPNsjlBEHyX49CXwrG7cDeYi@dpg-cj7ldu5jeehc73b2p7g0-a.oregon-postgres.render.com/db_7xp9",
    /* new Sequelize({
     dialect: 'sqlite',
     storage: DATABASE_URL,
     logging: false,
})
: new Sequelize(DATABASE_URL, 
     dialect: 'postgres',
     ssl: true,
     protocol: 'postgres',
     dialectOptions: {
         native: true,
         ssl: { require: true, rejectUnauthorized: false },
     },
     logging: false,
}),*/
};
let fichier = require.resolve(__filename);
fs.watchFile(fichier, () => {
    fs.unwatchFile(fichier);
    console.log(`mise à jour ${__filename}`);
    delete require.cache[fichier];
    require(fichier);
});
