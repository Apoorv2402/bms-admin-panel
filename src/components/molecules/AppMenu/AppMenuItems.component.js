import _ from 'lodash';
import React, { useCallback, useEffect, useState } from 'react';
import { useRecoilValue } from 'recoil';
import { currentAppMenu } from 'state/atoms/currentAppMenu.atom';
import MenuGroup from './MenuGroup.component';

export default function AppMenuItems({ searchText }) {
  const appMenu = useRecoilValue(currentAppMenu);
  const [menuItems, setMenuItems] = useState([]);

  const searchMenuItems = useCallback(
    (text) => {
      const all = appMenu.menuItems || [];
      if (_.isEmpty(text)) {
        setMenuItems(all);
        return;
      }

      const filtered = all.map((grp) => {
        const items = grp.items || [];
        const filteredItems = items.filter(
          (item) => _.toLower(item.label).indexOf(_.toLower(text)) !== -1
        );
        return {
          ...grp,
          items: filteredItems,
        };
      });
      setMenuItems(filtered);
    },
    [appMenu.menuItems]
  );

  useEffect(() => {
    setMenuItems(appMenu.menuItems || []);
  }, [appMenu]);

  useEffect(() => {
    searchMenuItems(searchText);
  }, [searchMenuItems, searchText]);

  return (
    <div>
      {menuItems.map((menuGrp) => (
        <MenuGroup key={menuGrp.groupId} menuGroup={menuGrp} />
      ))}
    </div>
  );
}
