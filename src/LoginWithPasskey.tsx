import styled from 'styled-components';

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

const Right = styled.div`
  width: 960px;
  align-self: stretch;
  background-color: #f9fafb; // FIXME: temporary
`;

const Left = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
  flex: 1 0 0;
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
  align-items: flex-start;
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

const Actions = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 16px;
  align-self: stretch;
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
  border: 1px solid #7f56d9;
  background: #7f56d9;
  box-shadow: 0px 1px 2px 0px rgba(16, 24, 40, 0.05);
`;
const ShieldIcon = styled.img`
  width: 20px;
  height: 20px;
`;
const ContinueButtonText = styled.div`
  color: #fff;
  font-family: Inter;
  font-size: 16px;
  font-style: normal;
  font-weight: 600;
  line-height: 24px;
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

const SkipButton = styled.a`
  display: flex;
  align-items: flex-start;
  align-self: stretch;
  border-radius: 8px;
  text-decoration: none;
  cursor: pointer;
`;
const SkipButtonBase = styled.div`
  display: flex;
  padding: 10px 18px;
  justify-content: center;
  align-items: center;
  gap: 8px;
  flex: 1 0 0;
  border-radius: 8px;
  border: 1px solid #f9f5ff;
  background: #f9f5ff;
  box-shadow: 0px 1px 2px 0px rgba(16, 24, 40, 0.05);
`;
const CopyIcon = styled.img`
  width: 20px;
  height: 20px;
`;
const SkipButtonText = styled.div`
  color: #6941c6;
  font-family: Inter;
  font-size: 16px;
  font-style: normal;
  font-weight: 600;
  line-height: 24px;
`;

export default function LoginWithPasskey() {
  return (
    <Page>
      <Left>
        <Header>
          <LogoIcon alt="" src="/logo.svg" />
        </Header>
        <Main>
          <Content>
            <MainText>
              <Title>Access Your Digital ID</Title>
              <MainDescription>
                Sign in effortlessly to reclaim control of your digital identity
                with private key, encrypted in local storage. Your secure space
                awaits.
              </MainDescription>
            </MainText>
            <Actions>
              <ContinueButton href="/identity-page">
                <ContinueButtonBase>
                  <ShieldIcon alt="" src="/shield.svg" />
                  <ContinueButtonText>Seamless Re-entry</ContinueButtonText>
                </ContinueButtonBase>
              </ContinueButton>
              <DividerWithText>
                <InlineDivider />
                <DividerText>or paste passphrase from buffer</DividerText>
                <InlineDivider />
              </DividerWithText>
              <SkipButton href="/identity-page">
                <SkipButtonBase>
                  <CopyIcon alt="" src="/copy-purple.svg" />
                  <SkipButtonText>Paste and login</SkipButtonText>
                </SkipButtonBase>
              </SkipButton>
            </Actions>
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
