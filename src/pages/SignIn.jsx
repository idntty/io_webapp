import React, {useState} from 'react';
import {observer} from "mobx-react-lite";
import { Link } from 'react-router-dom';
import {generateSvgAvatar} from "../images/GenerateOnboardingSvg/GenerateSvg";
import Logo from "../images/logo.png";
import {store} from "../store/store";

const SignIn = observer(()=>{

  const[passPhrase, setPassPhrase] = useState('- - - - - - - - - - - -');
  const[addedPassPhrase, setAddedPassPhrase] = useState(false);

  function savePassPhrase (copiedPhrase) {
    if (copiedPhrase.split(' ').length === 12) {
      store.savePastPassPhrase(copiedPhrase.trim());
      setPassPhrase(store.passPhrase);
      setAddedPassPhrase(true);
    }
  }

  function convertPassPhraseToArray() {
    return passPhrase.split(' ').map((item, index) => ({str:item, id:index}));
  }

  function pastePassPhrase() {
    navigator.clipboard.readText().then(res => savePassPhrase(res));
  }

  return (
    <main className="bg-white">

      <div className="relative flex">

        {/* Content */}
        <div className="w-full md:w-1/2">

          <div className="min-h-screen h-full flex flex-col after:flex-1">

            <div className="flex-1">

              {/* Header */}
              <div className="flex items-center justify-between h-16 px-4 sm:px-6 lg:px-8">
                {/* Logo */}
                <Link className="block" to="/">
                  <img alt='logo' src={Logo} width="89" height="32"/>
                </Link>
                <div className="text-sm">
                  Have not an account? <Link className="font-medium text-indigo-500 hover:text-indigo-600" to="/">Sign Up</Link>
                </div>
              </div>
            </div>

            <div className="px-4 mt-20 py-8">
              <div className="max-w-fit mx-auto flex flex-col gap-y-36">

                <div>
                  <h1 className="text-3xl text-slate-800 font-bold mb-12">Company information ✨</h1>
                  {/* htmlForm */}
                  <div className="grid grid-cols-4 gap-y-2.5 gap-[18px] mb-14">
                    {convertPassPhraseToArray().map(tag => (
                      <button key={tag.id} className="min-w-[93px] min-h-[26px] bg-slate-100 text-slate-500 cursor-pointer hover:bg-blue-100 hover:text-blue-600 rounded-full text-center px-2.5">
                        <span className="text-sm font-medium">{tag.str}</span>
                      </button>
                    ))}
                  </div>
                  <div className="flex pl-7 gap-x-5">
                    <button onClick={pastePassPhrase} className="btn pl-9 pr-16 border-slate-200 hover:border-slate-300 text-slate-600">
                      <svg className="w-4 h-4 fill-current text-slate-400 shrink-0 mb-0.5" viewBox="0 0 16 16">
                        <path
                            d="M11.7.3c-.4-.4-1-.4-1.4 0l-10 10c-.2.2-.3.4-.3.7v4c0 .6.4 1 1 1h4c.3 0 .5-.1.7-.3l10-10c.4-.4.4-1 0-1.4l-4-4zM4.6 14H2v-2.6l6-6L10.6 8l-6 6zM12 6.6L9.4 4 11 2.4 13.6 5 12 6.6z"></path>
                      </svg>
                      <span className="ml-2">Paste</span>
                    </button>
                  </div>
                </div>
                <div className="flex items-center justify-between">
                  <button className="btn bg-indigo-500 hover:bg-indigo-600 text-white ml-auto">
                    <Link to={addedPassPhrase && "/digitalId/profile-id"}>Go To Profile -&gt;</Link>
                  </button>
                </div>

              </div>
            </div>

          </div>

        </div>

        {/* Image */}
        <div className="flex flex-col items-center h-full w-full hidden md:block absolute top-0 bottom-0 right-0 md:w-1/2" aria-hidden="true">
          <div className="flex mt-40 flex-col items-center gap-2.5">
            <div className={`${addedPassPhrase || 'opacity-0'} w-[493px] h-[493px]`}>
              <img className="object-cover object-center" alt="" src={generateSvgAvatar(store.pubKey)}/>
            </div>
            <span className="text-sm">Your Digital ID</span>
          </div>
        </div>

      </div>

    </main>
  );
});

export default SignIn;
