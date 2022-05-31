import React from 'react';

function ValidateTableItem(props) {

  const statusColor = (status) => {
    switch (status) {
      case 'Correct':
        return 'bg-emerald-100 text-emerald-600';
      case 'Incorrect':
        return 'bg-rose-100 text-rose-500';
      default:
        return 'bg-slate-100 text-slate-500';
    }
  };

  function openValidatePanel (event) {
    event.stopPropagation()
    props.setValidatePanelOpen(true)
  }

  return (
      <tr className="hover:bg-[#E2E8F0] cursor-pointer" onClick={(e) => openValidatePanel(e)}>
        <td className="px-2 first:pl-5 last:pr-5 py-3 whitespace-nowrap w-px">
          <div className="flex items-center">
            <label className="inline-flex">
              <span className="sr-only">Select</span>
              {props.check && <input id={props.id} className="form-checkbox" type="checkbox" onChange={props.handleClick} checked={props.isChecked}  onClick={(e) => e.stopPropagation()} />}
            </label>
          </div>
        </td>
        <td className="px-2 first:pl-5 last:pr-5 py-3 whitespace-nowrap md:w-1/2">
          <div className="flex items-center">
            <div>{props.filed}</div>
          </div>
        </td>
        <td className="px-2 first:pl-5 last:pr-5 py-3 whitespace-nowrap">
          <div className="text-left font-medium text-slate-800">{props.data}</div>
        </td>
        <td className="px-2 first:pl-5 last:pr-5 py-3 whitespace-nowrap w-px">
          <div className={`text-left`}>{props.seed}</div>
        </td>
        <td className="px-2 first:pl-5 py-3 whitespace-nowrap">
          <div className="text-left">
            <div className={`text-xs inline-flex font-medium rounded-full text-center px-2.5 py-1 ${statusColor(props.status)}`}>{props.status}</div>
          </div>
        </td>
        <td className="px-2 first:pl-5 last:pr-5 pt-3 pb-2 whitespace-nowrap w-px">
          {/* Menu button */}
          <button className="text-slate-400 hover:text-slate-500 rounded-full">
            <span className="sr-only">Menu</span>
            <svg className="w-8 h-8 fill-current" viewBox="0 0 32 32">
              <circle cx="16" cy="16" r="2" />
              <circle cx="10" cy="16" r="2" />
              <circle cx="22" cy="16" r="2" />
            </svg>
          </button>
        </td>
      </tr>
  );
}

export default ValidateTableItem;
