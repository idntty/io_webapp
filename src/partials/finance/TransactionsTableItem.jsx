import React from "react";

import ServiceImage from "../../images/service_icon.png";
import { observer } from "mobx-react-lite";

const TransactionsTableItem = observer((props) => {
  const statusColor = () => {
    switch (props.status) {
      case "Vote":
        return "bg-emerald-100 text-emerald-600";
      case "Unvote":
        return "bg-rose-100 text-rose-500";
      default:
        return "bg-slate-100 text-slate-500";
    }
  };

  const amountColor = () => {
    switch (props.status === "Unvote") {
      case "+":
        return "text-emerald-500";
      default:
        return "text-slate-700";
    }
  };

  const clickReturn = (e) => {
    e.stopPropagation();
    store.pushUnlockTransaction(props.id);
  };

  return (
    <tr className="cursor-pointer" onClick={() => props.handleClick()}>
      <td className="px-2 first:pl-5 last:pr-5 py-3 whitespace-nowrap md:w-1/2">
        <div className="flex items-center">
          <div className="w-9 h-9 shrink-0 mr-2 sm:mr-3">
            <img
              className="rounded-full"
              src={props.image}
              width="36"
              height="36"
              alt={props.name}
            />
          </div>
          <div className="font-medium text-slate-800">{props.name}</div>
          {store.accountLockedVotesCanReturn[props.id] && (
            <span
              className="truncate font-medium text-indigo-500 group-hover:text-indigo-600 ml-2"
              onClick={clickReturn}
            >
              Return votes
            </span>
          )}
        </div>
      </td>
      <td className="px-2 first:pl-5 last:pr-5 py-3 whitespace-nowrap">
        <div className="flex items-center justify-center">
          <div className="w-9 h-9 shrink-0">
            {props.hasSevice && (
              <img
                className="rounded-full"
                src={ServiceImage}
                width="36"
                height="36"
                alt="service"
              />
            )}
          </div>
        </div>
      </td>
      <td className="px-2 first:pl-5 last:pr-5 py-3 whitespace-nowrap">
        <div className="text-center">{props.balance}/idn</div>
      </td>
      <td className="px-2 first:pl-5 last:pr-5 py-3 whitespace-nowrap">
        <div className="text-center">{props.total}/idn</div>
      </td>
      <td className="px-2 first:pl-5 last:pr-5 py-3 whitespace-nowrap">
        <div className="text-center">
          <div
            className={`text-xs inline-flex font-medium rounded-full justify-center px-2.5 py-1 ${statusColor()}`}
            style={{ minWidth: "84px" }}
          >
            {props.status}
          </div>
        </div>
      </td>
      <td className="px-2 first:pl-5 last:pr-5 py-3 whitespace-nowrap w-px">
        <div className={`text-center font-medium ${amountColor()}`}>
          {props.amount.toString()}/idn
        </div>
      </td>
    </tr>
  );
});

export default TransactionsTableItem;
