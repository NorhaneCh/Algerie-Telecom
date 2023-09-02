import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import "primereact/resources/themes/lara-light-blue/theme.css";
import "primereact/resources/primereact.min.css";

function Table({ data, setShowInfos, setSelectedData, selectedData }) {
  function handleSelection(e) {
    setSelectedData(e.value);
    setShowInfos(true);
  }
  return (
    <div className="z-0 ">
      <DataTable
        value={data}
        scrollable
        removableSort
        scrollHeight="700px"
        editMode="row"
        dataKey="id"
        selectionMode="single"
        selection={selectedData}
        onSelectionChange={handleSelection}
      >
        <Column
          className="w-[150px] text-black"
          field="nom"
          header="Nom"
          sortable
        />
        <Column
          className="w-[150px] text-black"
          field="prenom"
          header="Prénom"
          sortable
        />
        <Column className="text-black" field="service" header="Service" />
        <Column className="text-black" field="pc_bureau" header="Pc Bureau" />
        <Column
          className="text-black"
          field="pc_portable"
          header="Pc Portable"
        />
        <Column
          className="w-[50px] text-black"
          field="imprimante_multifonctions"
          header="Imprimante Multifonctions"
        />
        <Column
          className="w-[50px] text-black"
          field="imprimante_simple"
          header="Imprimante Simple"
        />
        <Column
          className="w-[50px] text-black"
          field="imprimante_thermique"
          header="Imprimante Thermique"
        />
        <Column className="text-black" field="scanner" header="Scanner" />
        <Column className="text-black" field="adresse_ip" header="Adresse IP" />
      </DataTable>
    </div>
  );
}

export default Table;
