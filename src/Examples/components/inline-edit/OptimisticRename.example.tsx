import {OptimisticRename, type Channel, type RenameHandler} from "./OptimisticRename";

const channels: Channel[] = [
    {id: "c1", name: "general", members: 148},
    {id: "c2", name: "design-crit", members: 23},
    {id: "c3", name: "launch-room", members: 41, private: true},
    {id: "c4", name: "support-escalations", members: 17},
];

// Names the server knows about but this list does not show, like archived channels.
const archived = ["announcements", "marketing", "launch"];

// Stand-in for the API. It checks names against the whole workspace, not just this list.
const renameOnServer: RenameHandler = (_id, name, taken) =>
    new Promise<void>((resolve, reject) =>
        window.setTimeout(() => {
            if (archived.includes(name)) reject(new Error(`#${name} belongs to an archived channel.`));
            else if (taken.includes(name)) reject(new Error(`#${name} is already taken.`));
            else resolve();
        }, 900),
    );

const OptimisticRenameExample = () => (
    <OptimisticRename
        channels={channels}
        onRename={renameOnServer}
        footnote="Try renaming a channel to “marketing” or “general” to see the rollback."
    />
);

export default OptimisticRenameExample;
