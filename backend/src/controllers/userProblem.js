const {getLanguageById,submitBatch} = require('../utils/problemUtility')

const createProblem = async (req,res) =>{

    const {tittle,discriptions,difficulty,tag, visibletestcases,hiddentestcases,startcode,referenceCode,problemcreator} = req.body;

    try{

        for(const {language,Completecode} of referenceCode){

            const languageId = getLanguageById(language);

            const submissions = visibletestcases.map((input,output)=>({
                Source_code:Completecode,
                language_id:languageId,
                stdin:input,
                expected_output:output
            }));

            const submitResult = await submitBatch(submissions);
        }

    }
    catch(err){


    }
}