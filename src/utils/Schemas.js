export const IdentityModuleSchema = {
  $id: 'idntty/identity/module',
  title: 'Identity module account schema',
  type: 'object',
  properties: {
    features: {
      fieldNumber: 1,
      type: 'array',
      maxItems: 256,
      items: {
        type: 'object',
        required: ['label', 'value'],
        properties: {
          label: { fieldNumber: 1, dataType: 'string' },
          value: { fieldNumber: 2, dataType: 'bytes' },
        },
      },
    },
    verifications: {
      fieldNumber: 2,
      type: 'array',
      items: {
        type: 'object',
        required: ['label', 'account', 'tx'],
        properties: {
          label: { fieldNumber: 1, dataType: 'string' },
          account: { fieldNumber: 2, dataType: 'bytes' },
          tx: { fieldNumber: 3, dataType: 'bytes' },
        },
      },
    },
  },
  default: { features: [], verifications: [] },
};

export const setFeatureAssetSchema = {
  $id: 'idntty/identity/setfeature',
  title: 'Asset schema to set or update account features for identity module',
  type: 'object',
  required: ['features'],
  properties: {
    features: {
      fieldNumber: 1,
      type: 'array',
      minItems: 1,
      maxItems: 16,
      items: {
        type: 'object',
        required: ['label', 'value'],
        properties: {
          label: { fieldNumber: 1, dataType: 'string', maxLength: 16 },
          value: { fieldNumber: 2, dataType: 'bytes', maxLength: 32 },
        },
      },
    },
  },
};

export const removeFeatureAssetSchema = {
  $id: 'idntty/identity/removefeature',
  title: 'Asset schema to remove account features for identity module',
  type: 'object',
  required: ['features'],
  properties: {
    features: {
      fieldNumber: 1,
      type: 'array',
      minItems: 1,
      maxItems: 16,
      items: {
        type: 'object',
        required: ['label'],
        properties: {
          label: { fieldNumber: 1, dataType: 'string', maxLength: 16 },
        },
      },
    },
  },
};

export const validateFeatureAssetSchema = {
  $id: 'idntty/identity/validatefeature',
  title: 'Asset schema to validate account features for identity module',
  type: 'object',
  required: ['recipientAddress', 'features'],
  properties: {
    recipientAddress: {
      fieldNumber: 1,
      dataType: 'bytes',
      minLength: 20,
      maxLength: 20,
    },
    features: {
      fieldNumber: 2,
      type: 'array',
      minItems: 1,
      maxItems: 16,
      items: {
        type: 'object',
        required: ['label', 'value'],
        properties: {
          label: { fieldNumber: 1, dataType: 'string', maxLength: 16 },
          value: { fieldNumber: 2, dataType: 'bytes', maxLength: 32 },
        },
      },
    },
  },
};

export const invalidateFeatureAssetSchema = {
  $id: 'idntty/identity/invalidatefeature',
  title: 'Asset schema to invalidate account features for identity module',
  type: 'object',
  required: ['recipientAddress', 'features'],
  properties: {
    recipientAddress: {
      fieldNumber: 1,
      dataType: 'bytes',
      minLength: 20,
      maxLength: 20,
    },
    features: {
      fieldNumber: 2,
      type: 'array',
      minItems: 1,
      maxItems: 16,
      items: {
        type: 'object',
        required: ['label'],
        properties: {
          label: { fieldNumber: 1, dataType: 'string', maxLength: 16 },
        },
      },
    },
  },
};

export const voteDelegateAssetSchema = {
  $id: 'lisk/dpos/vote',
  type: 'object',
  required: ['votes'],
  properties: {
    votes: {
      type: 'array',
      minItems: 1,
      maxItems: 20,
      items: {
        type: 'object',
        required: ['delegateAddress', 'amount'],
        properties: {
          delegateAddress: {
            dataType: 'bytes',
            fieldNumber: 1,
            minLength: 20,
            maxLength: 20,
          },
          amount: {
            dataType: 'sint64',
            fieldNumber: 2,
          },
        },
      },
      fieldNumber: 1,
    },
  },
};

export const unlockDelegateAssetSchema = {
  $id: 'lisk/dpos/unlock',
  type: 'object',
  required: ['unlockObjects'],
  properties: {
    unlockObjects: {
      type: 'array',
      minItems: 1,
      maxItems: 20,
      items: {
        type: 'object',
        required: ['delegateAddress', 'amount', 'unvoteHeight'],
        properties: {
          delegateAddress: {
            dataType: 'bytes',
            fieldNumber: 1,
            minLength: 20,
            maxLength: 20,
          },
          amount: {
            dataType: 'uint64',
            fieldNumber: 2,
          },
          unvoteHeight: {
            dataType: 'uint32',
            fieldNumber: 3,
          },
        },
      },
      fieldNumber: 1,
    },
  },
};
