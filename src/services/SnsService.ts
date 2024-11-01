import { PublishCommand, SNSClient } from "@aws-sdk/client-sns";
import { v4 as uuidv4 } from 'uuid';

export default class SnsService {

    public static sendToStandard = async (msg: Request, topic: string, snsClient: SNSClient) => {
        var params = {
            Message: JSON.stringify(msg),
            TopicArn: topic,
        };

        try {
            const data = await snsClient.send(new PublishCommand(params));
            console.log("Sending SNS MESSAGE...", data);
            return data;
        } catch (error) {
            console.log("Error", error);
        }
    };

    public static sendToFifo = async (msg: Request, topic: string, snsClient: SNSClient) => {
        var params = {
            Message: JSON.stringify(msg),
            MessageGroupId: uuidv4(),
            TopicArn: topic,
        };

        try {
            const data = await snsClient.send(new PublishCommand(params));
            console.log("Sending SNS MESSAGE...", data);
            return data; // For unit tests.
        } catch (error) {
            console.log("Error", error);
        }
    };

}