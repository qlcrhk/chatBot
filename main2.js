const express = require('express')
const OpenAI = require("openai");
const app = express();

app.use(express.json());
app.use(express.static('public'));
const openai = new OpenAI({
    apiKey: 'api-key를 입력하세요',
});

app.get('/chatbot', (요청, 응답) => {
    응답.sendFile(__dirname + '/index.html')
})

app.post('/getResponse', async (req, res) => {
    // 유저프롬프트를 html에서 받음
    const userPrompt = req.body.userPrompt;

    const response = await openai.chat.completions.create({
        model: "gpt-3.5-turbo",
        messages: [{
            "role": "user",
            "content": userPrompt
        }],
        temperature: 1,
        max_tokens: 100,
        top_p: 1,
        frequency_penalty: 0,
        presence_penalty: 0,
    })
    res.send(response.choices[0].message.content);
})



app.listen(8080, () => {
    console.log("server started");
})
