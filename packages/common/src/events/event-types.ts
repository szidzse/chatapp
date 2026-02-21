/*
This is an event contract that defines how events should look in your system
— regardless of whether they go through RabbitMQ, Kafka, or anything else.
*/
export type EventPayload = Record<string, unknown>;

export interface DomainEvent<
  TType extends string,
  TPayload extends EventPayload,
> {
  type: TType;
  payload: TPayload;
  occurredAt: string;
}

export interface EventMetadata {
  correlationId?: string;
  causationId?: string;
  version?: number;
}

export interface OutboundEvent<
  TType extends string,
  TPayload extends EventPayload,
> extends DomainEvent<TType, TPayload> {
  metadata?: EventMetadata;
}

export interface InboundEvent<
  TType extends string,
  TPayload extends EventPayload,
> extends DomainEvent<TType, TPayload> {
  metadata: EventMetadata;
}
