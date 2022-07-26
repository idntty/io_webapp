import React, {useState} from 'react';
import { Link } from 'react-router-dom';
import { observer } from "mobx-react-lite";
import { registrationStore } from "../store/store";
import OnboardingImage from '../images/onboarding-image.jpg';
import OnboardingDecoration from '../images/auth-decoration.png';
import Logo from "../images/logo.png";

const Onboarding2 = observer(() => {
  const [dataRegistration, setDataRegistration] = useState(
      {
        firstname: '',
        secondname: '',
        gender: '',
        birthdate: '',
      }
  );
  const [fillingForm, setFillingForm] = useState(false);

  const saveValueChange = (event) => {
    const newValue=event.target.value;
    setDataRegistration({
      ...dataRegistration,
      [event.target.id]: newValue,
    })
  };

  const checkFillingForm = () => {
    if (!Object.keys(dataRegistration).find(item => !dataRegistration[item])) {
      setFillingForm(true);
    }
  };

  const saveStoreRegistration = () => {
    if (fillingForm) {
      registrationStore.saveDataRegistration(Object.keys(dataRegistration).map(item => {
        return{
          key: `${item}`,
          value: dataRegistration[item],
        }
      }))
    }
  };

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
                  Have an account? <Link className="font-medium text-indigo-500 hover:text-indigo-600" to="/signIn">Sign In</Link>
                </div>
              </div>

              {/* Progress bar */}
              <div className="px-4 pt-12 pb-[59px]">
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
              <div className="max-w-[344px] mx-auto">
                <h1 className="text-3xl text-slate-800 font-bold mb-6">Create your Account ✨</h1>
                {/* Form */}
                <div>
                  <div className="space-y-4 mb-8">
                    <div>
                      <label className="block text-sm font-medium mb-1" htmlFor="first_name">First name <span className="text-rose-500">*</span></label>
                      <input onBlur={checkFillingForm} id="firstname" onChange={(event)=>saveValueChange(event)} className="form-input w-full" type="text" />
                    </div>
                    <div>
                      <label className="block text-sm font-medium mb-1" htmlFor="second_name">Last name <span className="text-rose-500">*</span></label>
                      <input onBlur={checkFillingForm} id="secondname" onChange={(event)=>saveValueChange(event)} className="form-input w-full" type="text" />
                    </div>
                    <div>
                      <label className="block text-sm font-medium mb-1" htmlFor="gender">Gender <span className="text-rose-500">*</span></label>
                      <select onBlur={checkFillingForm} id="gender" onChange={(event)=>saveValueChange(event)} className="form-select w-full">
                        <option className="hidden"></option>
                        <option>male</option>
                        <option>female</option>
                      </select>
                    </div>
                    <div>
                      <label className="block text-sm font-medium mb-1" htmlFor="birthdate">Date of birth <span className="text-rose-500">*</span></label>
                      <input onBlur={checkFillingForm} id="birthdate" onChange={(event)=>saveValueChange(event)} className="form-input w-full" type="date" autoComplete="on" />
                    </div>
                  </div>
                  <div className="flex items-center justify-between mt-6">
                    <div className="mr-1">
                      <label className="flex items-center">
                        <input type="checkbox" className="form-checkbox" />
                        <span className="text-sm ml-2">Email me about product news.</span>
                      </label>
                    </div>
                    <button onClick={saveStoreRegistration} className="btn bg-indigo-500 hover:bg-indigo-600 text-white ml-3 whitespace-nowrap">
                      <Link id="signup" to={fillingForm && "/onboarding-3"} >Sign Up</Link>
                    </button>
                  </div>
                </div>
                {/* Footer */}
                <div className="pt-5 mt-6 border-t border-slate-200">
                  <div className="text-sm">
                    Have an account? <Link className="font-medium text-indigo-500 hover:text-indigo-600" to="/signIn">Sign In</Link>
                  </div>
                </div>
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
});

export default Onboarding2;
