/* eslint-disable react/prop-types */
import { InputText } from "primereact/inputtext";
import { Calendar } from "primereact/calendar";
import { Button } from 'primereact/button';

export const CreateUpdate = (props) => {
  const {
    htmlFor_00,
    label_00,
    id_00,
    value_00,
    onChange_00,
    className_00,
    msgRequired_00,
    htmlFor_01,
    label_01,
    id_01,
    value_01,
    onChange_01,
    className_01,
    msgRequired_01,
    htmlFor_02,
    label_02,
    id_02,
    value_02,
    onChange_02,
    className_02,
    msgRequired_02,
    htmlFor_03,
    label_03,
    id_03,
    value_03,
    onChange_03,
    className_03,
    msgRequired_03,
    htmlFor_04,
    label_04,
    id_04,
    value_04,
    onChange_04,
    className_04,
    msgRequired_04,
  } = props;

  return (
    <div style={{
      boxShadow: '0 0.25rem 0.5rem rgba(0, 0, 0, 0.1)',
      borderRadius: '0.375rem',
      '@media (min-width: 640px)': {
        borderRadius: '0.5rem'
      }
    }}>
      <div style={{
        backgroundColor: 'white', paddingTop: '1rem', paddingBottom: '2.25rem'
        , paddingRight: '2rem', paddingLeft: '2rem', '@media (min-width: 640px)': { padding: '3rem' }
      }} >
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)' }}>
          <div style={{ padding: '1rem' }}>
            <label  htmlFor={htmlFor_00} style={{
              display: 'block',
              fontSize: '0.875rem',
              fontWeight: '500',
              color: 'black'
            }}>
              {label_00}
            </label>
            <InputText
              id={id_00}
              value={value_00}
              onChange={onChange_00}
              required
              className={className_00}
            />
            {msgRequired_00}
          </div>
          <div style={{ padding: '1rem' }} >
            <label htmlFor={htmlFor_02} style={{
              display: 'block',
              fontSize: '0.875rem',
              fontWeight: '500',
              color: 'black'
            }}>
              {label_02}
            </label>
            <Calendar
              id={id_02}
              style={{width: '12rem', textAlign:'center', alignItems:'center'  }}
              value={value_02}
              onChange={onChange_02}
              dateFormat="yy-mm-dd"
              required
              className={className_02}
            />
            {msgRequired_02}
          </div>
         
          
        </div>
        <div>
          <div style={{ position: "relative" }}>
            <div style={{   gridColumn: 'span 10',  padding: '1rem' }}>
              <label htmlFor={htmlFor_01} className="font-bold">
                {label_01}
              </label>
              <InputText
                id={id_01}
                value={value_01}
                onChange={onChange_01}
                style={{width:'27.3rem'}}
                required
                className={className_01}
              />
              {msgRequired_01}
            </div>

            <div style={{   gridColumn: 'span 10',  padding: '1rem' }}>
              <label htmlFor={htmlFor_03} className="font-bold">
                {label_03}
              </label>
              <InputText
                id={id_03}
                value={value_03}
                style={{width:'27.3rem'}}
                onChange={onChange_03}
                required
                className={className_03}
              />
              {msgRequired_03}
            </div>
            <div style={{ gridColumn: 'span 10',  padding: '1rem' }}>
              <label htmlFor={htmlFor_04} className="font-bold">
                {label_04}
              </label>
              <InputText
                id={id_04}
                value={value_04}
                onChange={onChange_04}
                required  
                className={className_04}
                style={{ height: "150px", width:'27.3rem'}}
              />
              {msgRequired_04}
            </div>
          </div>
          </div>
      </div>
{/*      <div style={{padding: '1rem',
      paddingBottom: '1.5rem',
      display: 'flex',
      flex: '1',
      alignItems: 'center',
      justifyContent: 'center',
      '@media (min-width: 768px)': {
        alignItems: 'stretch',
        justifyContent: 'flex-start'
      }}}>
        
    </div>*/}
    </div>
  );
};
