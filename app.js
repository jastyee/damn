require('dotenv').config();

const express = require('express');
const expressLayout = require('express-ejs-layouts');
const app = express();
const PORT = 8000 || process.env.PORT;

const TOKEN = 'vk1.a.wI2hTCCEZCrDougL8j-sgdLeqeVW-apzp-LNcHUPAoiw0vKZF5q9Mhz0nzmAs3tJBGqS2_mPeKfxQPSOxpEs0UoGuu4cOTwcSI1L8JnJASmZDkz3fyH3o3mmlXZUgCOggK1kVyLBln594RpwcIWTVNaP68c_sY1kgO75I3PPWUGRRh2PpTClAoJPVGUrzJYNYAkIM-rXWM7pXp2QWzNiug'
const VkBot = require('node-vk-bot-api');
const bot = new VkBot(TOKEN);

app.use(express.static('public'));
app.use(express.json());

app.use(expressLayout);
app.set('layout', './main');
app.set('view engine', 'ejs');

app.get('', (req, res) => {
    res.render("desktop");
});

app.post('/', (req, res) => {
    const { product_link, nickname, size, buyer_link } = req.body;
    res.send({status:'succes'});
    bot.sendMessage([777650133, 490322651, 401818775, 733493718], `&#9888; Внимание новая заявка! &#9888;\nСсылка на товар: ${product_link}\nРазмер: ${size}\nВК/ТГ: ${buyer_link}\nОбращаться: ${nickname}`)
});

app.listen(PORT, () => {
    console.log(`Сервер запущен и прослушивает порт: ${PORT}`);
});
