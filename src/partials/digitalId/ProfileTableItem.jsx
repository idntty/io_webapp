import React, { useState } from 'react';

function ProfileTableItem(props) {
  const [descriptionOpen, setDescriptionOpen] = useState(false);

  return (
    <>
      <tr className="bg-[#eaf0f6]">
        <td className="pl-4 pr-4 py-3 whitespace-nowrap w-px">
          <div className="flex items-center">
            <label className="inline-flex">
              <span className="sr-only">Select</span>
              <input id={props.id} className="form-checkbox" type="checkbox" onChange={props.handleClick} checked={props.isChecked} />
            </label>
          </div>
        </td>
        <td className="py-3 whitespace-nowrap">
          <div className="flex">
            <div className="w-9 h-9 shrink-0 mr-2 sm:mr-4">
              <img className="rounded-full" src={props.image} width="40" height="40" alt={props.property} />
            </div>
            <div className="flex flex-col w-60"> 
              <div className="font-semibold text-slate-800 text-base">{props.value}</div>
              <div className="font-normal text-xxs">{props.property}</div>
            </div>
          </div>
        </td>
        <td className="py-3 whitespace-nowrap w-px">
          <div className="w-fit text-xs inline-flex font-medium px-2.5 py-1">
            {(props.status === 'Progress') ? (
                <div className="bg-amber-100 text-amber-600 rounded-full text-center px-2.5 py-1">
                  {props.status}
                </div>) : 
              (props.status === 'Stored') ? (
                <div className="bg-slate-700 text-slate-100 rounded-full text-center px-2.5 py-1">
                  {props.status}
                </div>) :
              (props.status === 'Completed') ? (
                <div className="bg-emerald-100 text-emerald-600 rounded-full text-center px-2.5 py-1">
                  {props.status}
                </div>) : (
                <div className="bg-rose-100 text-rose-600 rounded-full text-center px-2.5 py-1">
                  {props.status}
                </div>)
            }
          </div>
        </td>
        <td className="px-2 py-3 whitespace-nowrap w-[340px] box-border">
          <div className="flex flex-wrap items-center -m-1.5 justify-center">
            <div className="flex -space-x-3 -ml-0.5">
              {(props.avatars) ? (
                props.avatars.map((avatar, index) => (
                  <img className="rounded-full border-2 border-slate-100 box-content" key={index} src={avatar} width="32" height="32" alt="Avatar" />
                ))
              ): null}
              <button className="flex justify-center items-center w-9 h-9 rounded-full bg-white border-2 border-slate-200 hover:border-slate-300 text-indigo-500 shadow-sm transition duration-150">
                  <span className="sr-only">Add avatar</span>
                  <svg className="w-4 h-4 fill-current" viewBox="0 0 16 16">
                    <path d="M15 7H9V1c0-.6-.4-1-1-1S7 .4 7 1v6H1c-.6 0-1 .4-1 1s.4 1 1 1h6v6c0 .6.4 1 1 1s1-.4 1-1V9h6c.6 0 1-.4 1-1s-.4-1-1-1z" />
                  </svg>
              </button>
            </div>
          </div>
        </td>
        <td className="px-1 py-3 whitespace-nowrap w-px">
          {/* Button */}
          <div className="flex items-center">
            <button className="text-slate-400 hover:text-slate-500 rounded-full">
              <span className="sr-only">Link</span>
              <svg className="w-4 h-4 fill-current shrink-0 text-slate-400" viewBox="0 0 16 16">
                <path d="M11 0c1.3 0 2.6.5 3.5 1.5 1 .9 1.5 2.2 1.5 3.5 0 1.3-.5 2.6-1.4 3.5l-1.2 1.2c-.2.2-.5.3-.7.3-.2 0-.5-.1-.7-.3-.4-.4-.4-1 0-1.4l1.1-1.2c.6-.5.9-1.3.9-2.1s-.3-1.6-.9-2.2C12 1.7 10 1.7 8.9 2.8L7.7 4c-.4.4-1 .4-1.4 0-.4-.4-.4-1 0-1.4l1.2-1.1C8.4.5 9.7 0 11 0ZM8.3 12c.4-.4 1-.5 1.4-.1.4.4.4 1 0 1.4l-1.2 1.2C7.6 15.5 6.3 16 5 16c-1.3 0-2.6-.5-3.5-1.5C.5 13.6 0 12.3 0 11c0-1.3.5-2.6 1.5-3.5l1.1-1.2c.4-.4 1-.4 1.4 0 .4.4.4 1 0 1.4L2.9 8.9c-.6.5-.9 1.3-.9 2.1s.3 1.6.9 2.2c1.1 1.1 3.1 1.1 4.2 0L8.3 12Zm1.1-6.8c.4-.4 1-.4 1.4 0 .4.4.4 1 0 1.4l-4.2 4.2c-.2.2-.5.3-.7.3-.2 0-.5-.1-.7-.3-.4-.4-.4-1 0-1.4l4.2-4.2Z" />
              </svg>
            </button>
          </div>
        </td>
        <td className="py-3 whitespace-nowrap w-px pr-1.5">
            <div className="flex items-center">
              <button
                className={`text-slate-400 hover:text-slate-500 transform ${descriptionOpen && 'rotate-180'}`}
                aria-expanded={descriptionOpen}
                onClick={() => setDescriptionOpen(!descriptionOpen)}
                aria-controls={`description-${props.id}`}
              >
                <span className="sr-only">Show more</span>
                <svg className="w-8 h-8 fill-current" viewBox="0 0 32 32">
                  <path d="M16 20l-5.4-5.4 1.4-1.4 4 4 4-4 1.4 1.4z" />
                </svg>
              </button>
            </div>
          </td>
      </tr>
      <tr className={`${!descriptionOpen && 'hidden'} bg-[#eaf0f6]` }>
        <td colSpan="10" className="px-12 py-3.5">
          <div className="flex items-center gap-x-5">
            <div>
              <label className="block text-sm font-medium mb-1" htmlFor="placeholder">Seed</label>
              <input id="placeholder" className="form-input w-[396px] bg-white" type="text" placeholder="2342423423423234223" />
            </div>
            <div>
              <span className="block text-sm font-medium mb-1">Transaction</span>
              <a href="" className="w-[396px] text-slate-400 font-normal text-sm underline">0x12831823791203192418234841238468</a>
            </div>
          </div>
          {/* Progress validation bar */}
          <div className="pt-[18px] pb-8">
            <div className="h-full max-w-md w-full flex flex-row">
              <div className="w-32 shrink-0">
                <h2 className="text-xl leading-snug font-bold text-slate-800 xl:leading-7 mb-4 xl:mb-0">Today</h2>
              </div>
              <div>
                <ul className="-my-2">
                  {/* List item */}
                  {props.transactions.map((data, index) => (
                    <li className="relative py-2" key={index}>
                      <div className="flex items-center mb-2.5">
                        {(props.transactions[index+1]) ? (
                          <div className="absolute left-0 h-full w-0.5 bg-slate-200 self-start ml-2.5 -translate-x-1/2 translate-y-3" aria-hidden="true"></div>
                        ) : null}
                        <div className="absolute left-0 rounded-full bg-indigo-500" aria-hidden="true">
                          <svg className="w-5 h-5 fill-current text-white" viewBox="0 0 20 20">
                            <path d="M14.4 8.4L13 7l-4 4-2-2-1.4 1.4L9 13.8z" />
                          </svg>
                        </div>
                        <h3 className="pl-9 whitespace-nowrap">
                          <span className="text-validateLg font-bold text-slate-800">Validate by </span>
                          <a href="" className="font-bold text-validateLg underline text-indigo-500">{data}</a>
                        </h3>
                      </div>
                      <div className="pl-9">
                        <a href="" className="w-[396px] text-slate-800 font-semibold text-base underline">{data}</a>
                        <span className="block text-xxs font-normal mb-1">Transactions ID</span>
                      </div>
                      <div className="pl-9">
                        <a href="" className="w-[396px] text-slate-800 font-semibold text-base underline">{data.slice(2, data.length)}</a>
                        <span className="block text-xxs font-normal mb-1">Validated data</span>
                      </div>
                      <div className="pl-9 pt-[14px]">
                        <a className="text-sm font-medium text-indigo-500 hover:text-indigo-600" href="#0">
                          Explore -&gt;
                        </a>
                      </div>
                    </li>     
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </td>
       </tr>
   </>
  );
}

export default ProfileTableItem;
