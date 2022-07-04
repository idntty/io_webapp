import React, {useState, useEffect} from 'react';
import ProfileTableItem from './ProfileTableItem';
import ProfileIcon from '../../images/profile-icon.svg';

function ProfileTable({
  selectedItems,
  userData
}) {

  const [isCheck, setIsCheck] = useState([]);

  const defaultData = {
    image: ProfileIcon,
    status: 'Stored',
    transactions: ['0x7234ABC342342352345', '0x5745DEF342342352345'],
    avatars: null
  }

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

  const data = {
    general:["First name","Second name", "Gender", "Birthdate", "Place of birth"],
    nationality:["Nationality", "National id", "National doctype", "National doc id", "National doc issue date", "National doc expiry date"],
    social:["Telephone", "Twitter", "Facebook", "Instagram", "Youtube", "Wechat", "Tiktok", "Linkedin", "Vk", "Github", "Telegram", "Qq", "Snapchat", "Reddit"]
  }

  const generalData = userData.filter(elem => data.general.includes(elem.label)),
        nationalityData = userData.filter(elem => data.nationality.includes(elem.label)),
        sosialData = userData.filter(elem => data.nationality.includes(elem.label)),
        otherData = userData.filter((elem) => 
          !data.general.includes(elem.label) && !data.nationality.includes(elem.label) && !data.social.includes(elem.label));

  return (
    <>
    {/* General */}
      <div className={`${generalData.length > 0 || 'hidden'}`}>
        <h2 className="grow text-base font-semibold text-slate-800 truncate mb-2.5 mt-8">General 🖋️</h2>
        <div className="overflow-x-auto w-[828px]">
          <table className="w-[828px] table-auto w-full">
            <tbody className="divide-slate-200 divide-y">
              {generalData.map((data) => {
                return (
                  <ProfileTableItem
                    key={data.label}
                    id={data.label}
                    image={defaultData.image}
                    value={data.value.charAt(0).toUpperCase()+data.value.slice(1)}
                    property={data.label}
                    status={defaultData.status}
                    transactions={defaultData.transactions}
                    avatars={defaultData.avatars}
                    handleClick={handleClick}
                    isChecked={isCheck.includes(data.label)}
                  />
                )
              })}
            </tbody>
          </table>
        </div>
      </div>
      {/* Nationality */}
      <div className={`${nationalityData.length > 0 || 'hidden'}`}>
        <h2 className="grow text-base font-semibold text-slate-800 truncate mb-2.5 mt-8">Nationality 🖋️</h2>
        <div className="overflow-x-auto w-[828px]">
          <table className="w-[828px] table-auto w-full">
            <tbody className="text-sm divide-slate-200 divide-y ">
              {nationalityData.map(data => {
                return (
                  <ProfileTableItem
                    key={data.label}
                    id={data.label}
                    image={defaultData.image}
                    value={data.value.charAt(0).toUpperCase()+data.value.slice(1)}
                    property={data.label}
                    status={defaultData.status}
                    transactions={defaultData.transactions}
                    avatars={defaultData.avatars}
                    handleClick={handleClick}
                    isChecked={isCheck.includes(data.label)}
                  />
                )
              })}
            </tbody>
          </table>
        </div>
      </div>
      {/* Social */}
      <div className={`${sosialData.length > 0 || 'hidden'}`}>
        <h2 className="grow text-base font-semibold text-slate-800 truncate mb-2.5 mt-8">Social 🖋️</h2>
        <div className="overflow-x-auto w-[828px]">
          <table className="w-[828px] table-auto w-full">
            <tbody className="text-sm divide-slate-200 divide-y ">
            {sosialData.map(data => {
              return (
                <ProfileTableItem
                  key={data.label}
                  id={data.label}
                  image={defaultData.image}
                  value={data.value.charAt(0).toUpperCase()+data.value.slice(1)}
                  property={data.label}
                  status={defaultData.status}
                  transactions={defaultData.transactions}
                  avatars={defaultData.avatars}
                  handleClick={handleClick}
                  isChecked={isCheck.includes(data.label)}
                />
              ) 
            })}
            </tbody>
          </table>
        </div>
      </div>
      {/* Other */}
      <div className={`${otherData.length > 0 || 'hidden'}`}>
        <h2 className="grow text-base font-semibold text-slate-800 truncate mb-2.5 mt-8">Other 🖋️</h2>
        <div className="overflow-x-auto w-[828px]">
          <table className="w-[828px] table-auto w-full">
            <tbody className="text-sm divide-slate-200 divide-y ">
            {otherData.map(data => {
              return (
                <ProfileTableItem
                  key={data.label}
                  id={data.label}
                  image={defaultData.image}
                  value={data.value}
                  property={data.label}
                  status={defaultData.status}
                  transactions={defaultData.transactions}
                  avatars={defaultData.avatars}
                  handleClick={handleClick}
                  isChecked={isCheck.includes(data.label)}
                />
              )
            })}
            </tbody>
          </table>
        </div>
      </div>
    </>
  )
}

export default ProfileTable;
