Project Purpose.

This project is a PoC (proof of concept) with the objective to verify the microservice development process in nodejs using the moleculer  framework.
For this, a system called question solver was developed whose goal is to perform natural language processing on a user-provided text,  and return keywords found for that text. This will be accomplished through a microservice that is responsible for handling operations with the IBM Watson API. The system has another microservice that allows the processing of mathematical expressions that is performed using the WolframAlpha.com API.
Because it is only a PoC the system interface is a simple html page containing a dynamic form which sends requests to a webserver that acts as a proxy, and sends the client request to a GATEWAY API that route the requests to the correct microservice. 

 
System architecture

The system is composed of the following elements:

Webserver.

Responsible for providing the webpage containing a form with natural language processing or mathematical expression resolution options. NLP allows keywords to be extracted from an input text, while mathematical expression resolution returns the result of operations involving simple and complex calculations.
The webserver was developed using pure nodejs with its core http module, no express...and the webpage in html, css and javascript with the use of the xhr object (XmlHttpRequest)to replace the default html form.    
When the user submits the form, the web server itself processes the request and sends it to the    API gateway.

API Gateway.

It’s a rest API gateway, responsible for receiving the request from webserver, and based on it forward to the correct microservice...it is also responsible for making all the load balance of the system when a service has more than one instance.
For this job I have used MolecularJS which is a framework that assists in the development of  microservices  in NodeJS that offers functionality for logs, metrics, deploying,  fault-tolerant  load balance and more.
 
Microservices.

The natural language processing microservice is responsible for receiving the API Gateway request, connecting to IBM Watson,  forwarding the request and waiting for the response. And return it to API gateway... all this done asynchronously, even because during development it was found great latency on Watson processing who taking up to 8 seconds to extract keywords from a text with less than 100 words...making blocking operations style unfeasible.
The mathematical operations processing microservice performs the same process but using the  WolframAlphaAPI.
Both services use promises as data return.

Considerations.
During the development process the moleculer provides us with a unique environment, only having to worry about developing our services within the Services folder that the moleculer itself automatically records them to be used by the various mechanisms such as logs, metrics and load balance... When deploying using docker or kubernets, the moleculer gateway can communicate with other containers or pods, using traefik as router. By the way, in practice, is the traefik that turns a moleculer project into a microservice when its deployed via Docker-compose or kubernetes.
Although it is a zombie framework, it has had its development stopped for a while, and returned with full force, and is still only in version 0.14 the moleculer can be an option when developing scalable applications in nodejs.

====================================================================================================

Try it.

You need grab your own API Keys from wolframAlpha and IBM Watson on following:

https://cloud.ibm.com/catalog/services/natural-language-understanding
https://products.wolframalpha.com/api/

and put it on moleculer/services/math.services.js and nlp.service.js respectively

After that run all doing:


1. Starting webserver:

cd frontend
node webserver.js


2. Start moleculer services:

cd modeculer
npm run dev








