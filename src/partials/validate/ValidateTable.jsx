import React, {useEffect, useState} from "react";
import ValidateTableItem from "./ValidateItem";

function ValidateTable({
 setValidatePanelOpen
}) {

  const validateData = [
    {
      id: '10',
      check: true,
      filed: 'Second name',
      data: 'Pavel',
      status: 'Correct',
      seed: '1234 ... 1234',
    },
    {
      id: '11',
      check: true,
      filed: 'First name',
      data: 'Thownetc',
      status: 'Correct',
      seed: '4567 ... 0987',
    },
    {
      id: '12',
      check: false,
      filed: 'Gender',
      data: 'Female',
      status: 'Incorrect',
      seed: '4567 ... 0987',
    },
    {
      id: '13',
      check: false,
      filed: 'Document',
      data: 'Passport',
      status: 'Missed',
      seed: '4567 ... 0987',
    },
    {
      id: '14',
      check: true,
      filed: 'Document ID',
      data: '1233425345',
      status: 'Correct',
      seed: '1234 ... 1234',
    },
  ];

  const [selectAll, setSelectAll] = useState(false);
  const [isCheck, setIsCheck] = useState([]);
  const [list, setList] = useState([]);

  useEffect(() => {
    setList(validateData);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleSelectAll = () => {
    setSelectAll(!selectAll);
    setIsCheck(list.map(li => li.id));
    if (selectAll) {
      setIsCheck([]);
    }
  };

  const handleClick = e => {
    const { id, checked } = e.target;
    setSelectAll(false);
    setIsCheck([...isCheck, id]);
    if (!checked) {
      setIsCheck(isCheck.filter(item => item !== id));
    }
  };

  return (
      <div className="w-fit">
        <div>
          {/* Table */}
          <div className="overflow-x-auto">
            <table className="table-auto w-fit">
              {/* Table header */}
              <thead className="bg-white text-xs font-semibold uppercase text-slate-500 border-t border-b-2 border-slate-200">
              <tr>
                <th className="px-2 first:pl-5 last:pr-5 py-3 whitespace-nowrap w-px">
                  <div className="flex items-center">
                    <label className="inline-flex">
                      <span className="sr-only">Select all</span>
                      <input className="form-checkbox" type="checkbox" checked={selectAll} onChange={handleSelectAll} />
                    </label>
                  </div>
                </th>
                <th className="px-2 first:pl-5 pr-[136px] py-3 whitespace-nowrap">
                  <div className="font-semibold text-left">FIELD</div>
                </th>
                <th className="px-2 first:pl-5 pr-[154px] py-3 whitespace-nowrap">
                  <div className="font-semibold text-left">DATA</div>
                </th>
                <th className="min-w-[191px] px-2 first:pl-5 pr-[168px] py-3 whitespace-nowrap">
                  <div className="pl-7 font-semibold text-left">SEED</div>
                </th>
                <th className="px-2 first:pl-5 last:pr-5 py-3 whitespace-nowrap">
                  <div className="pl-2 font-semibold text-left">STATUS</div>
                </th>
                <th className="px-2 first:pl-5 last:pr-5 py-3 whitespace-nowrap" />
              </tr>
              </thead>
              {/* Table body */}
              <tbody className="text-sm divide-y divide-slate-200 border-b border-slate-200">
              {list.map((data) => {
                return (
                    <ValidateTableItem
                        key={data.id}
                        id={data.id}
                        filed={data.filed}
                        data={data.data}
                        status={data.status}
                        seed={data.seed}
                        check={data.check}
                        handleClick={handleClick}
                        isChecked={isCheck.includes(data.id)}
                        setValidatePanelOpen={setValidatePanelOpen}
                    />
                );
              })}
              </tbody>
            </table>
          </div>
        </div>
      </div>
  );
}

export default ValidateTable;
