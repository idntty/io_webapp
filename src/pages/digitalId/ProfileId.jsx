import React, { useState } from 'react';
import { userDataStore } from '../../store/userDataStore';
import { registrationStore } from "../../store/store";
import Sidebar from '../../partials/Sidebar';
import { observer } from 'mobx-react-lite';
import Header from '../../partials/Header';
import ProfileTable from '../../partials/digitalId/ProfileTable';
import Image from '../../images/transactions-image-04.svg';

const Profile = observer (() => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [buttonPanelOpen, setButtonPanelOpen] = useState(true);
  const [removePanelOpen, setRemovePanelOpen] = useState(false);
  const [changePanelOpen, setChangePanelOpen] = useState(false);
  const [toggle, setToggle] = useState(true);
  const [addPanelOpen, setAddPanelOpen] = useState(false);
  const [updatePanelOpen, setUpdatePanelOpen] = useState(false);
  const [selectedItems, setSelectedItems] = useState([]);
  
  const defaultValues = {
    label: '',
    value: '',
    seed: Math.floor(Math.random() * 90000000000000000000) 
  };

  const initialPropertyValues = ['First name', 'Second name', 'Birthdate', 'Gender', 'National doctype', 'National doc id', 'National doc issue date', 'National doc expiry date'];
  const [propertyValues, setPropertyValues] = useState([]);
  const [updatedValues, setUpdatedValues] = useState([defaultValues]);
  const [addedValues, setAddedValues] = useState(defaultValues);

  const openHint = () => {
    if (!addedValues.label) {
      setPropertyValues(initialPropertyValues);
    }
  }

  const changeAddedValues = (value, field) => {
    setAddedValues((prevState) => (
      field !== 'seed' ? {
      ...prevState,
      [field]: value
    } : {
      ...prevState,
      [field]: +value,
    }))
  };

  const changeUpdatedValues = (value, field, key) => {
    setUpdatedValues((prevState) => 
      prevState.map((elem) => (
        (elem.key === key && field !== 'seed') ? {
          ...elem,
          [field]: value,
        } : 
        (elem.key === key) ? {
          ...elem,
          [field]: +value,
        } : elem
      ))
    )
  };

  const closeHint = (element) => {
    changeAddedValues(element, 'label');
    setPropertyValues([]);
  }

  const handleSelectedItems = (selectedItems) => {
    setSelectedItems([...selectedItems]);
    setUpdatedValues(userDataStore.decryptedData.filter(({ key }) => selectedItems.includes(key))
      .map(elem => (
        (!elem.seed) ? {
        ...elem,
        seed: Math.floor(Math.random() * 90000000000000000000)
      }: elem)));
    if (selectedItems.length > 0) {
      setButtonPanelOpen(false);
      setAddPanelOpen(false);
      setChangePanelOpen(true);
    }
    if (removePanelOpen === true || updatePanelOpen === true) {
      setChangePanelOpen(false);
    }
    if (selectedItems.length === 0) {
      setRemovePanelOpen(false);
      setUpdatePanelOpen(false);
      setButtonPanelOpen(true);
      setChangePanelOpen(false);
    }
  };

  const openAddPanel = () => {
    setAddPanelOpen(true);
    setButtonPanelOpen(false);
  }

  const sendAddedData = () => {
    if (!userDataStore.decryptedData.some((element) => element.label === addedValues.label) && (addedValues.seed.toString().length === 20)) {
      setAddPanelOpen(false);
      setButtonPanelOpen(true);
      setAddedValues(defaultValues);
      addDataParameters();
    }
  }

  const sendUpdatedData = () => {
    setUpdatePanelOpen(false);
    changeDataParameters();
    setChangePanelOpen(true);
  }

  const deleteDataParameters = () => {
    const changeData = userDataStore.decryptedData.filter(item=>!selectedItems.includes(item.key))
    registrationStore.pushAccountData(changeData);
  }

  const changeInitialArray = () => {
    let newArr = [];
    userDataStore.decryptedData.map(elem => {
      updatedValues.forEach(item => {
        if (elem.label === item.label) {
          newArr.push({
            ...elem,
            'value': item.value, 
            'seed': item.seed,
          })
        }
      })
      if (!newArr.find(element => element.label === elem.label)) {
        newArr.push(elem);
      }
    })
    return newArr;
  }

  const changeDataParameters = () => {
    const updatedData = changeInitialArray();
    registrationStore.pushAccountData(updatedData);
  }

  const addDataParameters = () => {
    addedValues.key = addedValues.label.toLowerCase().split(' ').join('_');
    registrationStore.pushAccountData(userDataStore.decryptedData.concat(addedValues));
  }

  const cancelAddPanel = () => {
    setAddedValues(defaultValues);
    setAddPanelOpen(false);
    setButtonPanelOpen(true);
  }

  const cancelUpdatePanel = () => {
    setUpdatePanelOpen(false);
    setChangePanelOpen(true);
  }

  const openRemovePanel = () => {
    setRemovePanelOpen(true);
    setChangePanelOpen(false);
  }

  const openUpdatePanel = () => {
    setUpdatePanelOpen(true);
    setChangePanelOpen(false);
  }

  const applyDataDeletion = () => {
    setRemovePanelOpen(false);
    setButtonPanelOpen(true);
    deleteDataParameters()
  }

  const handleInput = (text, field) => {
    changeAddedValues(text, field);
    setPropertyValues(initialPropertyValues);
    if (text) {
      let reg = new RegExp(`^${text}`, 'img');
      setPropertyValues((prevState) => prevState.filter((element) => element.match(reg)));
    }
  };

  return (
    <div className="flex h-screen overflow-hidden">
      {/* Sidebar */}
      <Sidebar sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />
      {/* Content area */}
      <div className="relative flex flex-col flex-1 overflow-y-auto overflow-x-hidden">
        {/*  Site header */}
        <Header sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />
        <main>
          <div className="pl-8 pr-[42px] py-8 w-full max-w-9xl mx-auto">
            <div className="mx-auto flex flex-col lg:flex-row lg:space-x-8">
              {/* Page header */}
              <div>
                <div>
                  <ul className="flex flex-wrap -m-1">
                    <li className="m-1">
                      <button className="inline-flex items-center justify-center text-sm font-medium leading-5 rounded-full px-3 py-1 border border-transparent shadow-sm bg-indigo-500 text-white duration-150 ease-in-out">
                        View All
                      </button>
                    </li>
                    <li className="m-1">
                      <button className="inline-flex items-center justify-center text-sm font-medium leading-5 rounded-full px-3 py-1 border border-slate-200 hover:border-slate-300 shadow-sm bg-white text-slate-500 duration-150 ease-in-out">
                        Validated
                      </button>
                    </li>
                    <li className="m-1">
                      <button className="inline-flex items-center justify-center text-sm font-medium leading-5 rounded-full px-3 py-1 border border-slate-200 hover:border-slate-300 shadow-sm bg-white text-slate-500 duration-150 ease-in-out">
                        Blockchained
                      </button>
                    </li>
                  </ul>
                </div>
                {/* Table */}
                <ProfileTable selectedItems={handleSelectedItems} userData={userDataStore.decryptedData}/>
              </div>
              {/* Left sidebar */}
              <div>
                {/* Button panel*/}
                <div className={`${!buttonPanelOpen && "hidden"} ml-2.5`}>
                  <div className="bg-white px-5 py-[43px] shadow-lg rounded-sm border border-slate-200 lg:w-72 xl:w-80">
                    <button
                      className="btn w-full bg-indigo-500 hover:bg-indigo-600 text-white"
                      onClick={openAddPanel}
                    >
                      <svg className="w-4 h-4 fill-current shrink-0" viewBox="0 0 16 16">
                        <path d="m2.457 8.516.969-.99 2.516 2.481 5.324-5.304.985.989-6.309 6.284z" />
                      </svg>
                      <span className="ml-1">Add new field</span>
                    </button>
                  </div>
                </div>
                <div className="ml-2.5">
                  {/* Add panel */}
                  <div className={`${!addPanelOpen && 'hidden'} bg-white p-5 shadow-lg rounded-sm border border-slate-200 lg:w-72 xl:w-80 mb-11`}>
                    <div className="flex flex-col gap-y-3">
                      <div>
                        <label className="block text-sm font-medium mb-1" htmlFor="mandatory">Property <span className="text-rose-500">*</span></label>
                        <input
                          autoComplete='off'
                          id="label"
                          className="form-input w-full"
                          type="text"
                          required
                          onInput={(e) => handleInput(e.target.value, 'label')}
                          value={addedValues.label}
                          onClick={openHint}
                        />
                        <div className={`flex flex-col gap-y-2 py-2 pl-2 border border-t-0 border-slate-200 rounded ${(propertyValues.length > 0) || 'hidden'}`}>
                          <ul>
                            {propertyValues.map((element, index) => (
                              <li key={index} onClick={() => closeHint(element)}>{element}</li>
                            ))}
                          </ul>
                        </div>
                      </div>
                      <div>
                        <label className="block text-sm font-medium mb-1" htmlFor="mandatory">Value <span className="text-rose-500">*</span></label>
                        <input
                          autoComplete='off'
                          id="value"
                          className="form-input w-full"
                          type="text"
                          required
                          onClick={() => setPropertyValues([])}
                          onChange={(e) => changeAddedValues(e.target.value, 'value')}
                          value={addedValues.value}
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium mb-1" htmlFor="mandatory">Seed <span className="text-rose-500">*</span></label>
                        <input
                          autoComplete='off'
                          id="seed"
                          className="form-input w-full"
                          type="number"
                          required
                          onClick={() => setPropertyValues([])}
                          onChange={(e) => changeAddedValues(e.target.value, 'seed')}
                          value={addedValues.seed}
                        />
                      </div>
                    </div>
                    <div className="flex flex-row justify-between pt-[16px] pb-[23px] items-center border-b border-slate-200">
                      <span className="block text-sm font-medium">Store data on blockchain</span>
                      <div className="flex items-center">
                        <div className="form-switch">
                          <input type="checkbox" id="blockcheined" className="sr-only" checked={toggle} onChange={() => setToggle(!toggle)} />
                            <label className="bg-slate-400" htmlFor="switch-1">
                            <span className="bg-white shadow-sm" aria-hidden="true"></span>
                          </label>
                        </div>
                      </div>
                    </div>
                    {/* Buttons */}
                    <div className="flex flex-row justify-end gap-x-2 pt-[18px] pb-[14px] items-end">
                      <button
                        className="btn-sm bg-white border-slate-200 hover:bg-slate-50 text-slate-600"
                        onClick={cancelAddPanel}
                      >
                        Cansel
                      </button>
                      <button
                        className="btn-sm bg-indigo-500 hover:bg-indigo-600 text-white"
                        onClick={sendAddedData}
                      >
                        Send
                      </button>
                    </div>
                  </div>
                  {/* Update panel */}
                  <div className={`${!updatePanelOpen && 'hidden'} bg-white p-5 shadow-lg rounded-sm border border-slate-200 lg:w-72 xl:w-80 mb-11`}>
                    {updatedValues.map((item, index) => ( 
                      <div key={index} className="flex flex-col gap-y-3">
                        <div>
                          <label className="block text-sm font-medium mb-1" htmlFor="mandatory">Property <span className="text-rose-500">*</span></label>
                          <input
                            id={`${item.key}:label`}
                            className="form-input w-full"
                            type="text"
                            required
                            onChange={(e) => changeUpdatedValues(e.target.value, 'label', item.key)}
                            value={item.label}
                            disabled='disabled'
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-medium mb-1" htmlFor="mandatory">Value <span className="text-rose-500">*</span></label>
                          <input
                            autoComplete='off'
                            id={`${item.key}:value`}
                            className="form-input w-full"
                            type="text"
                            required
                            onChange={(e) => changeUpdatedValues(e.target.value, 'value', item.key)}
                            value={item.value}
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-medium mb-1" htmlFor="mandatory">Seed <span className="text-rose-500">*</span></label>
                          <input
                            autoComplete='off'
                            id={`${item.key}:seed`}
                            className="form-input w-full"
                            type="number"
                            required
                            onChange={(e) => changeUpdatedValues(e.target.value, 'seed', item.key)}
                            value={item.seed}
                          />
                        </div>
                        {(updatedValues[index+1]) ? (
                        <div className="mt-2 mb-3.5 items-center border-b border-slate-200"></div>
                        ) : null}
                      </div>
                    ))}
                    <div className="flex flex-row justify-between pt-[16px] pb-[23px] items-center border-b border-slate-200">
                      <span className="block text-sm font-medium">Store data on blockchain</span>
                      <div className="flex items-center">
                        <div className="form-switch">
                          <input type="checkbox" id="blockcheined" className="sr-only" checked={toggle} onChange={() => setToggle(!toggle)} />
                            <label className="bg-slate-400" htmlFor="switch-1">
                            <span className="bg-white shadow-sm" aria-hidden="true"></span>
                          </label>
                        </div>
                      </div>
                    </div>
                    {/* Buttons */}
                    <div className="flex flex-row justify-end gap-x-2 pt-[18px] pb-[14px] items-end">
                      <button
                        className="btn-sm bg-white border-slate-200 hover:bg-slate-50 text-slate-600"
                        onClick={cancelUpdatePanel}
                      >
                        Cansel
                      </button>
                      <button
                        className="btn-sm bg-indigo-500 hover:bg-indigo-600 text-white"
                        onClick={sendUpdatedData}
                      >
                        Send
                      </button>
                    </div>
                  </div>
                  {/* Remove panel */}
                  <div className={`${!removePanelOpen && 'hidden'} bg-white px-5 pt-4 pb-[190px] shadow-lg rounded-sm border border-slate-200 lg:w-72 xl:w-80 mb-12`}>
                    <h2 className="grow text-base font-semibold text-slate-800 truncate mb-2">Summary</h2>
                    <div className="flex flex-col">
                      {userDataStore.decryptedData.filter(({ key }) => selectedItems.includes(key)).map(item => (
                        <span key={item.label} className="text-sm font-normal text-slate-600 py-3 border-b border-slate-200">{item.label}</span>
                      ))}
                    </div>
                    <div className="flex flex-row justify-between pt-[16px] pb-7 items-center">
                      <span className="block text-sm font-medium">On blockchain too</span>
                      <div className="flex items-center">
                        <div className="form-switch">
                          <input type="checkbox" id="switch-1" className="sr-only" checked={toggle} onChange={() => setToggle(!toggle)} />
                            <label className="bg-slate-400" htmlFor="switch-1">
                            <span className="bg-white shadow-sm" aria-hidden="true"></span>
                          </label>
                        </div>
                      </div>
                    </div>
                    <div className="flex flex-row justify-end gap-x-2 pt-[20px] pb-[16px] items-end">
                      <button
                        className="btn w-full bg-indigo-500 hover:bg-indigo-600 text-white px-[100px] justify-start"
                        onClick={applyDataDeletion}
                        >
                        <svg className="w-4 h-4 fill-current shrink-0" viewBox="0 0 16 16">
                          <path d="m2.457 8.516.969-.99 2.516 2.481 5.324-5.304.985.989-6.309 6.284z" />
                        </svg>
                        <span className="ml-2">Apply</span>
                      </button>
                    </div>
                    <div className="flex justify-center">
                      <span className="text-descriptionSize text-slate-500 font-normal italic text-center">Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do Terms.</span>
                    </div>
                  </div>
                  {/* Details */}
                  <div className={`${(removePanelOpen || addPanelOpen) || 'hidden'} drop-shadow-lg`}>
                    {/* Top */}
                    <div className="bg-white rounded-t-xl px-5 pb-4 text-center">
                      <div className="mb-3 text-center">
                        <img className="inline-flex w-12 h-12 rounded-full -mt-6" src={Image} width="48" height="48" alt="Transaction 04" />
                      </div>
                      <div className="mt-[31px] text-2xl font-semibold text-emerald-500 mb-1">0.012 IDN</div>
                      <div className="text-sm font-medium text-slate-800 mb-3">Total amount fee</div>
                    </div>
                    {/* Divider */}
                    <div className="flex justify-between items-center" aria-hidden="true">
                      <svg className="w-5 h-5 fill-white" xmlns="http://www.w3.org/2000/svg">
                        <path d="M0 20c5.523 0 10-4.477 10-10S5.523 0 0 0h20v20H0Z" />
                      </svg>
                      <div className="grow w-full h-5 bg-white flex flex-col justify-center">
                        <div className="h-px w-full border-t border-dashed border-slate-200" />
                      </div>
                      <svg className="w-5 h-5 fill-white rotate-180" xmlns="http://www.w3.org/2000/svg">
                        <path d="M0 20c5.523 0 10-4.477 10-10S5.523 0 0 0h20v20H0Z" />
                      </svg>
                    </div>
                    {/* Bottom */}
                    <div className="bg-white rounded-b-xl p-5 pt-[22px] pb-10 text-sm space-y-3">
                      <div className="flex justify-between space-x-1">
                        <span className="italic">Validator:</span>
                        <span className="font-medium text-slate-700 text-right">IT17 2207 1010 0504 0006 88</span>
                      </div>
                      <div className="flex justify-between space-x-1">
                        <span className="italic">Recipient:</span>
                        <span className="font-medium text-slate-700 text-right">IT17 2207 1010 0504 0006 88</span>
                      </div>
                      <div className="flex justify-between space-x-1">
                        <span className="italic">Transaction:</span>
                        <span className="font-medium text-slate-700 text-right">145 bytes</span>
                      </div>
                    </div>
                  </div>
                </div>
                {/* Change panel */}
                <div className={`${!changePanelOpen && 'hidden'} ml-2.5`}>
                  <div className="flex flex-col bg-white px-5 pt-5 pb-6 shadow-lg rounded-sm border border-slate-200 lg:w-72 xl:w-80 gap-y-[8px]">
                    <button
                      className="btn w-full bg-indigo-500 hover:bg-indigo-600 text-white px-[100px] justify-start"
                      onClick={openRemovePanel}
                      >
                      <svg className="w-4 h-4 fill-current shrink-0" viewBox="0 0 16 16">
                        <path d="m2.457 8.516.969-.99 2.516 2.481 5.324-5.304.985.989-6.309 6.284z" />
                      </svg>
                      <span className="ml-2">Remove</span>
                    </button>
                    <button
                      className="btn w-full border-slate-200 hover:border-slate-300 text-slate-600 px-[100px] justify-start"
                      onClick={openUpdatePanel}
                      >
                      <svg className="w-4 h-4 fill-rose-500 shrink-0" viewBox="0 0 16 16">
                        <path d="M14.682 2.318A4.485 4.485 0 0 0 11.5 1 4.377 4.377 0 0 0 8 2.707 4.383 4.383 0 0 0 4.5 1a4.5 4.5 0 0 0-3.182 7.682L8 15l6.682-6.318a4.5 4.5 0 0 0 0-6.364Zm-1.4 4.933L8 12.247l-5.285-5A2.5 2.5 0 0 1 4.5 3c1.437 0 2.312.681 3.5 2.625C9.187 3.681 10.062 3 11.5 3a2.5 2.5 0 0 1 1.785 4.251h-.003Z" />
                      </svg>
                      <span className="ml-2">Update</span>
                    </button>
                    <button className="btn w-full border-slate-200 hover:border-slate-300 text-slate-600 px-[100px] justify-start">
                      <svg className="w-4 h-4 fill-rose-500 shrink-0" viewBox="0 0 16 16">
                        <path d="M14.682 2.318A4.485 4.485 0 0 0 11.5 1 4.377 4.377 0 0 0 8 2.707 4.383 4.383 0 0 0 4.5 1a4.5 4.5 0 0 0-3.182 7.682L8 15l6.682-6.318a4.5 4.5 0 0 0 0-6.364Zm-1.4 4.933L8 12.247l-5.285-5A2.5 2.5 0 0 1 4.5 3c1.437 0 2.312.681 3.5 2.625C9.187 3.681 10.062 3 11.5 3a2.5 2.5 0 0 1 1.785 4.251h-.003Z" />
                      </svg>
                      <span className="ml-2">Share</span>
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  )
})

export default Profile
