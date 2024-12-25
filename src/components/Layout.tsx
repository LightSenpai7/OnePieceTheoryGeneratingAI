import { Link, useLocation } from 'react-router-dom';

const Layout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const location = useLocation();

    return (
        <>
            {/* Navbar */}
            <nav className="navbar navbar-expand-lg bg-body-tertiary">
                <div className="container-fluid">
                    <a className="navbar-brand" href="/">One Piece Theory Generator AI</a>
                    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    <div className="collapse navbar-collapse" id="navbarSupportedContent">
                        <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                            <li className="nav-item">
                                <Link className={`nav-link ${location.pathname === '/' ? 'active' : ''}`} to="/">Home</Link>
                            </li>
                            <li className="nav-item">
                                <Link className={`nav-link ${location.pathname === '/ai-theory-generator' ? 'active' : ''}`} to="/ai-theory-generator">Theory Generator</Link>
                            </li>
                            <li className="nav-item">
                                <Link className={`nav-link ${location.pathname === '/storage-permission-info' ? 'active' : ''}`} to="/storage-permission-info">Storage Permission Info</Link>
                            </li>
                        </ul>
                    </div>
                </div>
            </nav>

            <main className="container mb-5 pt-5">{children}</main>

            {/* Footer */}
            <footer className="bg-dark text-white text-center py-4 mt-auto">
                <p>&copy; 2024 One Piece Theory Generator AI. All Rights Reserved. This project is licensed under the MIT License.</p>
                <p>Check out the project on <a href="https://github.com/LightSenpai7/OnePieceTheoryGeneratingAI" target="_blank" rel="noopener noreferrer" className="text-white">GitHub</a>.</p>
            </footer>
        </>
    );
};

export default Layout;
