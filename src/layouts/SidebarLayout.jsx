const SidebarLayout = ({title, children}) => {
  return (
    <div className="body-container">
        <aside className="sidebar">

            <div className="sidebar-links">
                <ul className="list-style-none">
                    <li>
                        <img src="../assets/homeicon.png" alt=""></img>
                        <span className="d-block">Dashboard</span>
                    </li>
                    <li>
                        <img src="../assets/behavior.png" alt=""></img>
                        <span className="d-block">Behavioral Questions</span>
                    </li>
                    <li>
                        <img src="../assets/technical.png" alt=""></img>
                        <span className="d-block">Technical Questions</span>
                    </li>
                    <li>
                        <img src="../assets/project.png" alt=""></img>
                        <span className="d-block">Project Questions</span>
                    </li>
                    <li>
                        <img src="../assets/flashcard.png" alt=""></img>
                        <span className="d-block">Flash cards</span>
                    </li>
                    <li>
                        <img src="../assets/dreamcompany.png" alt=""></img>
                        <span className="d-block">Dream companies</span>
                    </li>
                </ul>
            </div>
        </aside>
        <main className="main-wrapper">

            <h1>{title}</h1>

            <div className="content">
                {children}
            </div>
        </main>
    </div>
  )
}

export default SidebarLayout