import {ChangedFiles, type ChangedFile} from "./ChangedFiles";

const changes: ChangedFile[] = [
    {path: "src/auth/refreshToken.ts", change: "modified", additions: 42, deletions: 18},
    {path: "src/auth/session.ts", change: "modified", additions: 7, deletions: 3},
    {path: "src/auth/safariStorage.ts", change: "added", additions: 64, deletions: 0},
    {path: "src/api/client.ts", change: "modified", additions: 12, deletions: 9},
    {path: "src/api/legacyAuth.ts", change: "deleted", additions: 0, deletions: 88},
    {path: "tests/auth/refreshToken.test.ts", change: "added", additions: 96, deletions: 0},
    {path: "tests/auth/session.test.ts", change: "modified", additions: 15, deletions: 4},
    {path: "docs/authentication.md", change: "modified", additions: 9, deletions: 2},
];

const ChangedFilesExample = () => <ChangedFiles files={changes} defaultViewed={["src/auth/session.ts", "docs/authentication.md"]}/>;

export default ChangedFilesExample;
