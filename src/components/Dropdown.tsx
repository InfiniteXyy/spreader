import React, { useContext } from 'react';
import Menu, { MenuItem, MenuDivider } from 'react-native-material-menu';
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
  buttonElement: JSX.Element;
  menuRef: React.MutableRefObject<any>;
  menuItems: DropdownItem[];
}
function Dropdown(props: IDropdownProps) {
  const theme = useContext(ThemeContext);
  return (
    <Menu
      ref={props.menuRef}
      button={props.buttonElement}
      style={{ backgroundColor: theme.dark ? '#4b4b4b' : 'white', borderColor: 'red' }}>
      {props.menuItems.map(i => {
        if (i instanceof DropdownDivider) {
          return <MenuDivider color={theme.dividerColor} />;
        } else {
          return (
            <MenuItem
              underlayColor="rgba(127,127,127, 0.28)"
              key={i.label}
              textStyle={{ color: i.variant === 'danger' ? theme.warningColor : theme.primaryText }}
              onPress={i.onPress}>
              {i.label}
            </MenuItem>
          );
        }
      })}
    </Menu>
  );
}

export { Dropdown };
