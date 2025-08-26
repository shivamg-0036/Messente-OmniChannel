import React, { useEffect, useState } from 'react';
import { RotateSpinner } from 'react-spinners-kit';
import { DatePicker } from 'antd';
import dayjs from 'dayjs';
import { Button } from 'react-bootstrap';

const Modal = ({ show, onClose, data, onChange, onSave, title, fields, loading }) => {
  const [dateValue, setDateValue] = useState(null);

  useEffect(() => {
    if (data.expiryDate) {
      setDateValue(dayjs(data.expiryDate));
    } else {
      setDateValue(null);
    }
  }, [data.expiryDate]);

  // Spinner Overlay Component
  const SpinnerOverlay = ({ loading }) => {
    if (!loading) return null;

    return (
      <div
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          backgroundColor: 'rgba(255, 255, 255, 0.7)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          zIndex: 100000,
        }}
      >
        <RotateSpinner color="black" />
      </div>
    );
  };

  // FormField Component
  const FormField = ({
    type,
    value,
    onChange,
    key,
    label,
    placeholder,
    options = [],
    isRequired,
    loading,
  }) => {
    const handleDateChange = (date) => {
      if (date) {
        onChange(key, date.format('YYYY-MM-DD'));
      } else {
        onChange(key, '');
      }
    };

    return (
      <div className={`form-group ${type === 'textarea' ? 'col-12' : 'col-md-4'}`} style={{ marginBottom: '1rem' }}>
        <label style={{ fontSize: '0.9rem', fontWeight: '600' }}>
          {label} {isRequired && <span className="text-danger" style={{ marginLeft: '0.2rem' }}>*</span>}
        </label>

        {type === 'input' && (
          <input
            type="text"
            className="form-control"
            value={value || ''}
            onChange={(e) => onChange(key, e.target.value)}
            required={isRequired}
            disabled={loading}
            placeholder={placeholder}
            style={{ fontSize: '0.9rem' }}
          />
        )}

        {type === 'select' && (
          <select
            value={value || ''}
            onChange={(e) => onChange(key, e.target.value)}
            className="form-control"
            required={isRequired}
            disabled={loading}
            style={{ fontSize: '0.9rem' }}
          >
            <option value="" disabled>
              Select {label}
            </option>
            {options.map((option, idx) => (
              <option key={idx} value={option}>
                {option}
              </option>
            ))}
          </select>
        )}

        {type === 'textarea' && (
          <textarea
            className="form-control"
            rows="2"
            value={value || ''}
            onChange={(e) => onChange(key, e.target.value)}
            required={isRequired}
            disabled={loading}
            placeholder={placeholder}
            style={{ resize: 'vertical', fontSize: '0.9rem' }}
          />
        )}

        {type === 'date' && (
          <DatePicker
            size="middle"
            value={value ? dayjs(value) : null}
            onChange={handleDateChange}
            getPopupContainer={(trigger) => trigger.parentNode}
            placeholder={`Select ${label}`}
            disabledDate={(current) => current && current < dayjs().startOf('day')}
            style={{
              padding: '0.55rem 1.3rem',
              marginTop: '0.2rem',
              border: '1px solid gray',
              width: '100%',
              fontSize: '0.9rem',
            }}
            disabled={loading}
          />
        )}
      </div>
    );
  };

  return (
    <div className={`modal fade ${show ? 'show d-block' : ''}`} tabIndex="-1" role="dialog" aria-labelledby="exampleModalLabel">
      <div className="modal-dialog modal-dialog-centered modal-lg" role="document">
        <div className="modal-content" style={{ position: 'relative' }}>

          {/* Spinner Overlay */}
          <SpinnerOverlay loading={loading} />

          <div className="modal-header" style={{ backgroundColor: '#2392e0' }}>
            <h5 className="modal-title" id="exampleModalLabel">{title}</h5>
            <button type="button" onClick={onClose} className="close" aria-label="Close">
              <span aria-hidden="true">&times;</span>
            </button>
          </div>

          <div className="modal-body">
            <form>
              <div className="row">
                {fields.map(({ key, label, isreq, inputtype = 'input', options = [], placeholder = '' }) => (
                  <FormField
                    key={key}
                    type={inputtype}
                    value={data[key]}
                    onChange={onChange}
                    label={label}
                    placeholder={placeholder}
                    options={options}
                    isRequired={isreq}
                    loading={loading}
                  />
                ))}
              </div>
            </form>
          </div>

          <div className="modal-footer">
            <Button variant="warning" onClick={onClose} disabled={loading}>
              Close
            </Button>
            <Button variant="info" onClick={onSave} disabled={loading}>
              Save changes
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Modal;
