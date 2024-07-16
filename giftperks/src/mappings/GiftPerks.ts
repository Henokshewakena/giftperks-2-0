import { BigInt } from "@graphprotocol/graph-ts";
import {
  VIPStatusChanged as VIPStatusChangedEvent,
  TokensAndGiftCardsIssued as TokensAndGiftCardsIssuedEvent,
  SubscriptionExtended as SubscriptionExtendedEvent,
  Subscribed as SubscribedEvent,
  ItemBought as ItemBoughtEvent,
  ItemAdded as ItemAddedEvent,
} from "../types/GiftPerks/GiftPerks";
import {
  VIPStatusChanged,
  TokensAndGiftCardsIssued,
  SubscriptionExtended,
  Subscribed,
  ItemBought,
  ItemAdded,
} from "../types/schema";

export function handleVIPStatusChanged(event: VIPStatusChangedEvent): void {
  let entity = new VIPStatusChanged(event.transaction.hash.toHex());
  entity.customer = event.params.customer;
  entity.isVIP = event.params.isVIP;
  entity.save();
}

export function handleTokensAndGiftCardsIssued(event: TokensAndGiftCardsIssuedEvent): void {
  let entity = new TokensAndGiftCardsIssued(event.transaction.hash.toHex());
  entity.recipient = event.params.recipient;
  entity.tokenAmount = event.params.tokenAmount;
  entity.giftCardAmount = event.params.giftCardAmount;
  entity.save();
}

export function handleSubscriptionExtended(event: SubscriptionExtendedEvent): void {
  let entity = new SubscriptionExtended(event.transaction.hash.toHex());
  entity.customer = event.params.customer;
  entity.endTime = event.params.endTime;
  entity.save();
}