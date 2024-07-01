import { Link } from "react-router-dom";
import classes from './MainNavigation.module.css';
function MainNavigation() {
    
    return <header className= {classes.header}>
        <div className={classes.logo}>
            <nav>
                <Link to = '/'>Stock Pulse</Link>            
            </nav>
            
        </div>
        <nav>
            <ul>
                <li>
                    <Link to = '/billing-form' >Billing</Link>
                </li>
                <li>
                    <Link to = '/new-meetup'>Check Stock</Link>
                </li>
                <li>
                    <Link to = '/favorites'>Add Stock</Link>
                </li>
            </ul>
        </nav>
    </header>
}

export default MainNavigation;