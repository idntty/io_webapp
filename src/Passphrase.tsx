import styled from 'styled-components';

// Page is the top-level container for the page
// It is divided into 2 sections: Left and Right
const Page = styled.div`
  display: flex;
  flex-direction: row;
  height: 100vh;
  width: 100vw;
  overflow: hidden;
  background-color: #fff;
  font-family: 'Inter';
  font-size: 16px;
  line-height: 24px;
  color: #000;
  box-sizing: border-box;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
`;

// Right component is empty for now but takes up right 50% of the page
const Right = styled.div`
  flex: 1 0 0;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
  align-self: stretch;
  background-color: #f9fafb;
`;

// Left component has 3 sections: Header, Main, and Footer and takes up left 50% of the page
const Left = styled.div`
  flex: 1 0 0;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
  align-self: stretch;
`;

const LogoIcon = styled.img`
  width: 88.96px;
  height: 32px;
`;
const Header = styled.header`
  align-self: stretch;
  height: 96px;
  display: flex;
  padding: 32px;
  box-sizing: border-box;
`;

const Terms = styled.a`
  color: inherit;
`;
const Copyright = styled.div``;
const Footer = styled.footer`
  height: 60px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 20px 32px;
  box-sizing: border-box;
  text-align: center;
  font-size: 12px;
  color: #98a2b3;
  line-height: 18px;
`;

const Main = styled.main`
  display: flex;
  padding: 0px 32px;
  flex-direction: column;
  align-items: center;
  align-self: stretch;
`;
const Content = styled.div`
  display: flex;
  width: 360px;
  flex-direction: column;
  align-items: center;
  gap: 32px;
`;
const MainText = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 12px;
  align-self: stretch;
`;
const Title = styled.div`
  align-self: stretch;
  color: #101828;
  font-family: Inter;
  font-size: 30px;
  font-style: normal;
  font-weight: 600;
  line-height: 38px;
`;
const MainDescription = styled.div`
  align-self: stretch;
  color: #667085;
  font-family: Inter;
  font-size: 16px;
  font-style: normal;
  font-weight: 400;
  line-height: 24px;
`;

const PassphraseGeneration = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 24px;
  align-self: stretch;
  border-radius: 12px;
`;

const Divider = styled.div`
  height: 1px;
  align-self: stretch;
  background: #eaecf0;
`;

const PassphraseWords = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  align-content: center;
  gap: 20px;
  align-self: stretch;
  flex-wrap: wrap;
`;
const PassphraseWord = styled.div`
  display: flex;
  padding: 2px 8px;
  justify-content: center;
  align-items: center;
  border-radius: 16px;
  background: #f9f5ff;
  color: #6941c6;
  text-align: center;
  font-family: Inter;
  font-size: 12px;
  font-style: normal;
  font-weight: 500;
  line-height: 18px;
`;

const ActionButtons = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 16px;
  align-self: stretch;
`;
const ActionButton = styled.div`
  display: flex;
  align-items: flex-start;
  border-radius: 8px;
  cursor: pointer;
`;
const ActionButtonBase = styled.div`
  display: flex;
  width: 20px;
  padding: 12px;
  justify-content: center;
  align-items: center;
  gap: 8px;
  border-radius: 8px;
  border: 1px solid #d0d5dd;
  background: #fff;
  box-shadow: 0px 1px 2px 0px rgba(16, 24, 40, 0.05);
`;
const ActionIcon = styled.img`
  width: 20px;
  height: 20px;
  flex-shrink: 0;
`;

const Rest = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 16px;
  align-self: stretch;
`;
const ConfirmDownloadRow = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  align-self: stretch;
`;

const DividerWithText = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
  align-self: stretch;
`;
const InlineDivider = styled.div`
  height: 1px;
  flex: 1 0 0;
  background: #eaecf0;
`;
const DividerText = styled.div`
  color: #667085;
  text-align: center;
  font-family: Inter;
  font-size: 14px;
  font-style: normal;
  font-weight: 400;
  line-height: 20px;
`;

const SaveConfirmation = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
`;
const Checkbox = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`;
const CheckboxBase = styled.div`
  width: 16px;
  height: 16px;
  border-radius: 4px;
  border: 1px solid #d0d5dd;
  background: #fff;
`;
const ConfirmationText = styled.div`
  color: #344054;
  font-family: Inter;
  font-size: 14px;
  font-style: normal;
  font-weight: 500;
  line-height: 20px;
