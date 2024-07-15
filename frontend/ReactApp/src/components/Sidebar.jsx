import Logo from "../assets/kv-logo.png"
import icon from "../assets/icon.svg"
import { Link } from "react-router-dom"

const Sidebar=()=>{
    return<>
    <aside>
        <div className="sidebar-section">
            <div className="sidebar-logo">
                <img src={Logo} alt="KeyValue Logo" />
            </div>
            <div className="sidebar-list">
                <ul>
                    <li>
                        <Link>
                        <img src={icon} alt="KeyValue Logo" />
                        <span className="sidebar-create">

                        </span>
                        </Link>
                    </li>
                    <li>
                        <Link>
                        <img src={icon} alt="KeyValue Logo" />
                        <span className="sidebar-list">

                        </span>
                        </Link>
                    </li>
                </ul>
            </div>
        </div>
    </aside>
    </>
}

export default Sidebar  

