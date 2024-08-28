export const table = new sst.aws.Dynamo('XTable', {
  fields: {
    pk: 'string',
    sk: 'string',
    gsi1pk: 'string',
    gsi1sk: 'string',
    gsi2pk: 'string',
    gsi2sk: 'string',
    gsi3pk: 'string',
    gsi3sk: 'string',
    gsi4pk: 'string',
    gsi4sk: 'string',
  },
  primaryIndex: { hashKey: 'pk', rangeKey: 'sk' },
  globalIndexes: {
    gsi1: { hashKey: 'gsi1pk', rangeKey: 'gsi1sk' },
    gsi2: { hashKey: 'gsi2pk', rangeKey: 'gsi2sk' },
    gsi3: { hashKey: 'gsi3pk', rangeKey: 'gsi3sk' },
    gsi4: { hashKey: 'gsi4pk', rangeKey: 'gsi4sk' },
  },
});
