import React from 'react'
import { Link } from 'react-router-dom'


const Admin = () => {
  return (
    <div>
      <h2>This is admin panel</h2>
<Link to="/admin/menu" className='show-order'>
Menu
</Link>

<Link to="/admin/orders"className='edit-menu'>
Orders
</Link>

    </div>
  )
}

export default Admin
