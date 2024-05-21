import SideNav from "../ui/SideNav/SideNav";
import "./TemplateComp.css";

const TemplateComp = () => {

    return (
      <main className="templateMain">
        <section className="sidenavTemplateSection">
          <article className="sideNavTemplate">
            {/* inhoud sidenav */}
            <SideNav />
          </article>
        </section>
        <section className='rightsideTemplateSection'>
        </section>
      </main>
    );
  }

  export default TemplateComp;
