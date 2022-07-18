import React from 'react';
import { Link } from 'react-router-dom';
import {generateSvgAvatar} from "../images/GenerateOnboardingSvg/GenerateSvg";
import User06 from "../images/user-28-06.jpg";
import User08 from "../images/user-28-08.jpg";
import User09 from "../images/user-28-09.jpg";
import SharedDataRoadMap from "../partials/sharedData/SharedDataRoadmap";

function SharedData() {

  const sharedDataItems = {
      data: localStorage.getItem('digitalId'),
      items: [
        {
          dataShared: localStorage.getItem('digitalId'),
          id: '923',
          text: 'United Kindom',
          typeItem: 'Residence',
          usersImges: [
            {
              size: 32,
              img: User06,
              imgId: "90"
            },
            {
              size: 32,
              img: User08,
              imgId: "93"
            },
            {
              size: 32,
              img: User09,
              imgId: "89"
            },
          ],
        },
        {
          dataShared: localStorage.getItem('digitalId'),
          id: '401',
          text: 'A123B3143',
          typeItem: 'Document ID',
          usersImges: [
            {
              size: 32,
              img: User06,
              imgId: "67"
            },
            {
              size: 32,
              img: User08,
              imgId: "71"
            },
          ],
        },
      ]
    };

  return (
    <main className="bg-white">

      <div className="relative flex">

        {/* Content */}
        <div className="w-full md:w-1/2">

          <div className="min-h-screen h-full flex flex-col after:flex-1">

            <div className="px-4 mt-16 py-9">
              <div className=" flex flex-col max-w-md mx-auto">
                <h1 className="text-3xl text-slate-800 font-bold mb-8">Shared data ✨</h1>
                <ul>
                  {sharedDataItems.items.map(item => {
                    return(
                        <li key={item.id}>
                          <SharedDataRoadMap data={item}/>
                        </li>
                    );
                  })}
                </ul>
              </div>
            </div>

          </div>

        </div>

        {/* Image */}
        <div className="flex flex-col items-center h-full w-full hidden md:block absolute top-0 bottom-0 right-0 md:w-1/2" aria-hidden="true">
          <div className="flex mt-40 flex-col items-center gap-2.5">
            <img className="object-cover object-center" src={generateSvgAvatar()} width="493px" height="493px" alt="Onboarding" />
            <span className="text-sm">{sharedDataItems.data}</span>
            <Link className="mt-12 btn bg-indigo-500 hover:bg-indigo-600 text-white" to="/dashboard">Get my digital ID</Link>
          </div>
        </div>

      </div>

    </main>
  );
}

export default SharedData;
