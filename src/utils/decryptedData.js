import { labelMap } from '../shared/labelMap';
import { statusMap } from '../shared/statusMap';
import { cryptography } from '@liskhq/lisk-client';

export const decryptedData = (
  serverData,
  blockchainData,
  passPhrase,
  pubKey,
  processedFeatures
) => {
  const allAccountData = serverData.concat(
    blockchainData.filter(
      (item) => !serverData.find((elem) => elem.label === item.label)
    )
  );
  return allAccountData.map((elem) => {
    const initialData = {
      ...elem,
      key: elem.label,
      label: labelMap[elem.label] || elem.label,
      status: '',
      value: '',
      seed: '',
    };
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
    const [seed, value] = cryptography
      .decryptMessageWithPassphrase(
        elem.value,
        elem.value_nonce,
        passPhrase,
        pubKey
      )
      .split(':');
    const hashValue = cryptography
      .hash(
        Buffer.concat([
          Buffer.from(seed, 'utf8'),
          cryptography.hash(value, 'utf8'),
        ])
      )
      .toString('hex');
    if (!blockchainData.find((item) => item.label === elem.label)) {
      return {
        ...initialData,
        status: statusMap.stored,
        value,
        seed,
      };
    }
    if (
      blockchainData.find((item) => item.label === elem.label).value !==
      hashValue
    ) {
      return {
        ...initialData,
        status: statusMap.incorrect,
        value,
        seed,
      };
    }
    return {
      ...initialData,
      status: statusMap.completed,
      value,
      seed,
    };
  });
};
