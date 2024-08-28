import { Resource } from 'sst';
import { DynamoDBClient } from '@aws-sdk/client-dynamodb';

class Client {
  private static instance: DynamoDBClient | null = null;

  public static getInstance(): DynamoDBClient {
    if (!Client.instance) {
      Client.instance = new DynamoDBClient({});
    }
    return Client.instance;
  }
}
export const client = Client.getInstance();
export const table = Resource.XTable.name;
