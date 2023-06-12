import React, { useState } from 'react';
import { createMensaje } from '../services/MensajeService';
import { Dialog } from 'primereact/dialog';
import { InputText } from 'primereact/inputtext';
import { Dropdown } from 'primereact/dropdown';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { Button } from 'primereact/button';
import mensaje from '../pages/Mensaje';

export const DialogCreateUpdate = (props) => {
  // eslint-disable-next-line react/prop-types
  const { htmlFor_00, label_00, id_00, value_00, onChange_00, className_00, msgRequired_00, htmlFor_01, label_01, id_01, value_01, onChange_01, className_01, msgRequired_01, htmlFor_02, label_02, id_02, value_02, onChange_02, className_02, msgRequired_02, htmlFor_03, label_03, id_03, value_03, onChange_03, className_03, msgRequired_03, htmlFor_04, label_04, id_04, value_04, onChange_04, className_04, msgRequired_04, isCategory } = props;
  const fileInputRef = React.createRef();
  const [submitted, setSubmitted] = useState(false);

  const handleClick = () => {
    fileInputRef.current.click();
  };
  return (

    <>
      <div style={{ position: 'flex flex-col' }}>
        <div className='flex' >
          <div className="field">
            <label htmlFor={htmlFor_00} className="font-bold">
              {label_00}
            </label>
            <InputText
              id={id_00}
              value={value_00}
              onChange={onChange_00}
              style={{ width: "full" }}
              required
              className={className_00}
            />
            {msgRequired_00}
          </div>
          <div className="field">
            <label htmlFor={htmlFor_02} className="font-bold">
              {label_02}
            </label>
            <DatePicker
              id={id_02}
              selected={value_02} // Pasa el valor de la fecha seleccionada
              onChange={date => onChange_02(date)} // Actualiza el valor de la fecha cuando cambie
              className={className_02}
              required
            />
            {msgRequired_02}
          </div>
        </div>
        <div className='flex'>
          <div style={{ position: 'flex flex-col' }}>
            <div className="field">
              <label htmlFor={htmlFor_01} className="font-bold">
                {label_01}
              </label>
              <InputText
                id={id_01}
                value={value_01}
                onChange={onChange_01}
                required
                className={className_01}
              />
              {msgRequired_01}
            </div>

            <div className="field">
              <label htmlFor={htmlFor_03} className="font-bold">
                {label_03}
              </label>
              <InputText
                id={id_03}
                value={value_03}
                onChange={onChange_03}
                required
                className={className_03}
              />
              {msgRequired_03}
            </div>
          </div>
          <div className="field">
            <label htmlFor={htmlFor_04} className="font-bold">
              {label_04}
            </label>
            <InputText
              id={id_04}
              value={value_04}
              onChange={onChange_04}
              required
              className={className_04}
              style={{ width: '190px', height: '200px' }}
            />
            {msgRequired_04}
          </div>
        </div>
      </div>


    </>

  );
};

