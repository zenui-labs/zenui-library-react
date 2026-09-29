import {useState} from "react";
import {StockWatchlist, type StockQuote} from "./StockWatchlist";

// Fictional companies and prices, updated with a random walk for the demo.
const seed = [
    {symbol: "NRTH", name: "Northwind Energy", open: 84.12},
    {symbol: "VLTA", name: "Volta Robotics", open: 212.4},
    {symbol: "KSTR", name: "Kestrel Air", open: 38.75},
    {symbol: "ORBT", name: "Orbital Freight", open: 126.9},
    {symbol: "LMNL", name: "Luminal Health", open: 57.3},
];

const createQuotes = (): StockQuote[] =>
    seed.map((quote) => ({
        ...quote,
        price: quote.open,
        history: Array.from({length: 24}, (_, index) => quote.open * (1 + Math.sin(index / 3 + quote.open) * 0.006)),
    }));

const StockWatchlistExample = () => {
    const [quotes, setQuotes] = useState<StockQuote[]>(createQuotes);

    // Moves one random stock a little. Replace this with your price feed.
    const step = () => {
        const index = Math.floor(Math.random() * seed.length);
        setQuotes((current) =>
            current.map((quote, position) => {
                if (position !== index) return quote;
                const move = (Math.random() - 0.48) * quote.price * 0.004;
                const price = Math.max(1, Number((quote.price + move).toFixed(2)));
                if (price === quote.price) return quote;
                return {...quote, price, history: [...quote.history.slice(1), price]};
            }),
        );
    };

    return <StockWatchlist quotes={quotes} onPoll={step}/>;
};

export default StockWatchlistExample;
