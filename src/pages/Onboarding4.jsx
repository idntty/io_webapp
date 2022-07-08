import React, {useEffect, useState} from 'react';
import { Link } from 'react-router-dom';
import {generateSvgAvatar} from "../images/GenerateOnboardingSvg/GenerateSvg";
import Logo from "../images/logo.png";
import {observer} from "mobx-react-lite";
import { registrationStore } from "../store/store";

const Onboarding4 = observer(()=>{

  const [checkBoxesSelected, setCheckBoxesSelected] = useState(false)

  function createAccount () {
    let checkBoxes=[...document.getElementsByClassName("form-checkbox")]
    if(checkBoxes.find(item=>item.checked===false)) {
      return
    } else {
      registrationStore.pushAccountData()
      setCheckBoxesSelected(true)
    }
  }

  useEffect(()=>{
    if(checkBoxesSelected===true) {
      document.getElementById("link-dashboard").click()
    }
  },[checkBoxesSelected])

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
                <Link className="block" to="/dashboard">
                  <img alt='logo' src={Logo} width="89" height="32"/>
                </Link>
                <div className="text-sm">
                  Have an account? <Link className="font-medium text-indigo-500 hover:text-indigo-600" to="/signin">Sign In</Link>
                </div>
              </div>

              {/* Progress bar */}
              <div className="px-4 pt-12 pb-[85px]">
                <div className="max-w-md mx-auto w-full">
                  <div className="relative">
                    <div className="absolute left-0 top-1/2 -mt-px w-full h-0.5 bg-slate-200" aria-hidden="true"></div>
                    <ul className="relative flex justify-between w-full">
                      <li>
                        <Link className="flex items-center justify-center w-6 h-6 rounded-full text-xs font-semibold bg-indigo-500 text-white" to="/">1</Link>
                      </li>
                      <li>
                        <Link className="flex items-center justify-center w-6 h-6 rounded-full text-xs font-semibold bg-indigo-500 text-white" to="/onboarding-2">2</Link>
                      </li>
                      <li>
                        <Link className="flex items-center justify-center w-6 h-6 rounded-full text-xs font-semibold bg-indigo-500 text-white" to="/onboarding-3">3</Link>
                      </li>
                      <li>
                        <Link className="flex items-center justify-center w-6 h-6 rounded-full text-xs font-semibold bg-indigo-500 text-white" to="/onboarding-4">4</Link>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>

            <div className="px-4 mt-40 py-8">
              <div className=" flex flex-col items-center gap-20 max-w-md mx-auto">

                <div className="text-center">
                  <svg className="inline-flex w-16 h-16 fill-current mb-6" viewBox="0 0 64 64">
                    <circle className="text-emerald-100" cx="32" cy="32" r="32" />
                    <path className="text-emerald-500" d="m28.5 41-8-8 3-3 5 5 12-12 3 3z" />
                  </svg>
                  <h1 className="text-3xl text-slate-800 font-bold mb-8">{registrationStore.accountData.find(item=>item.key="first_name").key ? `Nice to meet you, ${registrationStore.accountData.find(item=>item.key="first_name").value} 🙌` : 'Please, go back step 2'}</h1>
                  <button onClick={()=>createAccount()} className="btn px-6 bg-indigo-500 hover:bg-indigo-600 text-white">
                    <Link id="link-dashboard" to={checkBoxesSelected && "/dashboard"}>Go To Profile -&gt;</Link>
                  </button>
                </div>

                <div className="flex items-center justify-between">
                  <div className="mr-1">
                    <label className="flex items-center">
                      <input type="checkbox" className="form-checkbox" />
                      <span className="text-sm ml-2">I understand that Idntty cannot recover pass phrase</span>
                    </label>
                    <label className="flex items-center">
                      <input type="checkbox" className="form-checkbox" />
                      <div className="text-sm ml-2">
                        I <Link className="text-indigo-500 hover:text-indigo-600 underline" to="/">store my pharse</Link> very carefuly
                      </div>
                    </label>
                  </div>
                </div>

              </div>
            </div>

          </div>

        </div>

        {/* Image */}
        <div className="flex flex-col items-center h-full w-full hidden md:block absolute top-0 bottom-0 right-0 md:w-1/2" aria-hidden="true">
          <div className="flex mt-40 flex-col items-center gap-2.5">
            <img className="object-cover object-center" src={generateSvgAvatar(registrationStore.pubKey)} width="493px" height="493px" alt="Onboarding" />
            <span className="text-sm">Your generated Digital ID</span>
          </div>
        </div>

      </div>

    </main>
  );
});

export default Onboarding4;
