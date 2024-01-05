import Header from './components/onboarding/Header';
import Footer from './components/onboarding/Footer';
import TextAndSupportingText from './components/onboarding/TextAndSupportingText';
import UserRegistrationForm from './components/UserRegistrationForm';

export default function PrivateData() {
  return (
    <div className="box-border flex h-screen w-screen flex-row overflow-hidden bg-white text-base">
      <div className="flex shrink-0 grow basis-0 flex-col items-center justify-between self-stretch">
        <Header />
        <main className="flex flex-col items-start self-stretch px-[32px]">
          <div className="flex w-[360px] flex-col items-center gap-[32px]">
            <TextAndSupportingText
              text="Add personal touch"
              supportingText="Infuse life into your digital identity by adding personal data. Your unique information completes the canvas, creating a true reflection of you in the digital world."
            />
            <UserRegistrationForm withErrors />
          </div>
        </main>
        <Footer />
      </div>
      <div className="w-[960px] self-stretch bg-gray-50"></div>
    </div>
  );
}
