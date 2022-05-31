import React, {useState, useEffect} from 'react';
import ProfileTableItem from './ProfileTableItem';

function ProfileTable({
  selectedItems,
  userData
}) {

  const [isCheck, setIsCheck] = useState([]);

  useEffect(() => {
    selectedItems(isCheck);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isCheck]);

  const handleClick = e => {
    const { id, checked } = e.target;
    setIsCheck([...isCheck, id]);
    if (!checked) {
      setIsCheck(isCheck.filter(item => item !== id));
    }
  };

  return (
    <>
    {/* General */}
      <h2 className="grow text-base font-semibold text-slate-800 truncate mb-2.5 mt-8">General 🖋️</h2>
      <div className="overflow-x-auto w-[828px]">
        <table className="w-[828px] table-auto w-full">
          <tbody className="divide-slate-200 divide-y">
            {userData.filter(data => data.category === 'General')
              .map(data => {
                return (
                  <ProfileTableItem
                    key={data.id}
                    id={data.id}
                    image={data.image}
                    value={data.value}
                    property={data.property}
                    status={data.status}
                    transactions={data.transactions}
                    avatars={data.avatars}
                    handleClick={handleClick}
                    isChecked={isCheck.includes(data.id)}
                  />
                )
              })
            }
          </tbody>
        </table>
      </div>
      {/* Nationality */}
      <h2 className="grow text-base font-semibold text-slate-800 truncate mb-2.5 mt-8">Nationality 🖋️</h2>
      <div className="overflow-x-auto w-[828px]">
        <table className="w-[828px] table-auto w-full">
          <tbody className="text-sm divide-slate-200 divide-y ">
            {userData.filter(data => data.category === 'Nationality')
              .map(data => {
                return (
                  <ProfileTableItem
                    key={data.id}
                    id={data.id}
                    image={data.image}
                    value={data.value}
                    property={data.property}
                    status={data.status}
                    transactions={data.transactions}
                    avatars={data.avatars}
                    handleClick={handleClick}
                    isChecked={isCheck.includes(data.id)}
                  />
                )
              })
            }
          </tbody>
        </table>
      </div>
      {/* Social */}
      <h2 className="grow text-base font-semibold text-slate-800 truncate mb-2.5 mt-8">Social 🖋️</h2>
      <div className="overflow-x-auto w-[828px]">
        <table className="w-[828px] table-auto w-full">
          <tbody className="text-sm divide-slate-200 divide-y ">
            {userData.filter(data => data.category === 'Social')
              .map(data => {
                return (
                  <ProfileTableItem
                    key={data.id}
                    id={data.id}
                    image={data.image}
                    value={data.value}
                    property={data.property}
                    status={data.status}
                    transactions={data.transactions}
                    avatars={data.avatars}
                    handleClick={handleClick}
                    isChecked={isCheck.includes(data.id)}
                  />
                )
              })
            }
          </tbody>
        </table>
      </div>
    </>
  )
}

export default ProfileTable;
