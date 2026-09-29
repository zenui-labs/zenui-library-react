import {LuMountainSnow, LuSailboat, LuSun, LuTreePine} from "react-icons/lu";
import {SwipeTiltStack, type Postcard} from "./SwipeTiltStack";

const postcards: Postcard[] = [
    {id: "lofoten", place: "Lofoten", country: "Norway", note: "Midnight sun over Reine. Hiked Reinebringen at 1 am.", date: "Jun 21", icon: LuMountainSnow, art: "from-sky-400 via-indigo-500 to-violet-600"},
    {id: "kyoto", place: "Kyoto", country: "Japan", note: "Arashiyama before the crowds, then tofu at the market.", date: "Apr 3", icon: LuTreePine, art: "from-emerald-400 via-teal-500 to-cyan-700"},
    {id: "amalfi", place: "Amalfi", country: "Italy", note: "Ferry to Positano, lemons everywhere, swam at Fornillo.", date: "Aug 12", icon: LuSailboat, art: "from-cyan-300 via-sky-500 to-blue-700"},
    {id: "atacama", place: "Atacama", country: "Chile", note: "Salt flats at sunset and the clearest night sky yet.", date: "Nov 8", icon: LuSun, art: "from-amber-300 via-orange-500 to-rose-600"},
];

const SwipeTiltStackExample = () => <SwipeTiltStack postcards={postcards}/>;

export default SwipeTiltStackExample;
