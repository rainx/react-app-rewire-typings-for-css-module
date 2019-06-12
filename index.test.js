const rewireTypeingsForCssModule = require("./index");
const fs = require("fs");
const path = require("path");

test("rewireTypingsForCssModule works for default cra config", () => {
  const before = JSON.parse(
    fs.readFileSync(path.resolve("./index.test.before.json"))
  );
  const after = rewireTypeingsForCssModule(before);
  expect(after.module.rules[2].oneOf[4].use[1]).toBe(
    "css-modules-typescript-loader"
  );

  expect(after.module.rules[2].oneOf[6].use[1]).toBe(
    "css-modules-typescript-loader"
  );
});
