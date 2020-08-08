"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.userServiceSubscription = void 0;
// set up pub sub topics
var pubsub_1 = require("@google-cloud/pubsub");
var pubSubClient = new pubsub_1.PubSub();
//definitely easier
//create a local topic object that isn't actually in GCP but can be connected
exports.userServiceSubscription = pubSubClient.subscription('location-service-to-user-service');
//does not exist
// export const userTopic2 = getUserTopic()
// //probably better, because it fetchs all the information from gcp about the topic
// async function getUserTopic(){
//     let [topics] = await pubSubClient.getTopics()//get all topics
//     return topics.find((topic)=>{//do gross sideffect bullshit
//         return topic.name === 'projects/tenacious-text-279818/topics/user-service'//match topic name 
//     })
// }
//# sourceMappingURL=index.js.map