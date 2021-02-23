const rewireTypeingsForCssModule = require('./index');
const fs = require('fs');
const path = require('path');

test('rewireTypingsForCssModule works for default cra config', () => {
  const json = fs.readFileSync(path.resolve('.', 'index.test.before.json'));
  const after = rewireTypeingsForCssModule(JSON.parse(json));
  expect(after.module.rules[1].oneOf[5].use[1]).toBe(
    'css-modules-typescript-loader'
  );
  expect(
    after.module.rules[1].oneOf[5].use[2].options.modules.exportLocalsConvention
  ).toBe('camelCase');
  expect(after.module.rules[1].oneOf[7].use[1]).toBe(
    'css-modules-typescript-loader'
  );
  expect(
    after.module.rules[1].oneOf[7].use[2].options.modules.exportLocalsConvention
  ).toBe('camelCase');
});
