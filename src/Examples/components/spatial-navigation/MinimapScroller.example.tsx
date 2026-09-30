import {MinimapScroller} from "./MinimapScroller";

const latency = [182, 190, 176, 188, 410, 1240, 2380, 2210, 1960, 640, 230, 186];

const MinimapScrollerExample = () => (
    <MinimapScroller label="Incident 2291 postmortem">
        <p className="font-mono text-xs uppercase tracking-[0.16em] text-zinc-400">Postmortem · 14 March · Sev 2</p>
        <h1>Checkout latency in eu-west-1</h1>
        <p>
            For 47 minutes on 14 March, checkout requests in eu-west-1 took up to 2.4 seconds at p99 instead of the usual
            190 ms. About 3,100 orders were delayed and 212 were abandoned. No data was lost and no payments were taken twice.
        </p>

        <h2>Summary</h2>
        <p>
            A config change lowered the connection pool of the <code>pricing</code> service from 64 to 16 connections per
            instance. Under the lunchtime peak the pool ran dry, requests queued behind it, and checkout, which calls pricing
            twice per order, waited on both calls.
        </p>
        <p>
            The change was part of a clean-up that moved pool sizes into a shared file. The new default was meant for
            background workers, not for request handlers, and nothing in review showed which services would inherit it.
        </p>

        <h2>Timeline</h2>
        <p>All times are UTC.</p>
        <ul>
            <li><strong>11:52</strong> Config change <code>cfg-8812</code> rolls out to pricing, 20% of hosts.</li>
            <li><strong>12:05</strong> Rollout reaches 100%. Pool wait time starts to climb.</li>
            <li><strong>12:14</strong> p99 checkout latency alert fires. On-call acknowledges within two minutes.</li>
            <li><strong>12:31</strong> Pool exhaustion spotted in pricing metrics. Change identified as the likely cause.</li>
            <li><strong>12:38</strong> Rollback starts. Latency begins to fall within a minute.</li>
            <li><strong>13:01</strong> p99 back under 200 ms. Incident closed at 13:20.</li>
        </ul>

        <figure>
            <svg viewBox="0 0 240 90" className="h-auto w-full max-w-md" role="img" aria-label="p99 checkout latency rose from 190 ms to 2.4 s and recovered by 13:01">
                {latency.map((ms, i) => (
                    <rect key={i} x={i * 20 + 2} y={86 - (ms / 2400) * 80} width={14} height={(ms / 2400) * 80} rx={1.5} className={ms > 1000 ? "fill-orange-500" : "fill-zinc-300 dark:fill-zinc-700"}/>
                ))}
            </svg>
            <figcaption>p99 checkout latency in five-minute buckets, 11:50 to 13:00.</figcaption>
        </figure>

        <h2>Root cause</h2>
        <p>
            Pool sizes used to live next to each service. The clean-up moved them into <code>shared/pools.yaml</code> with a
            fallback for services that did not set a value:
        </p>
        <pre>
            <code>{`pools:
  default:
    max_connections: 16   # sized for batch workers
    acquire_timeout: 5s
  checkout:
    max_connections: 64
  # pricing: not listed, falls back to default`}</code>
        </pre>
        <p>
            Pricing was left out of the file because its old value lived in an environment variable that the migration
            script did not read. With 16 connections and an average hold time of 40 ms, each instance could serve about 400
            requests per second. The lunchtime peak needs roughly 650.
        </p>
        <h3>Why the alert was late</h3>
        <p>
            Pool wait time is recorded, but only as an average. The average stayed under the alert threshold for nine minutes
            while the tail was already several seconds long.
        </p>

        <h2>What went well</h2>
        <ul>
            <li>The rollback was a single command and took effect within a minute.</li>
            <li>Idempotency keys meant no customer was charged twice when their browser retried.</li>
            <li>Support had a status page link within 12 minutes of the first alert.</li>
        </ul>

        <blockquote>
            The fix was fast once we looked in the right place. Getting there took 17 minutes because pool metrics were not on
            the checkout dashboard.
        </blockquote>

        <h2>Action items</h2>
        <ol>
            <li>Fail the config build when a request-serving service falls back to the default pool. <strong>Platform</strong>, due 28 March.</li>
            <li>Alert on p99 pool wait time, not the average. <strong>Observability</strong>, due 21 March.</li>
            <li>Add pricing pool usage to the checkout dashboard. <strong>Payments</strong>, done.</li>
            <li>Roll config changes to one availability zone first and hold for 15 minutes. <strong>Platform</strong>, due 4 April.</li>
        </ol>

        <h3>Follow-up review</h3>
        <p>
            We will review these items on 11 April. Questions go to the #inc-2291 channel, which stays open until then.
            This write-up follows the <a href="https://sre.google/sre-book/postmortem-culture/" target="_blank" rel="noreferrer">blameless postmortem</a> format.
        </p>
    </MinimapScroller>
);

export default MinimapScrollerExample;
