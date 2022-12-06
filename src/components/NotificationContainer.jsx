import React from 'react';
import { observer } from 'mobx-react-lite';
import { Toast } from './Toast2';
import { store } from '../store/store';

export const NotificationContainer = observer(() => (
  <div className="absolute z-50 top-2 right-2 gap-2">
    {store.notifications.map((e) => (
      <Toast type={e.type} key={e.id} id={e.id}>
        {e.message}
      </Toast>
    ))}
  </div>
));
