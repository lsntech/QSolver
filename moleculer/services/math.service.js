/*
 * Project: Qsolver
 * Module: Math.service
 * Desctiption: Service worker who make requests to wolframAPI.
 * Copyright(c) 2020 Leandro Silva
 * License: MIT Licensed
 */


const fs = require('fs');
const WolframAlphaAPI = require('wolfram-alpha-api');


let file = fs.readFileSync("../../keys.txt", 'utf8');
let keys = JSON.parse(file);

const waApi = WolframAlphaAPI(keys["wolfram"]); // API authentication.




/*
  Function send a call to the wolfram API
*/



async function mathSolver(expression){
    
   return waApi.getShort(expression).
	then((result)=>{
      	return result;
	}).
	catch((error)=>{
		console.log("[mathSolver:error] Operation not found: " + error);
		return "Invalid Operation"
	});
}



module.exports = {
	name: "math",
	actions: {

		solver: {
			params:{
				expr: "string"
			},
			async handler(ctx){
				
				return mathSolver(ctx.params.expr).then((response)=>{
					return response;
				}).catch((error)=>{
					console.log("[Math.Service] Error: " + error); 
					return error;  
				});
			}
        }
    }
};

