import React, { useEffect, useMemo, useState } from 'react';
import { Link, Navigate, useParams } from 'react-router-dom';
import { generateSvgAvatar } from '../images/GenerateOnboardingSvg/GenerateSvg';
import User06 from '../images/user-28-06.jpg';
import User08 from '../images/user-28-08.jpg';
import User09 from '../images/user-28-09.jpg';
import SharedDataRoadMap from '../partials/sharedData/SharedDataRoadmap';
import { store } from '../store/store';
import { fetchWrapper } from '../shared/fetchWrapper';
import { cryptography } from '@liskhq/lisk-client';
import { generateTransaction } from '../utils/Utils';

function SharedData() {
  const [encryptedData, setEncryptedData] = useState([]);
  const [hasError, setHasError] = useState(false);

  const { id } = useParams();

  const [address, pubKey] = id.split(':');

  const passPhrase = sessionStorage.getItem('passPhrase');

  useEffect(() => {
    fetchWrapper
      .get(`data/shared/${id}`)
      .then((res) => setEncryptedData(res.data ?? []))
      .catch((err) => console.log(err));
  }, [id]);

  const decryptedData = useMemo(() => {
    return encryptedData.map((item) => {
      let seed, value, hash;
      try {
        [seed, value] = cryptography
          .decryptMessageWithPassphrase(
            item.value,
            item.value_nonce,
            passPhrase,
            Buffer.from('a6167f6c9226f325555f280a06f77f09f99150eb0c1343cce1f63fdcc1919ec0', 'hex')
          )
          .split(':');
        hash = cryptography
          .hash(Buffer.concat([Buffer.from(seed, 'utf8'), cryptography.hash(value, 'utf8')]))
          .toString('hex');
      } catch (err) {
        setHasError(true);
        console.log(err);
      } finally {
        return {
          seed,
          value,
          hash,
          label: item.label,
        };
      }
    });
  }, [encryptedData]);

  const validateAccountData = () => {
    const builder = generateTransaction(
      BigInt(store.accountInfo?.sequence?.nonce || 0),
      store.pubKey,
      store.nodeInfo.networkIdentifier,
      store.passPhrase,
      store.nodeInfo?.genesisConfig?.minFeePerByte,
      store.nodeInfo?.genesisConfig?.baseFees
    );

    const signedTx = builder.validate(
      decryptedData.map((e) => ({
        label: e.label,
        value: Buffer.from(e.hash, 'hex'),
      })),
      address
    );

    if (signedTx) {
      fetchWrapper.post('transactions', {}, signedTx).catch((err) => console.log(err));
    }
  };

  if (!passPhrase) return <Navigate to="/" replace={true} />;

  return (
    <main className="bg-white">
      <div className="relative flex">
        {/* Content */}
        <div className="w-full md:w-1/2">
          <div className="min-h-screen h-full flex flex-col after:flex-1">
            <div className="px-4 mt-16 py-9">
              <div className=" flex flex-col max-w-md mx-auto">
                <h1 className="text-3xl text-slate-800 font-bold mb-8">Shared data ✨</h1>
                <ul>
                  {!hasError &&
                    decryptedData.map((item) => (
                      <li key={item.label}>
                        <SharedDataRoadMap data={item} />
                      </li>
                    ))}
                  {hasError &&
                    encryptedData.map((item) => (
                      <li key={item.label}>
                        <SharedDataRoadMap data={item} />
                      </li>
                    ))}
                </ul>
                {!hasError && (
                  <button
                    className="mt-12 btn bg-indigo-500 hover:bg-indigo-600 text-white"
                    onClick={validateAccountData}
                  >
                    Validate data
                  </button>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Image */}
        <div
          className="flex flex-col items-center h-full w-full hidden md:block absolute top-0 bottom-0 right-0 md:w-1/2"
          aria-hidden="true"
        >
          <div className="flex mt-40 flex-col items-center gap-2.5">
            <img
              className="object-cover object-center"
              src={generateSvgAvatar(store.pubKey)}
              width="493px"
              height="493px"
              alt="Onboarding"
            />
            <Link className="mt-12 btn bg-indigo-500 hover:bg-indigo-600 text-white" to="/">
              Get my digital ID
            </Link>
          </div>
        </div>
      </div>
    </main>
  );
}

export default SharedData;
