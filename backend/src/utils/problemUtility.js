//axios is like fetch but it's advance version, like when we use fetch("api") then we have to parse it to convert is from json to js object
//but in axios we dont need to to that it happends automatically

const axios = require('axios');


const getLanguageById = (lang)=>{
    const language = {
        "c++":54,
        "java":62,
        "javascript":63
    }

    return language[lang.toLowerCase()];
}

const submitBatch = async (submissions)=>{

    //Judge0 execution code

    const options = {
  method: 'POST',
  url: 'https://judge0-ce.p.rapidapi.com/submissions/batch',
  params: {
    base64_encoded: 'true'
  },
  headers: {
    'x-rapidapi-key': process.env.JUDGE0_API,
    'x-rapidapi-host': 'judge0-ce.p.rapidapi.com',
    'Content-Type': 'application/json'
  },
  data: {
    submissions
    
  }
};

async function fetchData() {
    try {
	  const response = await axios.request(options);
	  return response.data;
    } 
     catch (error) {
    console.error(error);
    }
}

return await fetchData();

}

module.exports = {getLanguageById,submitBatch}