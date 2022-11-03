require('dotenv').config()
const { Configuration, OpenAIApi } = require("openai");

const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
});

const ai = new OpenAIApi(configuration);


const compute = async (word) => {
    const compute = await ai.createCompletion({
        model: 'text-davinci-002',
        prompt: word,
        temperature: 0,
        max_tokens: 100,
        top_p: 1,
        frequency_penalty: 0,
        presence_penalty: 0,
    });
    
    //return the answer without any additional text
    let computed = compute.data.choices[0].text;
    let numbers = computed.replace(/\D/g,' x ').match(/\d+/g).length; //get total number of numbers
    let answer = computed.replace(/\D/g,' x ').match(/\d+/g)?.[numbers - 1]; //get the last number

    return answer;
}

module.exports = { compute }