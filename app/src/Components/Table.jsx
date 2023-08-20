"use client";
import {useState} from 'react'
import {DataTable} from 'primereact/datatable'
import { Column } from 'primereact/column';
import "primereact/resources/themes/lara-light-teal/theme.css"
import "primereact/resources/primereact.min.css"
//when i select a row 
function Table ({ data, setShowInfos,setSelectedData,selectedData}) { 
  function handleSelection(e){
    setSelectedData(e.value);
    setShowInfos(true);
  }
  return (
    <div className='z-0'>
      <DataTable value={data} scrollable scrollHeight="700px" editMode="row" dataKey="id" selectionMode="single" selection={selectedData} onSelectionChange={handleSelection} >
        <Column className='w-[150px] bg-green-color text-black' field='nom' header='Nom' sortable/>
        <Column className='w-[150px] bg-green-color text-black'field='prenom' header='Prénom' sortable/>
        <Column className='bg-green-color text-black'field='service' header='Service'/>
        <Column className='bg-green-color text-black'field='pc_bureau' header='Pc Bureau'/>
        <Column className='bg-green-color text-black'field='pc_portable' header='Pc Portable'/>
        <Column className='w-[50px] bg-green-color text-black'field='imprimente_multifonctions' header='Imprimente Multifonctions'/>
        <Column className='w-[50px] bg-green-color text-black'field='imprimente_multifonctions' header='Imprimente IDK'/>
        <Column className='w-[50px] bg-green-color text-black'field='imprimente_thermique' header='Imprimente Thermique'/>
        <Column className='bg-green-color text-black'field='scanner' header='Scanner'/>
        <Column className='bg-green-color text-black'field='adresse_ip' header='Adresse IP'/>        
      </DataTable>
    </div>
  );

};

export default Table;