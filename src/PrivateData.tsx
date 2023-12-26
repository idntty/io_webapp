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

const Form = styled.form`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 12px;
  align-self: stretch;
  border-radius: 12px;
`;

const InputField = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  align-self: stretch;
`;
const InputFieldBase = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 6px;
  align-self: stretch;
`;
const InputWithLabel = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 6px;
  align-self: stretch;
`;
const Input = styled.div`
  display: flex;
  padding: 10px 14px;
  align-items: center;
  gap: 8px;
  align-self: stretch;
  border-radius: 8px;
  border: 1px solid #d0d5dd;
  background: #fff;
  box-shadow: 0px 1px 2px 0px rgba(16, 24, 40, 0.05);
`;
const InputIconAndText = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
  flex: 1 0 0;
`;
const InputIcon = styled.img`
  width: 20px;
  height: 20px;
`;
const InputText = styled.input`
  color: #101828;
  font-family: Inter;
  font-size: 16px;
  font-style: normal;
  font-weight: 400;
  line-height: 24px;
  border: none;
  outline: none;
  &::placeholder {
    color: #667085;
  }
`;
const HelpIcon = styled.img`
  display: flex;
  width: 16px;
  height: 16px;
  justify-content: center;
  align-items: center;
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

export default function PrivateData() {
  const formFields = [
    {
      inputData: { type: 'text', label: 'Full Name', placeholder: 'Full Name' },
      icon: 'user',
    },
    {
      inputData: {
        type: 'text',
        label: 'Citezenship',
        placeholder: 'Citezenship',
      },
      icon: 'flag',
    },
    {
      inputData: {
        type: 'text',
        label: 'Phone Number',
        placeholder: '+1 123 474 87 67',
      },
      icon: 'phone',
    },
    {
      inputData: {
        type: 'text',
        label: 'Email',
        placeholder: 'olivia@untitledui.com',
      },
      icon: 'mail',
    },
    {
      inputData: {
        type: 'text',
        label: 'Place of Birth',
        placeholder: 'Place of Birth',
      },
      icon: 'home',
    },
    {
      inputData: {
        type: 'text',
        label: 'Current location',
        placeholder: 'Current location',
      },
      icon: 'map-pin',
    },
    {
      inputData: {
        type: 'text',
        label: 'National Identification Number',
        placeholder: 'National Identification Number',
      },
      icon: 'alert-circle',
    },
    {
      inputData: {
        type: 'text',
        label: 'Passport Number',
        placeholder: 'Passport Number',
      },
      icon: 'book-open',
    },
  ];

  return (
    <Page>
      <Left>
        <Header>
          <LogoIcon alt="" src="/logo.svg" />
        </Header>
        <Main>
          <Content>
            <MainText>
              <Title>Add personal touch</Title>
              <MainDescription>
                Infuse life into your digital identity by adding personal data.
                Your unique information completes the canvas, creating a true
                reflection of you in the digital world.
              </MainDescription>
            </MainText>
            <Form>
              {formFields.map((formField, index) => (
                <InputField key={index}>
                  <InputFieldBase>
                    <InputWithLabel>
                      <Input>
                        <InputIconAndText>
                          <InputIcon
                            src={`/${formField.icon}.svg`}
                            alt={formField.inputData.label}
                          />
                          <InputText {...formField.inputData} />
                        </InputIconAndText>
                        <HelpIcon src="/help-circle.svg" alt="Help Icon" />
                      </Input>
                    </InputWithLabel>
                  </InputFieldBase>
                </InputField>
              ))}
            </Form>
            <Actions>
              <ContinueButton href="/create-account">
                <ContinueButtonBase>
                  <ContinueButtonText>Secure my data</ContinueButtonText>
                </ContinueButtonBase>
              </ContinueButton>
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
