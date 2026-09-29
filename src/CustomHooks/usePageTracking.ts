import { useLocation } from "react-router-dom";
import { useEffect } from "react";
import ReactGA from "react-ga4";
import {isEmbed} from "@/Helpers/embed.ts";

const usePageTracking = () => {
    const location = useLocation();

    useEffect(() => {
        if (!isEmbed) ReactGA.send({ hitType: "pageview", page: location.pathname + location.search });
    }, [location]);
};

export default usePageTracking;
