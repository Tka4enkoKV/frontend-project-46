import fs from 'fs';
import path from 'path';
import _ from 'lodash';
import generateDifference from '../src/index.js';

describe('generateDifference function', () => {
  it('should return expected difference', () => {
    const filepath1 = './testdata/file1.json';
    const filepath2 = './testdata/file2.json';

    expect(generateDifference(filepath1, filepath2)).toEqual(`{
- follow: false
  host: hexlet.io
- proxy: 123.234.53.22
- timeout: 50
+ timeout: 20
+ verbose: true
}`);
  });
});
