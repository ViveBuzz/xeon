import { bus } from 'sst/aws/bus';
import { SQSClient, SendMessageCommand } from '@aws-sdk/client-sqs';
import { XEvent } from '../domains/models/event.model';
import { Resource } from 'sst';

const client = new SQSClient();

export const handler = bus.subscriber([XEvent], async (event) => {
  const eventPayload = event.properties;

  await client.send(
    new SendMessageCommand({
      QueueUrl: Resource.XOrderSnapshotQueue.url,
      MessageBody: JSON.stringify(eventPayload),
      MessageGroupId: eventPayload.domainId,
      MessageDeduplicationId: eventPayload.eventId,
    })
  );

  console.log('Event published to XOrderSnapshotQueue success');
});
