import { labelMap } from '../shared/labelMap';
import { statusMap } from '../shared/statusMap';
import { cryptography } from '@liskhq/lisk-client';
import { store } from '../store/store';

export const decryptedData = (
  serverData,
  blockchainData,
  passPhrase,
  pubKey,
  processedFeatures,
  verifiedFieldsMap
) => {
  const allAccountData = serverData.concat(
    blockchainData.filter((item) => !serverData.find((elem) => elem.label === item.label))
  );
  return allAccountData.map((elem) => {
    const initialData = {
      ...elem,
      key: elem.label,
      label: labelMap[elem.label] || elem.label,
      status: '',
      value: '',
      seed: '',
      filter: ['all'],
    };

    if (verifiedFieldsMap[elem.label]) initialData.filter.push('Validated');

    if (processedFeatures[elem.label])
      return {
        ...initialData,
        status: statusMap.processed,
        value: elem.value,
      };
    if (!serverData.find((item) => item.label === elem.label)) {
      return {
        ...initialData,
        status: statusMap.blockchained,
        value: elem.value,
      };
    }

    let seed, value;
    try {
      [seed, value] = cryptography
        .decryptMessageWithPassphrase(
          elem.value,
          elem.value_nonce,
          passPhrase,
          Buffer.from(pubKey, 'hex')
        )
        .split(':');
    } catch (e) {
      seed = 'Incorrect value!';
      value = 'Incorrect value!';
    }
    const hashValue = cryptography
      .hash(Buffer.concat([Buffer.from(seed, 'utf8'), cryptography.hash(value, 'utf8')]))
      .toString('hex');
    if (!blockchainData.find((item) => item.label === elem.label)) {
      return {
        ...initialData,
        status: statusMap.stored,
        value,
        seed,
      };
    }
    if (blockchainData.find((item) => item.label === elem.label).value !== hashValue) {
      return {
        ...initialData,
        status: statusMap.incorrect,
        value,
        filter: [...initialData.filter, 'blockchained'],
        seed,
      };
    }
    return {
      ...initialData,
      status: statusMap.completed,
      value,
      filter: [...initialData.filter, 'blockchained'],
      seed,
    };
  });
};
