/**
 * Frontend plan display config (mirrors server/config/plans.js).
 *
 * Pricing copy (names, feature bullets, CTA, price strings) lives in i18n under
 * `home.pricing.<i18nKey>`. This module only owns the *structure*: which plans
 * show per audience, which is highlighted, and their backend ids / icons.
 */
import { Star, Zap, Users, Building2, Crown } from "lucide-react";

export const TRIAL_DAYS = 30;
export const CURRENCY = "TND";

// i18nKey → backend plan id (sent to /payments/checkout)
export const PLAN_IDS = {
  soloStarter: "solo_starter",
  soloPro: "solo_pro",
  team: "team",
  business: "business",
  enterprise: "enterprise",
};

// Plans shown per audience, in display order (i18n keys).
export const PLAN_KEYS_BY_AUDIENCE = {
  individual: ["soloStarter", "soloPro"],
  organization: ["team", "business", "enterprise"],
};

// Highlighted ("most popular") plan per audience.
export const POPULAR_BY_AUDIENCE = {
  individual: "soloPro",
  organization: "business",
};

// Per-plan icon + monthly TND price (for quick display without a round-trip).
export const PLAN_META = {
  soloStarter: { icon: Star, priceTND: 19, custom: false },
  soloPro: { icon: Zap, priceTND: 39, custom: false },
  team: { icon: Users, priceTND: 59, custom: false },
  business: { icon: Building2, priceTND: 99, custom: false },
  enterprise: { icon: Crown, priceTND: 199, priceMinTND: 149, custom: true },
};