`;
const DownloadLink = styled.a`
  color: #6941c6;
  font-family: Inter;
  font-size: 14px;
  font-style: normal;
  font-weight: 600;
  line-height: 20px;
  text-decoration: none;
`;

const ContinueButton = styled.a`
  display: flex;
  align-items: flex-start;
  align-self: stretch;
  border-radius: 8px;
  text-decoration: none;
  cursor: pointer;
`;
const ContinueButtonBase = styled.div`
  display: flex;
  padding: 10px 18px;
  justify-content: center;
  align-items: center;
  gap: 8px;
  flex: 1 0 0;
  border-radius: 8px;
  border: 1px solid #e9d7fe;
  background: #e9d7fe;
  box-shadow: 0px 1px 2px 0px rgba(16, 24, 40, 0.05);
`;
const ContinueButtonText = styled.div`
  color: #fff;
  font-family: Inter;
  font-size: 16px;
  font-style: normal;
  font-weight: 600;
  line-height: 24px;
`;

const LogInPrompt = styled.div`
  display: flex;
  justify-content: center;
  align-items: flex-start;
  gap: 4px;
  align-self: stretch;
`;
const LogInPromptText = styled.div`
  color: #667085;
  font-family: Inter;
  font-size: 14px;
  font-style: normal;
  font-weight: 400;
  line-height: 20px;
`;
const LogInLink = styled.a`
  color: #6941c6;
  font-family: Inter;
  font-size: 14px;
  font-style: normal;
  font-weight: 600;
  line-height: 20px;
  text-decoration: none;
`;

export default function Passphrase() {
  const passphraseWords = [
    'sniff',
    'trap',
    'frog',
    'camera',
    'lamp',
    'same',
    'trap',
    'biology',
    'nephew',
    'office',
    'snap',
    'vendor',
  ];
  const actionNames = ['refresh-cw', 'copy', 'edit'];

  return (
    <Page>
      <Left>
        <Header>
          <LogoIcon alt="" src="/logo.svg" />
        </Header>
        <Main>
          <Content>
            <MainText>
              <Title>Craft your passphrase</Title>
              <MainDescription>
                Generate a unique pass phrase. This secret code will be the
                guardian of your digital identity, ensuring it remains
                exclusively yours.
              </MainDescription>
            </MainText>
            <PassphraseGeneration>
              <Divider />
              <PassphraseWords>
                {passphraseWords.map((word, index) => (
                  <PassphraseWord key={index}>{word}</PassphraseWord>
                ))}
              </PassphraseWords>
              <ActionButtons>
                {actionNames.map((actionName, index) => (
                  <ActionButton key={index}>
                    <ActionButtonBase>
                      <ActionIcon alt={actionName} src={`/${actionName}.svg`} />
                    </ActionButtonBase>
                  </ActionButton>
                ))}
              </ActionButtons>
              <Rest>
                <DividerWithText>
                  <InlineDivider />
                  <DividerText>Your Key to Security</DividerText>
                  <InlineDivider />
                </DividerWithText>
                <ConfirmDownloadRow>
                  <SaveConfirmation>
                    <Checkbox>
                      <CheckboxBase />
                    </Checkbox>
                    <ConfirmationText>
                      I have saved my passphrase
                    </ConfirmationText>
                  </SaveConfirmation>
                  <DownloadLink href="#">Download</DownloadLink>
                </ConfirmDownloadRow>
                <ContinueButton href="/private-data">
                  <ContinueButtonBase>
                    <ContinueButtonText>
                      Define my digital self
                    </ContinueButtonText>
                  </ContinueButtonBase>
                </ContinueButton>
              </Rest>
            </PassphraseGeneration>
            <LogInPrompt>
              <LogInPromptText>Already have an account?</LogInPromptText>
              <LogInLink href="#">Log in</LogInLink>
            </LogInPrompt>
          </Content>
        </Main>
        <Footer>
          <Copyright>
            {`Copyright © Idntty 2023. All rights reserved. All other trademarks are the property of their respective owners. With any collaboration you accept the general `}
            <Terms href="https://idntty.io" target="_blank">
              terms
            </Terms>{' '}
            and conditions of iconwerk.
          </Copyright>
        </Footer>
      </Left>
      <Right></Right>
    </Page>
  );
}
