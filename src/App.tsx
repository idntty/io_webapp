import styled from 'styled-components';

const Page = styled.div`
  background-color: #fff;
  height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  flex: 1 0 0;
  align-items: center;
  align-self: stretch;
  color: #101828;
  font-family: Inter;
  overflow: hidden;
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

const Main = styled.main`
  align-self: stretch;
  background-color: #fff;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
`;

const Content = styled.div`
  align-self: stretch;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-start;
  padding: 0px 32px;
  gap: 32px;
`;

const MainText = styled.div`
  width: 360px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  text-align: center;
  gap: 12px;
`;
const Title = styled.div`
  line-height: 38px;
  font-weight: 600;
  font-size: 30px;
`;
const MainDescription = styled.div`
  position: relative;
  font-size: 16px;
  line-height: 24px;
  font-weight: 400;
  color: #667085;
  display: inline-block;
  width: 355px;
`;

const IdentitySelection = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-start;
  gap: 24px;
`;

const RadioGroup = styled.div`
  font-size: 16px;
  display: flex;
  flex-direction: row;
  align-items: flex-start;
  justify-content: center;
  gap: 24px;
`;
const PersonalAccount = styled.div`
  border-radius: 8px;
  background-color: #f9f5ff;
  border: 1px solid #d6bbfb;
  box-sizing: border-box;
  width: 343px;
  flex-shrink: 0;
  display: flex;
  padding: 16px;
  gap: 4px;
  color: #53389e;
`;
const AuthorityAccount = styled.div`
  border-radius: 8px;
  background-color: #fff;
  border: 1px solid #d6bbfb;
  box-sizing: border-box;
  width: 343px;
  flex-shrink: 0;
  display: flex;
  flex-direction: row;
  align-items: flex-start;
  justify-content: flex-start;
  padding: 16px;
  gap: 4px;
  color: #344054;
`;

const LogInPrompt = styled.div`
  display: flex;
  gap: 4px;
  font-size: 14px;
  line-height: 20px;
`;
const LogInPromptText = styled.div`
  color: #667085;
`;
const LogInLink = styled.a`
  font-weight: 600;
  color: #6941c6;
  text-decoration: none;
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

const Icon = styled.img`
  width: 20px;
  height: 20px;
  flex-shrink: 0;
  box-sizing: border-box;
`;
const IconBase = styled.div`
  position: absolute;
  top: -6px;
  display: flex;
  padding: 10px;
  box-sizing: border-box;
  flex-shrink: 0;
  border-radius: 28px;
  border: 6px solid #f9f5ff;
  background: #f4ebff;
  align-items: center;
  justify-content: center;
  width: 45px;
  height: 45px;
`;
const IconWrapper = styled.div`
  position: relative;
  width: 32px;
  height: 32px;
  display: flex;
  align-items: center;
  justify-content: center;
  box-sizing: border-box;
`;
const IdentityTitle = styled.div`
  align-self: stretch;
  position: relative;
  line-height: 24px;
  font-weight: 500;
`;
const PersonalDescription = styled.div`
  align-self: stretch;
  position: relative;
  line-height: 24px;
  color: #7f56d9;
`;
const IdentityText = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: flex-start;
  gap: 2px;
`;
const AccountContent = styled.div`
  flex: 1 0 0;
  display: flex;
  gap: 16px;
`;
const AuthorityDescription = styled.div`
  align-self: stretch;
  position: relative;
  line-height: 24px;
  color: #667085;
`;
const Check = styled.img`
  width: 14px;
  height: 14px;
  flex-shrink: 0;
`;
const CheckboxFilled = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  position: relative;
  border-radius: 10px;
  background-color: #7f56d9;
  border: 1px solid #7f56d9;
  box-sizing: border-box;
  width: 20px;
  height: 20px;
  overflow: hidden;
  flex-shrink: 0;
`;
const CheckboxUnfilled = styled.div`
  position: relative;
  border-radius: 10px;
  background-color: #f9f5ff;
  border: 1px solid #7f56d9;
  box-sizing: border-box;
  width: 20px;
  height: 20px;
  overflow: hidden;
  flex-shrink: 0;
`;

const ButtonText = styled.div`
  position: relative;
  line-height: 24px;
  font-weight: 600;
`;
const ButtonBase = styled.div`
  flex: 1;
  border-radius: 8px;
  background-color: #7f56d9;
  box-shadow: 0px 1px 2px rgba(16, 24, 40, 0.05);
  border: 1px solid #7f56d9;
  overflow: hidden;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  padding: 10px 18px;
`;
const Button = styled.div`
  align-self: stretch;
  border-radius: 8px;
  display: flex;
  flex-direction: row;
  align-items: flex-start;
  justify-content: flex-start;
`;
const ContinueButton = styled.a`
  width: 360px;
  align-self: center;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: flex-start;
  color: #fff;
  cursor: pointer;
  text-decoration: none;
`;

export default function App() {
  return (
    <Page>
      <Header>
        <LogoIcon alt="" src="/logo.svg" />
      </Header>
      <Main>
        <Content>
          <MainText>
            <Title>Choose your identity</Title>
            <MainDescription>
              Personal for individuals or Authority for organizations. Tailor
              your digital identity to suit your needs.
            </MainDescription>
          </MainText>
          <IdentitySelection>
            <RadioGroup>
              <PersonalAccount>
                <AccountContent>
                  <IconWrapper>
                    <IconBase>
                      <Icon src="user.svg" alt="User Icon" />
                    </IconBase>
                  </IconWrapper>
                  <IdentityText>
                    <IdentityTitle>Personal</IdentityTitle>
                    <PersonalDescription>
                      Personal data is private and securely encrypted. It is
                      only accessible with your consent.
                    </PersonalDescription>
                  </IdentityText>
                </AccountContent>
                <CheckboxFilled>
                  <Check src="check.svg" alt="Check Icon" />
                </CheckboxFilled>
              </PersonalAccount>
              <AuthorityAccount>
                <AccountContent>
                  <IconWrapper>
                    <IconBase>
                      <Icon src="briefcase.svg" alt="User Icon" />
                    </IconBase>
                  </IconWrapper>
                  <IdentityText>
                    <IdentityTitle>Authority</IdentityTitle>
                    <AuthorityDescription>{`All data is public and accessible to everyone. Used by companies & communities.`}</AuthorityDescription>
                  </IdentityText>
                </AccountContent>
                <CheckboxUnfilled />
              </AuthorityAccount>
            </RadioGroup>
            <ContinueButton href="/passphrase">
              <Button>
                <ButtonBase>
                  <ButtonText>Continue</ButtonText>
                </ButtonBase>
              </Button>
            </ContinueButton>
          </IdentitySelection>
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
    </Page>
  );
}
