/* tslint:disable */
/* eslint-disable */
import "sst"
declare module "sst" {
  export interface Resource {
    "MyApi": {
      "type": "sst.aws.ApiGatewayV1"
      "url": string
    }
    "XBus": {
      "arn": string
      "name": string
      "type": "sst.aws.Bus"
    }
    "XOrderSnapshotQueue": {
      "type": "sst.aws.Queue"
      "url": string
    }
    "XOrderSnapshotQueueDLQ": {
      "type": "sst.aws.Queue"
      "url": string
    }
    "XTable": {
      "name": string
      "type": "sst.aws.Dynamo"
    }
  }
}
export {}
