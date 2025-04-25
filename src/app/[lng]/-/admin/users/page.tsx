"use client";

import useGetUsers from "@/hooks/useGetUsers";
import { User, UsersPaginated } from "@/types/users";
import { Column } from "primereact/column";
import { DataTable } from "primereact/datatable";
import { Dropdown } from "primereact/dropdown";
import { Sidebar } from "primereact/sidebar";
import { useEffect, useState } from "react";

export default function Users() {
  const [usersData, setUsersDatta] = useState<UsersPaginated>({} as UsersPaginated);
  const [usuarioSelecionado, setUsuarioSelecionado] = useState<User | null>(null);
  const [sidebarVisivel, setSidebarVisivel] = useState(false);
  const { getUsers } = useGetUsers();

  useEffect(() => {
    getUsers<UsersPaginated>()
      .then((r) => {
        setUsersDatta(r);
      })
      .catch((err) => {
        console.error(err);
      });
  }, []);

  const opcoesTipoUsuario = ["Promotor", "Utilizador", "Admin"];

  const abrirSidebar = (usuario: User) => {
    setUsuarioSelecionado(usuario);
    setSidebarVisivel(true);
  };

  // const alterarTipoUsuario = (novoTipo: string) => {
  //   setUsersDatta((prevUsuarios) =>
  //     prevUsuarios.map((u) => (u.email === usuarioSelecionado?.email ? { ...u, tipoUsuario: novoTipo } : u)),
  //   );
  // };

  // const removerUsuario = () => {
  //   setUsersDatta((prevUsuarios) => prevUsuarios.filter((u) => u.email !== usuarioSelecionado?.email));
  //   setSidebarVisivel(false);
  // };

  return (
    <section className="">
      <DataTable
        value={usersData.users}
        paginator
        rows={usersData.limit}
        rowsPerPageOptions={[usersData.limit]}
        tableStyle={{ minWidth: "50rem" }}
        selectionMode="single"
        onRowSelect={(e) => abrirSidebar(e.data)}
      >
        <Column field="name.name" header="Nome" style={{ width: "20%" }}></Column>
        <Column field="email" header="Email" style={{ width: "25%" }}></Column>
        <Column field="role" header="Tipo de Usuário" style={{ width: "20%" }}></Column>
        <Column field="phone" header="phone" style={{ width: "20%" }}></Column>
      </DataTable>

      <Sidebar
        visible={sidebarVisivel}
        onHide={() => setSidebarVisivel(false)}
        position="right"
        style={{ width: "300px" }}
        className="bg-primary text-white p-5"
      >
        {usuarioSelecionado && (
          <div className="flex flex-col gap-8">
            <h3>{usuarioSelecionado.name}</h3>
            <p>
              <strong>Email:</strong> {usuarioSelecionado.email}
            </p>
            <p>
              <strong>Phone:</strong> {usuarioSelecionado.phone}
            </p>
            <p>
              <strong>Tipo de Usuário: </strong>
            </p>
            <Dropdown
              value={usuarioSelecionado.role}
              options={opcoesTipoUsuario.map((tipo) => ({ label: tipo, value: tipo }))}
              // onChange={(e) => alterarTipoUsuario(e.value)}
              placeholder="Selecione um tipo"
              className="w-full mb-3"
            />
            {/* <Button label="Remover Usuário" className="bg-white text-destructive h-11 w-full" onClick={removerUsuario} /> */}
          </div>
        )}
      </Sidebar>
    </section>
  );
}
