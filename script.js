const button = document.getElementById('button');
const audioElement = document.getElementById('audio');

// VoiceRSS Javascript SDK is in the Voice.JS file

// Disable/Enable Button
function toggleButton() {
  button.disabled = !button.disabled;  
}
// Passing Joke to Voice RSS API
function tellMe(joke) {
    VoiceRSS.speech({
        key: 'af129532f84841b8b387fccd57ff28e3',
        src: joke,
        hl: 'en-us',
        v: 'Linda',
        r: 0, 
        c: 'mp3',
        f: '44khz_16bit_stereo',
        ssml: false
    });
    // console.log('tell me', joke);
}

// Get Jokes from Joke API
async function getJokes() {
    let joke = '';
    const apiUrl = 'https://v2.jokeapi.dev/joke/Programming?blacklistFlags=nsfw,religious,political,racist,sexist,explicit';
    try {
        const response = await fetch(apiUrl);
        const data = await response.json();
        if (data.setup) {
            joke = `${data.setup} ... ${data.delivery}`;
        } else {
            joke = data.joke;
        }
        // Text-to-Speech
        tellMe(joke);
        // Disable Button
        toggleButton();        
    } catch (error) {
        // Catch Errors Here
        console.log('whoops', error);
    }
}

// Event Listeners
button.addEventListener('click', getJokes);
audioElement.addEventListener('ended', toggleButton);