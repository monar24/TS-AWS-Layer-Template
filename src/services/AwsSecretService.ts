import {
    SecretsManagerClient,
    GetSecretValueCommand,
    UpdateSecretCommand,
} from "@aws-sdk/client-secrets-manager";

const client = new SecretsManagerClient({
    region: "us-west-2",
});

export default class AwsSecretsService {

    public static getSecrets = async (secretName: string) => {
        try {
            let resp = await client.send(
                new GetSecretValueCommand({
                    SecretId: secretName,
                    VersionStage: "AWSCURRENT",
                })
            );

            const secrets = JSON.parse(resp.SecretString as string);
            return secrets;
        } catch (error) {
            throw new Error('Error: failed to retrieve secret. ' + error.message);
        }
    }

    public static setSecret = async (secretName: string, secretValue: {}) => {
        try {
            await client.send(
                new UpdateSecretCommand({
                    SecretId: secretName,
                    SecretString: JSON.stringify(secretValue),
                })
            );
        } catch (error) {
            throw new Error('Error: failed to update secret. ' + error.message);
        }
    }
}
