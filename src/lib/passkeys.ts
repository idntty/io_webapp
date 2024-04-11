import axios from 'axios';
import {
  startAuthentication,
  startRegistration,
} from '@simplewebauthn/browser';
import {
  AuthenticationResponseJSON,
  RegistrationResponseJSON,
  PublicKeyCredentialCreationOptionsJSON,
  PublicKeyCredentialRequestOptionsJSON,
} from '@simplewebauthn/typescript-types';

const HOST = 'api.idntty.io';
// const HOST = 'localhost:8000';
const PROTOCOL = 'https';
// const PROTOCOL = 'http';

export interface VerificationResponse {
  verified: boolean;
  webAuthnPublicKey?: string;
}

export const registerWithPasskey = async (publicKey: Buffer) => {
  let registrationResponse: RegistrationResponseJSON;
  try {
    const response = await axios.get<PublicKeyCredentialCreationOptionsJSON>(
      `${PROTOCOL}://${HOST}/register`,
      {
        params: { publicKey: publicKey.toString('hex'), username: 'username' },
        withCredentials: true,
      },
    );
    const options = response.data;
    console.log('Got registration options:', options);

    registrationResponse = await startRegistration(options);
    console.log('Got registration response:', registrationResponse);
  } catch (error) {
    console.error(error);
    throw error;
  }

  const verificationResponse = await axios.post<VerificationResponse>(
    `${PROTOCOL}://${HOST}/register/verify`,
    registrationResponse,
    {
      withCredentials: true,
    },
  );
  console.log('Got registration verification response:', verificationResponse);
  return verificationResponse.data;
};

export const loginWithPasskey = async (publicKey: Buffer) => {
  let authenticationResponse: AuthenticationResponseJSON;
  try {
    const response = await axios.get<PublicKeyCredentialRequestOptionsJSON>(
      `${PROTOCOL}://${HOST}/login`,
      {
        params: { publicKey: publicKey.toString('hex') },
        withCredentials: true,
      },
    );
    const options = response.data;
    console.log('Got authentication options:', options);

    authenticationResponse = await startAuthentication(options);
    console.log('Got authentication response:', authenticationResponse);
  } catch (error) {
    console.error(error);
    throw error;
  }

  const verificationResponse = await axios.post<VerificationResponse>(
    `${PROTOCOL}://${HOST}/login/verify`,
    authenticationResponse,
    {
      withCredentials: true,
    },
  );
  console.log(
    'Got authentication verification response:',
    verificationResponse,
  );
  return verificationResponse.data;
};
