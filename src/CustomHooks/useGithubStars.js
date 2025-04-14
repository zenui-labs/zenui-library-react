import {useEffect, useState} from "react";

export const useGitHubStars = (owner, repo) => {
    const [stars, setStars] = useState(0);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchStars = async () => {

            const storageKey = `github-stars-${owner}-${repo}`;
            const cachedData = localStorage.getItem(storageKey);

            if (cachedData) {
                const { stars: cachedStars, timestamp } = JSON.parse(cachedData);
                const currentTime = new Date().getTime();
                const timeDiff = currentTime - timestamp;
                const oneDayInMs = 24 * 60 * 60 * 1000;

                if (timeDiff < oneDayInMs) {
                    setStars(cachedStars);
                    setLoading(false);
                    return;
                }
            }

            try {
                const response = await fetch(`https://api.github.com/repos/${owner}/${repo}`);
                const data = await response.json();

                if (data.stargazers_count !== undefined) {
                    setStars(data.stargazers_count);

                    localStorage.setItem(
                        storageKey,
                        JSON.stringify({
                            stars: data.stargazers_count,
                            timestamp: new Date().getTime()
                        })
                    );
                }
            } catch (error) {
                console.error("Error fetching GitHub stars:", error);
                if (cachedData) {
                    const { stars: cachedStars } = JSON.parse(cachedData);
                    setStars(cachedStars);
                }
            } finally {
                setLoading(false);
            }
        };

        fetchStars();
    }, [owner, repo]);

    return { stars, loading };
};