
import { useState } from 'react';

export const useSettings = () => {
  const [settingsPanelOpen, setSettingsPanelOpen] = useState(false);

  return {
    settingsPanelOpen,
    setSettingsPanelOpen
  };
};
