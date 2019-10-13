/**
 * @fileoverview Tests for no-unmet-peer-dependencies rule.
 * @author Will Griffiths
 */

import {preprocess, postprocess} from "../../sources/processor/json.ts"

const jsonText = `
{
  "peerDependencies": {
    "no-deps": "2.0.0"
  },
  "devDependencies": {
    "eslint-plugin-import": "1.0.0"
  },
  "dependencies": {
    "hoisting-peer-check-child": "1.0.0",
    "no-deps": "2.0.0"
  }
}
`;

it('should match snapshot', () => {
  const output = preprocess(jsonText, require.resolve("./pkg-tests-no-unmet-peer-dependencies/hoisting-peer-check-child-1.0.0/package.json"));
  console.log(JSON.stringify(output, null, 2));
  expect(output).toMatchSnapshot()
});

fit('should resolve a module', () => {
  expect(postprocess("", "/Users/will/Projects/berry/packages/acceptance-tests/pkg-tests-fixtures/packages/hoisting-peer-check-child-1.0.0")).toMatchSnapshot()
});
