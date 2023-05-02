import React from 'react'
import { Menu } from 'semantic-ui-react'

export default function SignedOut({ signedIn }) {
  return (
    <div>
      <Menu.Item >
        {/* <Button onClick={signedIn} color="red" >Çıkış</Button> */}
        {/* <Button secondary style = {{marginLeft:'0.5em'}}>Çıkış Yap</Button> */}
      </Menu.Item>
    </div>
  )
}
