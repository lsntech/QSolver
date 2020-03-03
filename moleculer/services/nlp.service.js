const fs = require('fs');
const NaturalLanguageUnderstandingV1 = require('ibm-watson/natural-language-understanding/v1');
const { IamAuthenticator } = require('ibm-watson/auth');


let file = fs.readFileSync("../../keys.txt", 'utf8');
let keys = JSON.parse(file);


/*
IBM Cloud require the creation of a service instance before to use their API.
*/

const nlu = new NaturalLanguageUnderstandingV1({
	authenticator: new IamAuthenticator({ apikey: keys["watson"]}),
	version: '2018-04-05',
	url: 'https://api.us-south.natural-language-understanding.watson.cloud.ibm.com/instances/f309d79c-778d-40ba-800f-9890c7bf0ce8'
});


/*
 Function send a call to IBM Watson service.
*/

async function nlpSolver(expression) {

	return nlu.analyze({html: expression,	features: { keywords: {},  entities: {}	} }) 
		.then((response)=>{ 
			return response
		})
		.catch(err => {
			console.log('error: ', err);
			return err;
        });
}


module.exports = {
	name: "nlp",
    actions: {

		solver: { 
            params: {
				expr: "string"
            },
			async handler(ctx) { 
				
			    return nlpSolver(ctx.params.expr).then((response)=>{
					return response.result;
				}).catch((error)=>{
				   console.log("[Nlp.Service] Error: " + error);
				   return error;
				});
			}
        }
	}
};