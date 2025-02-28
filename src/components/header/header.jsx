import '../../static/header.css'
import React from 'react'
import Menu_neader from './menu_neader'
import GrowingSprout from './Sprout'
class Header_markt extends React.Component {
    render() {
        return (
            <section className = "main_header_sect">
                <div className = "name_header">
                    <h1 className = "main_header_h">ForExample</h1>
                </div>
                <div className = "sprout_main"><GrowingSprout/></div>
                <div className = "menu_header">
                    <Menu_neader/>
                </div>


            </section>
        )
    }
}
export default Header_markt