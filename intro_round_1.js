// Familiarize with listing models
// Familiarize with creating a basic text completion

require("dotenv").config();
const fs = require("fs");
const { Configuration, OpenAIApi } = require("openai");
const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
});
const openai = new OpenAIApi(configuration);
// 1. Get list of models in the OpenAI API
const getListModels = openai
  .listModels()
  .then((response) => {
    // Create a new html file and write above list models into the file
    fs.writeFile("models/openai_models.html", JSON.stringify(response.data, null, 4), (err) => {
        if (err) {
            console.log(err);
        }
    });
  })
  .catch((error) => {
    console.log(error);
  });


// 2. Write a promise to call openai's createCompletion function
// and return the response with catching any errors that may occur

subject = "yellow socks"
const apiRequest = openai.createCompletion({
    model: "text-davinci-003",
    prompt: `Write a blog post on ${subject}`,
    temperature: 0.7,
    max_tokens: 256,
}).then((response) => {
  subject_title = subject.replace(/ /g,"_")
  fs.writeFile(`outputs/${subject_title}.html`, response.data.choices[0].text, (err) => {
    if (err) {
        console.log(err);
    }
});

}).catch((error) => {
    console.log(error);
});

// apiRequest();

// bryan test