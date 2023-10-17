import { createContext, useState } from "react";

const notificationContext = createContext({
  notification: null,
  showNotification: function () {},
  hideNotification: function () {},
});

export function NotificationContextProvider(props) {
  return (
    <notificationContext.Provider>
      {props.chiildren}
    </notificationContext.Provider>
  );
}

export default notificationContext;
