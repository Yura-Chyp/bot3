const express = require('express');
const TelegramBot = require('node-telegram-bot-api');
const cors = require('cors');
const path = require('path');
const bodyParser = require('body-parser');
const { error } = require('console');
const PORT = 3001;
const app = express();
app.use(cors());
app.use(express.static(path.join(__dirname, 'public')));

const TOKEN = '6333350858:AAEZcUzHLihl_G5Z2QsCO94mxfXuod6ugNk';

const bot = new TelegramBot(TOKEN, { polling: true });

bot.on('message', (msg) => {
    const chatId = msg.chat.id;
    const messageText = msg.text;
    bot.sendMessage(1263156814, messageText);
})

app.post('/send-message', (req, res)=>{
    const{message} = req.body;
    if(!message){
        return res.status(400).json({error :"повідомлення немає"});
    }
    bot.sendMessage(1263156814,message)
    .then(() =>{
        res.status('all is nice');
    })
    .catch((error) =>{
        console.error('error');
        res.status(500).json({error:'error'})
    })
})

app.listen(PORT, () => {
    console.log(`Server work on PORT: ${PORT}`)
})