export interface BaseEventModel {
  eventId: string;
  domainId: string;
  action: string;
  domainEvent: string;
  payload?: any;
  source: string;
  triggeredBy: string;
  timestamp: number;
  previous?: string;
  storeId?: string;
  deviceId?: string;
  organisationId: string;
}
