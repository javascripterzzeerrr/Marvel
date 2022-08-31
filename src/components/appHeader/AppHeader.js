import './appHeader.scss';

const AppHeader = () => {
    return (
        <header className="app__header">
            <h1 className="app__title">
                <a href="my-app/src/components/appHeader/AppHeader#">
                    <span>Marvel</span> information portal
                </a>
            </h1>
            <nav className="app__menu">
                <ul>
                    <li><a href="my-app/src/components/appHeader/AppHeader#">Characters</a></li>
                    /
                    <li><a href="my-app/src/components/appHeader/AppHeader#">Comics</a></li>
                </ul>
            </nav>
        </header>
    )
}

export default AppHeader;