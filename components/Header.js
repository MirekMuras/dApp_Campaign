import React from 'react';
import {Menu, MenuMenu} from 'semantic-ui-react';

export default () => {
    return(
        <Menu>
            <Menu.Item name='CrowdCoin' >
            CrowdCoin
            </Menu.Item>

         <MenuMenu position='right'>
            <Menu.Item name='Campaigns' >
                Campaigns
            </Menu.Item>

              <Menu.Item name='plus_Sign'>
                +
            </Menu.Item>
         </MenuMenu>

        </Menu>
    );
};