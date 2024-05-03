import React, { useContext, useState } from 'react';
import { Menu, MenuDivider, MenuItem } from 'react-native-material-menu';
import { ThemeContext } from 'styled-components/native';

export interface DropdownItem {
  label: string;
  onPress(): void;
  variant?: 'danger' | 'default';
}

export class DropdownDivider implements DropdownItem {
  label = '';
  onPress(): void {}
}

interface IDropdownProps {
  buttonElement: (controller: { showMenu: () => void }) => JSX.Element;
  menuRef: React.MutableRefObject<any>;
  menuItems: DropdownItem[];
}
function Dropdown(props: IDropdownProps) {
  const theme = useContext(ThemeContext);
  const [visible, setVisible] = useState(false);
  const hideMenu = () => setVisible(false);
  const showMenu = () => setVisible(true);

  return (
    <Menu
      ref={props.menuRef}
      visible={visible}
      anchor={props.buttonElement({ showMenu })}
      onRequestClose={() => hideMenu()}
      style={{ backgroundColor: theme?.dark ? '#4b4b4b' : 'white', borderColor: 'red' }}
    >
      {props.menuItems.map((i) => {
        if (i instanceof DropdownDivider) {
          return <MenuDivider key="divider" color={theme?.dividerColor} />;
        } else {
          return (
            <MenuItem
              pressColor="rgba(127,127,127, 0.28)"
              key={i.label}
              textStyle={{ color: i.variant === 'danger' ? theme?.warningColor : theme?.primaryText }}
              onPress={i.onPress}
            >
              {i.label}
            </MenuItem>
          );
        }
      })}
    </Menu>
  );
}

export { Dropdown };
