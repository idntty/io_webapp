import React, { useState } from 'react';
import Avatar01 from '../../images/avatar-01.jpg';
import Avatar02 from '../../images/avatar-02.jpg';
import Avatar03 from '../../images/avatar-03.jpg';

function ProfileTableItem(props) {
  const [descriptionOpen, setDescriptionOpen] = useState(false);

  return (
    <tr>
      <td className="px-2 first:pl-5 last:pr-5 py-3 whitespace-nowrap w-px">
        <div className="flex items-center">
          <label className="inline-flex">
            <span className="sr-only">Select</span>
            <input id={props.id} className="form-checkbox" type="checkbox" onChange={props.handleClick} checked={props.isChecked} />
          </label>
        </div>
      </td>
      <td className="px-2 first:pl-5 last:pr-5 py-3 whitespace-nowrap">
        <div className="flex items-center">
          <div className="w-9 h-9 shrink-0 mr-2 sm:mr-4">
            <img className="rounded-full" src={props.image} width="40" height="40" alt={props.property} />
          </div>
          <div className="flex flex-col w-60"> 
            <div className="font-semibold text-slate-800 text-base">{props.value}</div>
            <div className="font-normal text-xxs">{props.property}</div>
          </div>
        </div>
      </td>
      <td className="px-2 first:pl-5 last:pr-5 py-3 whitespace-nowrap w-px">
        {(props.status === 'Progress') ? (
          <div className="m-1.5 w-fit">
            <div className="text-xs inline-flex font-medium bg-amber-100 text-amber-600 rounded-full text-center px-2.5 py-1">{props.status}</div>
          </div>) : 
          (props.status === 'Stored') ? (
          <div className="m-1.5 w-fit">
            <div className="text-xs inline-flex font-medium bg-slate-700 text-slate-100 rounded-full text-center px-2.5 py-1">{props.status}</div>
          </div>) :
          (props.status === 'Completed') ? (
          <div className="m-1.5 w-fit">
            <div className="text-xs inline-flex font-medium bg-emerald-100 text-emerald-600 rounded-full text-center px-2.5 py-1">{props.status}</div>
          </div>) : (
          <div className="m-1.5 w-fit">
            <div className="text-xs inline-flex font-medium bg-rose-100 text-rose-600 rounded-full text-center px-2.5 py-1">{props.status}</div>
          </div>)
        }
      </td>
      <td className="px-2 first:pl-5 last:pr-5 py-3 whitespace-nowrap">
        <div className="flex flex-wrap items-center -m-1.5">
          <div className="flex -space-x-3 -ml-0.5">
            <img className="rounded-full border-2 border-slate-100 box-content" src={Avatar01} width="32" height="32" alt="Avatar" />
            <img className="rounded-full border-2 border-slate-100 box-content" src={Avatar02} width="32" height="32" alt="Avatar" />
            <img className="rounded-full border-2 border-slate-100 box-content" src={Avatar03} width="32" height="32" alt="Avatar" />
            <button className="flex justify-center items-center w-9 h-9 rounded-full bg-white border-2 border-slate-200 hover:border-slate-300 text-indigo-500 shadow-sm transition duration-150">
                <span className="sr-only">Add avatar</span>
                <svg className="w-4 h-4 fill-current" viewBox="0 0 16 16">
                  <path d="M15 7H9V1c0-.6-.4-1-1-1S7 .4 7 1v6H1c-.6 0-1 .4-1 1s.4 1 1 1h6v6c0 .6.4 1 1 1s1-.4 1-1V9h6c.6 0 1-.4 1-1s-.4-1-1-1z" />
                </svg>
            </button>
          </div>
        </div>
      </td>
      <td className="px-2 first:pl-5 last:pr-5 py-3 whitespace-nowrap w-px">
        {/* Menu button */}
        <div className="flex items-center">
          <button className="text-slate-400 hover:text-slate-500 rounded-full">
            <span className="sr-only">Link</span>
            <svg className="w-4 h-4 fill-current shrink-0 text-slate-400" viewBox="0 0 16 16">
              <path d="M11 0c1.3 0 2.6.5 3.5 1.5 1 .9 1.5 2.2 1.5 3.5 0 1.3-.5 2.6-1.4 3.5l-1.2 1.2c-.2.2-.5.3-.7.3-.2 0-.5-.1-.7-.3-.4-.4-.4-1 0-1.4l1.1-1.2c.6-.5.9-1.3.9-2.1s-.3-1.6-.9-2.2C12 1.7 10 1.7 8.9 2.8L7.7 4c-.4.4-1 .4-1.4 0-.4-.4-.4-1 0-1.4l1.2-1.1C8.4.5 9.7 0 11 0ZM8.3 12c.4-.4 1-.5 1.4-.1.4.4.4 1 0 1.4l-1.2 1.2C7.6 15.5 6.3 16 5 16c-1.3 0-2.6-.5-3.5-1.5C.5 13.6 0 12.3 0 11c0-1.3.5-2.6 1.5-3.5l1.1-1.2c.4-.4 1-.4 1.4 0 .4.4.4 1 0 1.4L2.9 8.9c-.6.5-.9 1.3-.9 2.1s.3 1.6.9 2.2c1.1 1.1 3.1 1.1 4.2 0L8.3 12Zm1.1-6.8c.4-.4 1-.4 1.4 0 .4.4.4 1 0 1.4l-4.2 4.2c-.2.2-.5.3-.7.3-.2 0-.5-.1-.7-.3-.4-.4-.4-1 0-1.4l4.2-4.2Z" />
            </svg>
          </button>
        </div>
      </td>
      <td className="px-2 first:pl-5 last:pr-5 py-3 whitespace-nowrap w-px">
          <div className="flex items-center">
            <button
              className={`text-slate-400 hover:text-slate-500 transform ${descriptionOpen && 'rotate-180'}`}
              aria-expanded={descriptionOpen}
              onClick={() => setDescriptionOpen(!descriptionOpen)}
            >
              <span className="sr-only">Menu</span>
              <svg className="w-8 h-8 fill-current" viewBox="0 0 32 32">
                <path d="M16 20l-5.4-5.4 1.4-1.4 4 4 4-4 1.4 1.4z" />
              </svg>
            </button>
          </div>
        </td>
    </tr>
  );
}

export default ProfileTableItem;
