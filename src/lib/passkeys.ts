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
// const HOST = 'localhost';
const PORT = 443;

export interface VerificationResponse {
  verified: boolean;
  webAuthnPublicKey?: string;
}

export const registerWithPasskey = async (publicKey: Buffer) => {
  let registrationResponse: RegistrationResponseJSON;
  try {
    const response = await axios.get<PublicKeyCredentialCreationOptionsJSON>(
      `https://${HOST}:${PORT}/register`,
      {
        params: { userID: publicKey.toString('hex') },
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
    `https://${HOST}:${PORT}/register/verify`,
    registrationResponse,
  );
  console.log('Got registration verification response:', verificationResponse);
  return verificationResponse.data;
};

export const loginWithPasskey = async () => {
  let authenticationResponse: AuthenticationResponseJSON;
  try {
    const response = await axios.get<PublicKeyCredentialRequestOptionsJSON>(
      `https://${HOST}:${PORT}/login`,
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
    `https://${HOST}:${PORT}/login/verify`,
    authenticationResponse,
  );
  console.log(
    'Got authentication verification response:',
    verificationResponse,
  );
  return verificationResponse.data;
};
