import { DynamoDBClient } from "@aws-sdk/client-dynamodb";
import {
    DynamoDBDocumentClient,
    PutCommand,
    marshallOptions,
    unmarshallOptions
} from "@aws-sdk/lib-dynamodb";
import { v4 as generateId } from 'uuid';

export interface DynamoDBItem {
    TenantID?: string;
    TypeID?: string;
    [key: string]: any;
}

const marshallOptions: marshallOptions = {
    convertClassInstanceToMap: true,
    removeUndefinedValues: true,
    convertEmptyValues: true,
};

const unmarshallOptions: unmarshallOptions = {
    wrapNumbers: true,
};

export default class DynamoDBService {
    private client: DynamoDBClient;
    private docClient: DynamoDBDocumentClient;
    private tableName: string;

    constructor(tableName: string, region: string) {
        this.client = new DynamoDBClient({ region });
        this.docClient = DynamoDBDocumentClient.from(this.client, { marshallOptions, unmarshallOptions });
        this.tableName = tableName;
    }

    async saveRequest(item: DynamoDBItem): Promise<void> {
            if (!item.RequestId) {
                throw new Error("RequestId is required");
            }
            if (!item.SystemId) {
                item.TypeID = generateId();
            }
    
            try {
                const command = new PutCommand({
                    TableName: this.tableName,
                    Item: item
                });
    
                await this.docClient.send(command);
            } catch (error) {
                throw new Error("Failed to save request: " + error.message);
            }
        }
}