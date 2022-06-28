import React, {useEffect} from 'react';
import { Link } from 'react-router-dom';

import OnboardingImage from '../images/onboarding-image.jpg';
import OnboardingDecoration from '../images/auth-decoration.png';
import Logo from "../images/logo.png";
import {observer} from "mobx-react-lite";
import {passphrase} from "@liskhq/lisk-client";
import {registrationStore} from "../store/store";

const Onboarding1 = observer(()=>{
  let phrase = passphrase.Mnemonic.generateMnemonic()
  registrationStore.savePassPhrase(phrase)
  useEffect(()=>{

  },[])

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
              <div className="px-4 pt-12 pb-[142px]">
                <div className="max-w-md mx-auto w-full">
                  <div className="relative">
                    <div className="absolute left-0 top-1/2 -mt-px w-full h-0.5 bg-slate-200" aria-hidden="true"></div>
                    <ul className="relative flex justify-between w-full">
                      <li>
                        <Link className="flex items-center justify-center w-6 h-6 rounded-full text-xs font-semibold bg-indigo-500 text-white" to="/">1</Link>
                      </li>
                      <li>
                        <Link className="flex items-center justify-center w-6 h-6 rounded-full text-xs font-semibold bg-slate-100 text-slate-500" to="/onboarding-2">2</Link>
                      </li>
                      <li>
                        <Link className="flex items-center justify-center w-6 h-6 rounded-full text-xs font-semibold bg-slate-100 text-slate-500" to="/onboarding-3">3</Link>
                      </li>
                      <li>
                        <Link className="flex items-center justify-center w-6 h-6 rounded-full text-xs font-semibold bg-slate-100 text-slate-500" to="/onboarding-4">4</Link>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>

            <div className="px-4 py-8">
              <div className="max-w-md mx-auto">

                <h1 className="text-3xl text-slate-800 font-bold mb-12">Tell us about your company ✨</h1>
                {/* Form */}
                <form>
                  <div className="sm:flex space-y-3 sm:space-y-0 sm:space-x-4 mb-8">
                    <label className="flex-1 relative block cursor-pointer">
                      <input type="radio" name="radio-buttons" className="peer sr-only" defaultChecked />
                      <div className="h-full text-center bg-white px-4 py-6 rounded border border-slate-200 hover:border-slate-300 shadow-sm duration-150 ease-in-out">
                        <svg className="inline-flex w-10 h-10 shrink-0 fill-current mb-2" viewBox="0 0 40 40">
                          <circle className="text-indigo-100" cx="20" cy="20" r="20" />
                          <path className="text-indigo-500" d="m26.371 23.749-3.742-1.5a1 1 0 0 1-.629-.926v-.878A3.982 3.982 0 0 0 24 17v-1.828A4.087 4.087 0 0 0 20 11a4.087 4.087 0 0 0-4 4.172V17a3.982 3.982 0 0 0 2 3.445v.878a1 1 0 0 1-.629.928l-3.742 1.5a1 1 0 0 0-.629.926V27a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1v-2.323a1 1 0 0 0-.629-.928Z" />
                        </svg>
                        <div className="font-semibold text-slate-800 mb-1">Individual</div>
                        <div className="text-sm">Lorem ipsum is place text commonly used.</div>
                      </div>
                      <div className="absolute inset-0 border-2 border-transparent peer-checked:border-indigo-400 rounded pointer-events-none" aria-hidden="true"></div>
                    </label>
                    <label className="flex-1 relative block cursor-pointer">
                      <input type="radio" name="radio-buttons" className="peer sr-only" />
                      <div className="h-full text-center bg-white px-4 py-6 rounded border border-slate-200 hover:border-slate-300 shadow-sm duration-150 ease-in-out">
                        <svg className="inline-flex w-10 h-10 shrink-0 fill-current mb-2" viewBox="0 0 40 40">
                          <circle className="text-indigo-100" cx="20" cy="20" r="20" />
                          <path className="text-indigo-500" d="m26.371 23.749-3.742-1.5a1 1 0 0 1-.629-.926v-.878A3.982 3.982 0 0 0 24 17v-1.828A4.087 4.087 0 0 0 20 11a4.087 4.087 0 0 0-4 4.172V17a3.982 3.982 0 0 0 2 3.445v.878a1 1 0 0 1-.629.928l-3.742 1.5a1 1 0 0 0-.629.926V27a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1v-2.323a1 1 0 0 0-.629-.928Z" />
                          <circle className="text-indigo-100" cx="20" cy="20" r="20" />
                          <path className="text-indigo-300" d="m30.377 22.749-3.709-1.5a1 1 0 0 1-.623-.926v-.878A3.989 3.989 0 0 0 28.027 16v-1.828c.047-2.257-1.728-4.124-3.964-4.172-2.236.048-4.011 1.915-3.964 4.172V16a3.989 3.989 0 0 0 1.982 3.445v.878a1 1 0 0 1-.623.928c-.906.266-1.626.557-2.159.872-.533.315-1.3 1.272-2.299 2.872 1.131.453 6.075-.546 6.072.682V28a2.99 2.99 0 0 1-.182 1h7.119A.996.996 0 0 0 31 28v-4.323a1 1 0 0 0-.623-.928Z" />
                          <path className="text-indigo-500" d="m22.371 24.749-3.742-1.5a1 1 0 0 1-.629-.926v-.878A3.982 3.982 0 0 0 20 18v-1.828A4.087 4.087 0 0 0 16 12a4.087 4.087 0 0 0-4 4.172V18a3.982 3.982 0 0 0 2 3.445v.878a1 1 0 0 1-.629.928l-3.742 1.5a1 1 0 0 0-.629.926V28a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1v-2.323a1 1 0 0 0-.629-.928Z" />
                        </svg>
                        <div className="font-semibold text-slate-800 mb-1">Organization</div>
                        <div className="text-sm">Lorem ipsum is place text commonly used.</div>
                      </div>
                      <div className="absolute inset-0 border-2 border-transparent peer-checked:border-indigo-400 rounded pointer-events-none" aria-hidden="true"></div>
                    </label>
                  </div>
                  <div className="flex items-center justify-between space-x-6 mb-8">
                    <div>
                      <div className="font-medium text-slate-800 text-sm mb-1">💸 Lorem ipsum is place text commonly?</div>
                      <div className="text-xs font-normal leading-6">Lorem ipsum is placeholder text commonly used in the graphic, print, and publishing industries for previewing layouts.</div>
                    </div>
                    <div className="flex items-center">
                      <div className="form-switch">
                        <input type="checkbox" id="switch" className="sr-only" defaultChecked />
                        <label className="bg-slate-400" htmlFor="switch">
                          <span className="bg-white shadow-sm" aria-hidden="true"></span>
                          <span className="sr-only">Switch label</span>
                        </label>
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center justify-between">
                    <button className="font-medium btn bg-indigo-500 hover:bg-indigo-600 text-white ml-auto">
                      <Link to="/onboarding-2">Next Step -&gt;</Link>
                    </button>
                  </div>
                </form>

              </div>
            </div>

          </div>

        </div>

        {/* Image */}
        <div className="hidden md:block absolute top-0 bottom-0 right-0 md:w-1/2" aria-hidden="true">
          <img className="object-cover object-center w-full h-full" src={OnboardingImage} width="760" height="1024" alt="Onboarding" />
          <img className="absolute top-1/4 left-0 transform -translate-x-1/2 ml-8 hidden lg:block" src={OnboardingDecoration} width="218" height="224" alt="Authentication decoration" />
        </div>

      </div>

    </main>
  );
})

export default Onboarding1;
