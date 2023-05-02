//Merve Yılmaz, 01.05.2023

import React from 'react'
import { Dropdown, Menu, Image } from 'semantic-ui-react'

//çıkış yapma sayfasıdır
export default function SignedIn({signedOut}) {
  
  //const { loginInfo } = useSelector((state) => state.login);

  const username = localStorage.getItem("username");
 
  return (
    <div>
        
        <Menu.Item>
            <Image avatar spaced = "right" src ="/userLogo.png"/>
            <Dropdown pointing ="top left" text={username}>
                <Dropdown.Menu>
                        {/* <Dropdown.Item text = "Bilgilerim" icon = "info"/> */}
                        <Dropdown.Item onClick={signedOut} text = "Sign Out" icon = "sign-out"/>

                    </Dropdown.Menu>
                </Dropdown>        
        </Menu.Item>

    
    </div>
  )
}