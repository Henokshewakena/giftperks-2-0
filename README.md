# GiftPerks Integration with GiftenMarketPlace

## Overview

This project integrates the functionalities of VIP subscriptions, reward issuance, and marketplace interactions into a single `GiftPerks` contract. The contract handles purchases, subscriptions, VIP status management, and reward issuance based on the VIP levels.

## Features

1. **VIP Subscription and Rewards:**
   - Users can subscribe to Gold or Platinum VIP levels using `subscribeGold()` and `subscribePlatinum()` functions from the `VipSubscription` contract.
   - Each subscription deducts the respective cUSD amount and awards a reward, transferring tokens to the subscriber.
   - The `issueRewards()` function in `GiftPerks` calculates and issues rewards based on the user's VIP status.

2. **Marketplace Interaction:**
   - The `buyItem()` and `subscribeToVIP()` functions delegate their operations to the `GiftenMarketPlace` contract.
   - Upon purchasing items or subscribing to VIP levels through the marketplace, the contract checks the caller’s VIP status and extends subscriptions or issues rewards accordingly.

3. **Utility Functions:**
   - `extendSubscription()`, `checkSubscriptionStatus()`: Manage subscription durations and check active subscriptions.
   - `setVIPThreshold()`, `revokeVIPStatus()`: Manage VIP threshold and revoke VIP status for users.

4. **VIP Level Checks:**
   - `isGoldVIP()` and `isPlatinumVIP()`: Placeholder functions to determine if an account qualifies as Gold or Platinum VIP.

5. **Contract Management:**
   - `setTokenAddress()`: Update the token address for payments and rewards.
   - `withdraw()`: Owner function to withdraw funds (cUSD tokens).

## Contract Integration

### Superfluid Integration:

- `ISuperfluid` and `ISuperToken` are used to handle the Superfluid host and cUSD token.
- Subscriptions (`subscribeGold` and `subscribePlatinum`) use `transferFrom` to deduct cUSD from the user and transfer it as a reward.

### VIP Levels and Discounts:

- Users are assigned VIP levels (Gold or Platinum) and can get a discount when purchasing items (`getDiscount`).

### Rewards:

- VIP users receive cUSD rewards when they subscribe to a VIP level.

### Marketplace Integration:

- Functions like `buyItem` and `subscribeToVIP` interact with the `GiftenMarketPlace` contract.

### Subscription Handling:

- Functions to extend subscriptions and check subscription status are included.

## Merged Contract

This merged contract combines the functionality of managing VIP subscriptions, rewards issuance, and marketplace interactions into a single `GiftPerks` contract.

### VIP Subscription and Rewards:

- Users can subscribe to Gold or Platinum VIP levels.
- Subscriptions deduct the respective cUSD amount and award a reward.
- `issueRewards()` function calculates and issues rewards based on the user's VIP status.

### Marketplace Interaction:

- `buyItem()` and `subscribeToVIP()` functions delegate their operations to the `GiftenMarketPlace` contract.
- Upon purchasing items or subscribing to VIP levels, the contract extends subscriptions or issues rewards accordingly.

### Utility Functions:

- `extendSubscription()`, `checkSubscriptionStatus()`: Manage subscription durations and check active subscriptions.
- `setVIPThreshold()`, `revokeVIPStatus()`: Manage VIP threshold and revoke VIP status for users.

### VIP Level Checks:

- `isGoldVIP()` and `isPlatinumVIP()`: Determine if an account qualifies as Gold or Platinum VIP.

### Contract Management:

- `setTokenAddress()`: Update the token address for payments and rewards.
- `withdraw()`: Owner function to withdraw funds.

## Front-End (React) Integration:

- In your React front-end, interact primarily with `GiftenMarketPlace` for actions like purchasing items and subscribing to VIP levels.
- Events emitted from these contracts (`TokensAndGiftCardsIssued`, `SubscriptionExtended`) can update the UI to reflect rewards issued and subscription status changes.

## Summary

By integrating with the `GiftenMarketPlace` contract, the `GiftPerks` contract effectively manages VIP subscriptions, reward issuance, and subscription extensions based on purchases and subscriptions initiated through the marketplace. This setup ensures a cohesive flow between marketplace activities and VIP management, enhancing user experience and engagement within your application.
