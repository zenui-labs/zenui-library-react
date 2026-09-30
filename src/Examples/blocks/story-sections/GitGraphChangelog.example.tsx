import {GitGraphChangelog, type ChangelogCommit} from "./GitGraphChangelog";

const commits: ChangelogCommit[] = [
    {
        id: "a1f9c02", message: "chore(release): v2.4.0", kind: "chore", author: "Maya Okafor", date: "2026-09-24", lane: 0, parents: ["b7e21d4"],
        release: {
            version: "v2.4.0",
            notes: [
                {kind: "added", text: "Remote build cache. Point kiln at any S3-compatible bucket with --cache s3://…"},
                {kind: "added", text: "Cache uploads stream in 8 MB chunks, so large artifacts no longer stall CI."},
                {kind: "fixed", text: "The watcher now notices files renamed on APFS."},
                {kind: "fixed", text: "Two builds starting at once can no longer corrupt kiln.lock."},
            ],
        },
    },
    {id: "b7e21d4", message: "Merge branch 'feat/remote-cache'", kind: "feature", author: "Maya Okafor", date: "2026-09-23", lane: 0, parents: ["c03a9e1", "d4410fb"]},
    {id: "d4410fb", message: "feat(cache): remote build cache with content-addressed keys", kind: "feature", author: "Jonas Weber", date: "2026-09-22", lane: 1, parents: ["e19b2c7"]},
    {id: "c03a9e1", message: "fix(watch): pick up renames on APFS volumes", kind: "fix", author: "Priya Raman", date: "2026-09-19", lane: 0, parents: ["f5d0a18"]},
    {id: "e19b2c7", message: "feat(cache): stream uploads in 8 MB chunks", kind: "feature", author: "Jonas Weber", date: "2026-09-15", lane: 1, parents: ["f5d0a18"]},
    {id: "f5d0a18", message: "Merge branch 'fix/lockfile-race'", kind: "fix", author: "Priya Raman", date: "2026-09-10", lane: 0, parents: ["0b8c4e2", "71c2d9a"]},
    {id: "71c2d9a", message: "fix(lock): take an exclusive lock before writing kiln.lock", kind: "fix", author: "Tomás Ibarra", date: "2026-09-08", lane: 2, parents: ["0b8c4e2"]},
    {
        id: "0b8c4e2", message: "chore(release): v2.3.0", kind: "chore", author: "Maya Okafor", date: "2026-08-28", lane: 0, parents: ["93ad1f0"],
        release: {
            version: "v2.3.0",
            notes: [
                {kind: "breaking", text: "Node 18.17 or newer is required."},
                {kind: "breaking", text: "--out-dir is now --output. The old flag has been removed."},
                {kind: "added", text: "Tests are sharded across workers by how long each file took last time."},
            ],
        },
    },
    {id: "93ad1f0", message: "chore!: drop Node 16, require 18.17+", kind: "breaking", author: "Lea Svensson", date: "2026-08-26", lane: 0, parents: ["2e6f0b3"]},
    {id: "2e6f0b3", message: "Merge branch 'feat/parallel-tests'", kind: "feature", author: "Lea Svensson", date: "2026-08-21", lane: 0, parents: ["5a07c11", "8d2e4f9"]},
    {id: "8d2e4f9", message: "feat(test): shard files across workers by past duration", kind: "feature", author: "Tomás Ibarra", date: "2026-08-18", lane: 1, parents: ["c7f1a55"]},
    {id: "5a07c11", message: "feat(cli)!: rename --out-dir to --output", kind: "breaking", author: "Priya Raman", date: "2026-08-12", lane: 0, parents: ["c7f1a55"]},
    {
        id: "c7f1a55", message: "chore(release): v2.2.0", kind: "chore", author: "Maya Okafor", date: "2026-07-30", lane: 0, parents: ["9e04b18"],
        release: {
            version: "v2.2.0",
            notes: [
                {kind: "added", text: "kiln doctor checks your toolchain and explains anything it can't fix."},
                {kind: "fixed", text: "Colors are turned off when output is piped to a file."},
            ],
        },
    },
];

const GitGraphChangelogExample = () => (
    <GitGraphChangelog commits={commits} now={new Date("2026-09-30")} title="Kiln, release by release"/>
);

export default GitGraphChangelogExample;
