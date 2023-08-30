import fs from 'fs';
import path from 'path';
import _ from 'lodash';

const generateDifference = (filepath1, filepath2) => {
  const fullPath1 = path.resolve(filepath1);
  const fullPath2 = path.resolve(filepath2);

  const data1 = fs.readFileSync(fullPath1, 'utf-8');
  const data2 = fs.readFileSync(fullPath2, 'utf-8');

  const parsedData1 = JSON.parse(data1);
  const parsedData2 = JSON.parse(data2);

  const sortedKeys = _.sortBy(_.union(Object.keys(parsedData1), Object.keys(parsedData2)));

  const diff = sortedKeys.map((key) => {
    if (_.has(parsedData1, key) && _.has(parsedData2, key)) {
      if (_.isEqual(parsedData1[key], parsedData2[key])) {
        return `  ${key}: ${parsedData1[key]}`;
      }
      return `- ${key}: ${parsedData1[key]}\n+ ${key}: ${parsedData2[key]}`;
    }
    if (_.has(parsedData1, key)) {
      return `- ${key}: ${parsedData1[key]}`;
    }
    return `+ ${key}: ${parsedData2[key]}`;
  });

  return `{\n${diff.join('\n')}\n}`;
};

export default generateDifference;
