import {CodeBlockCopy} from "./CodeBlockCopy";

const commands: Record<string, string> = {
    npm: "npm install @acme/charts",
    pnpm: "pnpm add @acme/charts",
    yarn: "yarn add @acme/charts",
    bun: "bun add @acme/charts",
};

const snippet = `import {LineChart} from "@acme/charts";

export function Revenue({data}) {
  return (
    <LineChart
      data={data}
      x="month"
      y="revenue"
      curve="monotone"
    />
  );
}`;

const CodeBlockCopyExample = () => <CodeBlockCopy commands={commands} defaultValue="pnpm" code={snippet} filename="Revenue.jsx"/>;

export default CodeBlockCopyExample;
