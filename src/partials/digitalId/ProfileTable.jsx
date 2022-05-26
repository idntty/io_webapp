import React from 'react';
import ProfileTableItem from './ProfileTableItem';
import ProfileIcon from '../../images/profile-icon.svg';
import Avatar01 from '../../images/avatar-01.jpg';
import Avatar02 from '../../images/avatar-02.jpg';
import Avatar03 from '../../images/avatar-03.jpg';

function ProfileTable() {

  const userData = [
    {
      id: '0',
      category: 'General',
      validated: true,
      blockchained: true,
      image: ProfileIcon,
      value: 'Dominik',
      property: 'First name',
      status: 'Completed',
      transactions: ['0x7234ABC342342352345', '0x5745DEF342342352345'],
      avatars: [Avatar01, Avatar02, Avatar03]
    },
    {
      id: '1',
      category: 'General',
      validated: true,
      blockchained: true,
      image: ProfileIcon,
      value: 'Lamakani',
      property: 'Second name',
      status: 'Progress',
      transactions: ['0x7234ABC342342352345', '0x5745DEF342342352345'],
      avatars: null
    },
    {
      id: '2',
      category: 'General',
      validated: true,
      blockchained: true,
      image: ProfileIcon,
      value: '05.10.1983',
      property: 'Birthdate',
      status: 'Incorrect',
      transactions: ['0x7234ABC342342352345', '0x5745DEF342342352345'],
      avatars: null
    },
    {
      id: '3',
      category: 'General',
      validated: true,
      blockchained: true,
      image: ProfileIcon,
      value: 'Male',
      property: 'Gender',
      status: 'Stored',
      transactions: ['0x7234ABC342342352345', '0x5745DEF342342352345'],
      avatars: null
    },
    {
      id: '4',
      category: 'Nationality',
      validated: true,
      blockchained: true,
      image: ProfileIcon,
      value: 'United Kindom',
      property: 'Residence',
      status: 'Completed',
      transactions: ['0x7234ABC342342352345', '0x5745DEF342342352345'],
      avatars: [Avatar01, Avatar02, Avatar03]
    },
    {
      id: '5',
      category: 'Nationality',
      validated: true,
      blockchained: true,
      image: ProfileIcon,
      value: 'Passport',
      property: 'Document type',
      status: 'Progress',
      transactions: ['0x7234ABC342342352345', '0x5745DEF342342352345'],
      avatars: [Avatar01, Avatar02, Avatar03]
    },
    {
      id: '6',
      category: 'Nationality',
      validated: true,
      blockchained: true,
      image: ProfileIcon,
      value: 'A123B3143',
      property: 'Document ID',
      status: 'Incorrect',
      transactions: ['0x7234ABC342342352345', '0x5745DEF342342352345'],
      avatars: null
    },
    {
      id: '7',
      category: 'Nationality',
      validated: true,
      blockchained: true,
      image: ProfileIcon,
      value: '05.10.2012',
      property: 'Issue date',
      status: 'Stored',
      transactions: ['0x7234ABC342342352345', '0x5745DEF342342352345'],
      avatars: null
    },
    {
      id: '8',
      category: 'Nationality',
      validated: true,
      blockchained: true,
      image: ProfileIcon,
      value: '05.10.2032',
      property: 'Expiry date',
      status: 'Stored',
      transactions: ['0x7234ABC342342352345', '0x5745DEF342342352345'],
      avatars: null
    },
    {
      id: '9',
      category: 'Social',
      validated: true,
      blockchained: true,
      image: ProfileIcon,
      value: '@lamakani',
      property: 'Telegram',
      status: 'Completed',
      transactions: ['0x7234ABC342342352345', '0x5745DEF342342352345'],
      avatars: null
    },
    {
      id: '10',
      category: 'Social',
      validated: true,
      blockchained: true,
      image: ProfileIcon,
      value: '@lamakani',
      property: 'Telegram',
      status: 'Progress',
      transactions: ['0x7234ABC342342352345', '0x5745DEF342342352345'],
      avatars: [Avatar01, Avatar02, Avatar03]
    },
  ]

  return (
    <>
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
                  />
                )
              })
            }
          </tbody>
        </table>
      </div>

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
                  />
                )
              })
            }
          </tbody>
        </table>
      </div>

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
