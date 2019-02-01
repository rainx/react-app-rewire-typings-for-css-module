const rewireTypeingsForCssModule = require("./index");
const fs = require("fs");
const path = require("path");

test("rewireTypingsForCssModule works for default cra config | loader", () => {
  const before = JSON.parse(
    fs.readFileSync(path.resolve("./index.test.before.json"))
  );
  const after = rewireTypeingsForCssModule(before);
  expect(after.module.rules[2].oneOf[4].use[1].loader).toBe(
    "typings-for-css-modules-loader"
  );

  expect(after.module.rules[2].oneOf[6].use[1].loader).toBe(
    "typings-for-css-modules-loader"
  );
});

test("rewireTypingsForCssModule works for default cra config | options", () => {
  const before = JSON.parse(
    fs.readFileSync(path.resolve("./index.test.before.json"))
  );
  const after = rewireTypeingsForCssModule(before);

  expect(Object.keys(after.module.rules[2].oneOf[4].use[1].options)).toContain(
    "namedExport"
  );

  expect(Object.keys(after.module.rules[2].oneOf[4].use[1].options)).toContain(
    "camelCase"
  );
});

test("rewireTypingsForCssModule works for default cra config | factory", () => {
  const before = JSON.parse(
    fs.readFileSync(path.resolve("./index.test.before.json"))
  );
  const after = rewireTypeingsForCssModule.factory({})(before);

  console.log(after.module.rules[2].oneOf[4].use[1].options);

  expect(
    Object.keys(after.module.rules[2].oneOf[4].use[1].options)
  ).not.toContain("namedExport");

  expect(
    Object.keys(after.module.rules[2].oneOf[4].use[1].options)
  ).not.toContain("camelCaseX");
});
