import React from 'react';
import { Link } from 'react-router-dom';
import {generateSvgAvatar} from "../images/GenerateOnboardingSvg/GenerateSvg";


function Onboarding3() {
  const arrayBadges = ['judge', 'jelly', 'wasp', 'true', 'clog', 'forward', 'talent', 'ozone', 'belive', 'fresh', 'bulk', 'hobby']
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
                  <svg width="32" height="32" viewBox="0 0 32 32">
                    <defs>
                      <linearGradient x1="28.538%" y1="20.229%" x2="100%" y2="108.156%" id="logo-a">
                        <stop stopColor="#A5B4FC" stopOpacity="0" offset="0%" />
                        <stop stopColor="#A5B4FC" offset="100%" />
                      </linearGradient>
                      <linearGradient x1="88.638%" y1="29.267%" x2="22.42%" y2="100%" id="logo-b">
                        <stop stopColor="#38BDF8" stopOpacity="0" offset="0%" />
                        <stop stopColor="#38BDF8" offset="100%" />
                      </linearGradient>
                    </defs>
                    <rect fill="#6366F1" width="32" height="32" rx="16" />
                    <path d="M18.277.16C26.035 1.267 32 7.938 32 16c0 8.837-7.163 16-16 16a15.937 15.937 0 01-10.426-3.863L18.277.161z" fill="#4F46E5" />
                    <path d="M7.404 2.503l18.339 26.19A15.93 15.93 0 0116 32C7.163 32 0 24.837 0 16 0 10.327 2.952 5.344 7.404 2.503z" fill="url(#logo-a)" />
                    <path d="M2.223 24.14L29.777 7.86A15.926 15.926 0 0132 16c0 8.837-7.163 16-16 16-5.864 0-10.991-3.154-13.777-7.86z" fill="url(#logo-b)" />
                  </svg>
                </Link>
                <div className="text-sm">
                  Have an account? <Link className="font-medium text-indigo-500 hover:text-indigo-600" to="/signin">Sign In</Link>
                </div>
              </div>

              {/* Progress bar */}
              <div className="px-4 pt-12 pb-8">
                <div className="max-w-md mx-auto w-full">
                  <div className="relative">
                    <div className="absolute left-0 top-1/2 -mt-px w-full h-0.5 bg-slate-200" aria-hidden="true"></div>
                    <ul className="relative flex justify-between w-full">
                      <li>
                        <Link className="flex items-center justify-center w-6 h-6 rounded-full text-xs font-semibold bg-indigo-500 text-white" to="/onboarding-1">1</Link>
                      </li>
                      <li>
                        <Link className="flex items-center justify-center w-6 h-6 rounded-full text-xs font-semibold bg-indigo-500 text-white" to="/onboarding-2">2</Link>
                      </li>
                      <li>
                        <Link className="flex items-center justify-center w-6 h-6 rounded-full text-xs font-semibold bg-indigo-500 text-white" to="/onboarding-3">3</Link>
                      </li>
                      <li>
                        <Link className="flex items-center justify-center w-6 h-6 rounded-full text-xs font-semibold bg-slate-100 text-slate-500" to="/onboarding-4">4</Link>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>

            <div className="px-4 mt-20 py-8">
              <div className="max-w-fit mx-auto flex flex-col gap-y-36">

                <div className="gap-0.5">
                  <h1 className="text-3xl text-slate-800 font-bold mb-12">Company information ✨</h1>
                  {/* htmlForm */}
                  <div className="grid grid-cols-4 gap-2.5 mb-14">
                    {arrayBadges.map(tag => (
                      <button className="min-w-93px w-24 min-h-26px h-26px bg-slate-100 text-slate-500 cursor-pointer hover:bg-blue-100 hover:text-blue-600 rounded-full text-center px-2.5">
                        <span className="text-sm font-medium">{tag}</span>
                      </button>
                    ))}
                  </div>
                  <div className="flex justify-center gap-x-5">
                    <button className="btn pl-9 pr-16 border-slate-200 hover:border-slate-300 text-slate-600">
                      <svg className="w-4 h-4 fill-current text-slate-400 shrink-0 mb-0.5" viewBox="0 0 16 16">
                        <path
                            d="M11.7.3c-.4-.4-1-.4-1.4 0l-10 10c-.2.2-.3.4-.3.7v4c0 .6.4 1 1 1h4c.3 0 .5-.1.7-.3l10-10c.4-.4.4-1 0-1.4l-4-4zM4.6 14H2v-2.6l6-6L10.6 8l-6 6zM12 6.6L9.4 4 11 2.4 13.6 5 12 6.6z"></path>
                      </svg>
                      <span className="ml-2">Paste</span>
                    </button>
                    <button className="btn pr-11 pl-7 border-slate-200 hover:border-slate-300 text-rose-500">
                      <svg className="mb-0.5" width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M14.5744 5.66943L13.1504 7.09343C13.4284 7.44043 13.6564 7.75743 13.8194 8.00043C13.0594 9.13043 10.9694 11.8204 8.25836 11.9854L6.44336 13.8004C6.93936 13.9244 7.45736 14.0004 8.00036 14.0004C12.7074 14.0004 15.7444 8.71643 15.8714 8.49243C16.0424 8.18843 16.0434 7.81643 15.8724 7.51243C15.8254 7.42743 15.3724 6.63143 14.5744 5.66943Z" fill="#F43F5E"/>
                        <path fill-rule="evenodd" clip-rule="evenodd" d="M1.00038 16.0002C0.744375 16.0002 0.488375 15.9022 0.293375 15.7072C-0.0976249 15.3162 -0.0976249 14.6842 0.292375 14.2942L2.82138 11.7653C1.17238 10.2913 0.198375 8.61425 0.128375 8.48925C-0.0416249 8.18625 -0.0426249 7.81725 0.126375 7.51425C0.251375 7.28925 3.24537 2.00025 8.00037 2.00025C9.33138 2.00025 10.5154 2.43125 11.5484 3.03825L14.2934 0.29325C14.6844 -0.09775 15.3164 -0.09775 15.7074 0.29325C16.0984 0.68425 16.0984 1.31625 15.7074 1.70725L1.70738 15.7072C1.51238 15.9022 1.25638 16.0002 1.00038 16.0002ZM8.00037 4.00025C5.14637 4.00025 2.95837 6.83525 2.18138 7.99925C2.55938 8.56225 3.28538 9.51025 4.24038 10.3463L6.07438 8.51225C6.02938 8.34825 6.00037 8.17825 6.00037 8.00025C6.00037 6.89525 6.89537 6.00025 8.00037 6.00025C8.17838 6.00025 8.34838 6.02925 8.51237 6.07425L10.0784 4.50825C9.43738 4.20125 8.74237 4.00025 8.00037 4.00025Z" fill="#F43F5E"/>
                      </svg>
                      <span className="ml-2">Generate</span>
                    </button>
                  </div>
                </div>
                <div className="flex items-center justify-between">
                  <Link className="text-sm underline hover:no-underline" to="/onboarding-2">&lt;- Back</Link>
                  <Link className="btn bg-indigo-500 hover:bg-indigo-600 text-white ml-auto" to="/onboarding-4">Next Step -&gt;</Link>
                </div>

              </div>
            </div>

          </div>

        </div>

        {/* Image */}
        <div className="flex flex-col items-center h-full w-full hidden md:block absolute top-0 bottom-0 right-0 md:w-1/2" aria-hidden="true">
          <div className="flex mt-40 flex-col items-center gap-2.5">
            <img className="object-cover object-center" src={generateSvgAvatar()} width="493px" height="493px" alt="Onboarding" />
            <span className="text-sm">Your generated Digital ID</span>
          </div>
        </div>

      </div>

    </main>
  );
}

export default Onboarding3;
