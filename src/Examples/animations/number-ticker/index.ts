import type {Example} from "../../types.ts";
import NumberTicker from "./NumberTicker.example.tsx";
import numberTickerSource from "./NumberTicker.example.tsx?raw";
import FlipCountdown from "./FlipCountdown.example.tsx";
import flipCountdownSource from "./FlipCountdown.example.tsx?raw";
import OdometerCounter from "./OdometerCounter.example.tsx";
import odometerCounterSource from "./OdometerCounter.example.tsx?raw";
import CurrencyPricing from "./CurrencyPricing.example.tsx";
import currencyPricingSource from "./CurrencyPricing.example.tsx?raw";
import ProgressRings from "./ProgressRings.example.tsx";
import progressRingsSource from "./ProgressRings.example.tsx?raw";
import StockWatchlist from "./StockWatchlist.example.tsx";
import stockWatchlistSource from "./StockWatchlist.example.tsx?raw";
import SlotReels from "./SlotReels.example.tsx";
import slotReelsSource from "./SlotReels.example.tsx?raw";

const examples: Example[] = [
    {
        id: "stat-counters",
        title: "Stat counters",
        description: "Numbers that count up once when they scroll into view. Supports a prefix, suffix and decimal places.",
        component: NumberTicker,
        source: numberTickerSource,
    },
    {
        id: "odometer-counter",
        title: "Live odometer",
        description: "Each digit rolls on its own column like a car odometer while new installs arrive. Use it for live totals such as downloads, signups or orders.",
        component: OdometerCounter,
        source: odometerCounterSource,
        minHeight: 420,
    },
    {
        id: "currency-pricing",
        title: "Price with currency switch",
        description: "Prices roll to their new value when the currency or billing period changes, and only the characters that differ move. Use it on pricing pages.",
        component: CurrencyPricing,
        source: currencyPricingSource,
        minHeight: 560,
    },
    {
        id: "progress-rings",
        title: "Progress rings",
        description: "Rings fill with a spring while the percentage counts along with them, and the storage ring shifts from green to red as it fills. Use it for quotas, goals and usage.",
        component: ProgressRings,
        source: progressRingsSource,
        minHeight: 440,
    },
    {
        id: "stock-watchlist",
        title: "Live stock watchlist",
        description: "Prices tick in place with a green or red flash, next to sparklines and a scrolling ticker tape. Updates pause while the list is off screen.",
        component: StockWatchlist,
        source: stockWatchlistSource,
        minHeight: 480,
    },
    {
        id: "slot-reels",
        title: "Slot reel draw",
        description: "Four reels spin and stop one after another on a random number, then the result is revealed. Use it for giveaways, raffles and reward reveals.",
        component: SlotReels,
        source: slotReelsSource,
        minHeight: 520,
    },
    {
        id: "flip-countdown",
        title: "Flip countdown",
        description: "A split-flap countdown where each digit folds over when it changes. Use it for launches, sales and event pages.",
        component: FlipCountdown,
        source: flipCountdownSource,
        minHeight: 340,
    },
];

export default examples;
