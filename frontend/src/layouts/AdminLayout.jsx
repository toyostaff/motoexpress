import Sidebar from "../components/admin/Sidebar";
import NavbarAdmin from "../components/admin/NavbarAdmin";


function AdminLayout({ children }) {

    return (

        <div className="min-h-screen bg-slate-100 flex">

            {/* Sidebar */}
            <Sidebar />


            {/* Área principal */}
            <div className="flex-1 flex flex-col">


                {/* Navbar superior */}
                <NavbarAdmin />


                {/* Contenido */}
                <main className="p-6 flex-1">

                    {children}

                </main>


            </div>


        </div>

    );

}


export default AdminLayout;