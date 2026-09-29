import {LuCalendarClock, LuMail, LuWebhook} from "react-icons/lu";
import {CodeFeatures} from "./CodeFeatures";
import type {CodeFeature, CodeLanguage} from "./CodeFeatures";

const languages: CodeLanguage[] = [
    {id: "ts", label: "TypeScript", file: "send.ts"},
    {id: "python", label: "Python", file: "send.py"},
    {id: "curl", label: "cURL", file: "send.sh"},
];

const features: CodeFeature[] = [
    {
        id: "send",
        icon: LuMail,
        title: "Send with one call",
        body: "Pass a template and the data to fill it. We handle DKIM, retries and bounce suppression.",
        snippets: {
            ts: {
                code: `import { Relay } from "@relay/node";

const relay = new Relay(process.env.RELAY_KEY);

await relay.emails.send({
  from: "Acme <billing@acme.com>",
  to: "maya@example.com",
  template: "invoice-ready",
  data: { amount: "$240.00", due: "Nov 1" },
});`,
                highlight: [5, 6, 7, 8, 9, 10],
            },
            python: {
                code: `from relay import Relay
import os

relay = Relay(os.environ["RELAY_KEY"])

relay.emails.send(
    sender="Acme <billing@acme.com>",
    to="maya@example.com",
    template="invoice-ready",
    data={"amount": "$240.00", "due": "Nov 1"},
)`,
                highlight: [6, 7, 8, 9, 10, 11],
            },
            curl: {
                code: `curl https://api.relay.dev/v1/emails \\
  -H "Authorization: Bearer $RELAY_KEY" \\
  -H "Content-Type: application/json" \\
  -d '{
    "from": "Acme <billing@acme.com>",
    "to": "maya@example.com",
    "template": "invoice-ready"
  }'`,
                highlight: [1, 4, 5, 6, 7, 8],
            },
        },
    },
    {
        id: "schedule",
        icon: LuCalendarClock,
        title: "Schedule for the right moment",
        body: "Send at a fixed time or in each recipient's local morning. Cancel any scheduled email until it leaves.",
        snippets: {
            ts: {
                code: `const email = await relay.emails.send({
  to: "maya@example.com",
  template: "trial-ending",
  sendAt: "2026-11-01T09:00",
  timezone: "recipient",
});

// Changed your mind?
await relay.emails.cancel(email.id);`,
                highlight: [4, 5, 8, 9],
            },
            python: {
                code: `email = relay.emails.send(
    to="maya@example.com",
    template="trial-ending",
    send_at="2026-11-01T09:00",
    timezone="recipient",
)

# Changed your mind?
relay.emails.cancel(email.id)`,
                highlight: [4, 5, 8, 9],
            },
            curl: {
                code: `curl https://api.relay.dev/v1/emails \\
  -H "Authorization: Bearer $RELAY_KEY" \\
  -d '{
    "to": "maya@example.com",
    "template": "trial-ending",
    "send_at": "2026-11-01T09:00",
    "timezone": "recipient"
  }'`,
                highlight: [6, 7],
            },
        },
    },
    {
        id: "events",
        icon: LuWebhook,
        title: "React to every delivery event",
        body: "Signed webhooks tell you when an email is delivered, opened, bounced or marked as spam.",
        snippets: {
            ts: {
                code: `app.post("/webhooks/relay", async (req, res) => {
  const event = relay.webhooks.verify(
    req.body,
    req.headers["relay-signature"],
  );

  if (event.type === "email.bounced") {
    await markInvalid(event.data.to);
  }
  res.sendStatus(200);
});`,
                highlight: [2, 3, 4, 5, 7, 8, 9],
            },
            python: {
                code: `@app.post("/webhooks/relay")
def relay_webhook(request):
    event = relay.webhooks.verify(
        request.body,
        request.headers["relay-signature"],
    )

    if event.type == "email.bounced":
        mark_invalid(event.data["to"])
    return 200`,
                highlight: [3, 4, 5, 6, 8, 9],
            },
            curl: {
                code: `# Register an endpoint for bounce events
curl https://api.relay.dev/v1/webhooks \\
  -H "Authorization: Bearer $RELAY_KEY" \\
  -d '{
    "url": "https://acme.com/webhooks/relay",
    "events": ["email.bounced", "email.complained"]
  }'`,
                highlight: [5, 6],
            },
        },
    },
];

const CodeFeaturesExample = () => <CodeFeatures features={features} languages={languages}/>;

export default CodeFeaturesExample;
