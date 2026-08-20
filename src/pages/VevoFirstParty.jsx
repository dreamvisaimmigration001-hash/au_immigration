import React, { useState } from 'react';
import html2pdf from 'html2pdf.js';
import './vevo.css';
import './ess.css';
import visaPdf from '../assets/Australian visa 482 Tanmay Dutta.pdf';

function VevoFirstParty() {
  const [visaData, setVisaData] = useState(null);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [referenceType, setReferenceType] = useState('visaGrantNumber');
  const API_URL = import.meta.env.VITE_API_URL;

  const formatDate = (dateString) => {
    if (!dateString) return '';
    try {
      const date = new Date(dateString);
      if (isNaN(date.getTime())) return dateString;
      return date.toLocaleDateString('en-AU', {
        day: '2-digit',
        month: 'long',
        year: 'numeric',
        timeZone: 'UTC'
      });
    } catch {
      return dateString;
    }
  };

  const handleDownloadPdf = () => {
    window.open(visaPdf, '_blank');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const referenceNumber = formData.get('_2a0a2a0a2c1b1b0'); 
    
    try {
      setError('');
      setVisaData(null);
      setLoading(true);
      
      const response = await fetch(`${API_URL}/api/visas/search`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          searchType: referenceType,
          referenceNumber: referenceNumber
        })
      });
      
      if (response.ok) {
        const data = await response.json();
        setVisaData(data);
      } else {
        const err = await response.json();
        setError(err.message || 'Visa not found');
      }
    } catch (err) {
      setError('An error occurred while searching');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="wc-application">
      <form onSubmit={handleSubmit} id="A" noValidate className="wc-application">
        <header id="_0" className="wc-panel wc-panel-type-header" role="banner">
          <div className="wc-content">
            <div id="_0a" className="wc-panel">
              <ul className="wc-listlayout wc-align-right wc-listlayout-type-flat wc_list_nb">
                <li>
                  <a id="_0a0" className="wc-link" href="#">
                    <span className="wc_nti">Home</span>
                  </a>
                </li>
                <li>
                  <button id="_0a1" name="_0a1" value="x" type="button" className="wc-button wc-linkbutton wc_btn_cancel" formNoValidate>Help [on]</button>
                </li>
              </ul>
            </div>
            <div id="_0b" className="wc-panel wc-panel-type-banner">
              <div className="wc-content">
                <h1 id="_0b0" className="wc-heading">VEVO for Visa Holders</h1>
              </div>
            </div>
          </div>
        </header>

        {!visaData && (
          <div id="_2a0" className="wc-panel wc-margin-all-lg">
            <div className="wc-content">
              <section id="_2a0a" className="wc-panel wc-panel-type-chrome" data-wc-title="Visa holder enquiry" accessKey="1">
              <h1>Visa holder enquiry</h1>
              <div className="wc-content">
                <div id="_2a0a2a0a" className="wc-panel">
                  <div className="wc-content">
                    <div id="_2a0a2a0a1" className="wc-panel">
                      <div className="wc-flowlayout wc-align-vertical">
                        <div className="wc-cell">Please complete the following details to view your visa entitlements.</div>
                        <div className="wc-cell">Fields marked <span style={{ color: '#e00' }}>*</span> must be completed.</div>
                        <div className="wc-cell">&nbsp;</div>
                      </div>
                    </div>

                    <div id="_2a0a2a0a2" className="wc-panel">
                      <div className="wc-flowlayout wc-align-vertical">


                        <div className="wc-cell">
                          <div id="_2a0a2a0a2c" className="wc-panel">
                            <div className="wc-content">
                              <div id="_2a0a2a0a2c1" className="wc-panel">
                                <div className="wc-flowlayout wc-vgap-sm wc-align-vertical">
                                  <div className="wc-cell">
                                    <div role="presentation" id="_2a0a2a0a2c1a" className="wc-fieldlayout wc_fld_lblwth_35 wc-layout-flat">
                                      <div id="_2a0a2a0a2c1a0" className="wc-field">
                                        <label htmlFor="_2a0a2a0a2c1a0b_input" id="_2a0a2a0a2c1a0a" className="wc-label wc_req">Reference type*</label>
                                        <div className="wc-input">
                                          <span id="_2a0a2a0a2c1a0b" className="wc-dropdown wc-input-wrapper">
                                            <select id="_2a0a2a0a2c1a0b_input" name="_2a0a2a0a2c1a0b" required value={referenceType} onChange={(e) => setReferenceType(e.target.value)}>
                                              <option className="wc-option" value="visaGrantNumber">Visa Grant Number</option>
                                              <option className="wc-option" value="passport">Passport Number</option>
                                            </select>
                                          </span>
                                        </div>
                                      </div>
                                    </div>
                                  </div>
                                  <div className="wc-cell">
                                    <div role="presentation" id="_2a0a2a0a2c1b" className="wc-fieldlayout wc_fld_lblwth_35 wc-layout-flat">
                                      <div id="_2a0a2a0a2c1b1" className="wc-field">
                                        <label htmlFor="_2a0a2a0a2c1b1b0_input" id="_2a0a2a0a2c1b1a" className="wc-label wc_req">
                                          {referenceType === 'passport' ? 'Passport Number*' : 'Visa Grant Number*'}
                                        </label>
                                        <div className="wc-input">
                                          <div id="_2a0a2a0a2c1b1b" className="wc-panel">
                                            <div className="wc-flowlayout wc-hgap-med wc-align-left">
                                              <div className="wc-cell">
                                                <span id="_2a0a2a0a2c1b1b0" className="wc-textfield wc-input-wrapper">
                                                  <input id="_2a0a2a0a2c1b1b0_input" type="text" name="_2a0a2a0a2c1b1b0" required size="50" maxLength="14" minLength="13" />
                                                </span>
                                              </div>
                                            </div>
                                          </div>
                                        </div>
                                      </div>
                                    </div>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>

                        <div className="wc-cell">&nbsp;</div>

                        <div className="wc-cell">
                          <div id="_2a0a2a0a2e" className="wc-panel">
                            <div className="wc-content">
                              <div role="presentation" id="_2a0a2a0a2e0" className="wc-fieldlayout wc_fld_lblwth_35 wc-layout-flat">
                                <div id="_2a0a2a0a2e0a" className="wc-field">
                                  <label htmlFor="_2a0a2a0a2e0a1a_input" id="_2a0a2a0a2e0a0" className="wc-label wc_req">Date of birth*</label>
                                  <div className="wc-input">
                                    <div id="_2a0a2a0a2e0a1" className="wc-panel">
                                      <div className="wc-flowlayout wc-hgap-med wc-align-left">
                                        <div className="wc-cell">
                                            <div id="_2a0a2a0a2e0a1a" className="wc-datefield wc-input-wrapper wc_datefield_partial" role="combobox">
                                              <input id="_2a0a2a0a2e0a1a_input" type="date" name="_2a0a2a0a2e0a1a" required autoComplete="off" />
                                          </div>
                                        </div>
                                      </div>
                                    </div>
                                  </div>
                                </div>


                              </div>
                            </div>
                          </div>
                        </div>

                        <div className="wc-cell">
                          <div id="_2a0a2a0a2f" className="wc-panel wc-margin-all-z">
                            <div className="wc-content">
                              &nbsp;
                              <div role="presentation" id="_2a0a2a0a2f1" className="wc-fieldlayout wc_fld_lblwth_35 wc-layout-flat">
                                <div id="_2a0a2a0a2f1a" className="wc-field">
                                  <span className="wc_fld_pl">&nbsp;</span>
                                  <div className="wc-input">
                                    <div id="_2a0a2a0a2f1a0" className="wc-panel">
                                      <div className="wc-content">
                                        <a id="_2a0a2a0a2f1a0b" className="wc-link" href="#" target="_blank" rel="noopener noreferrer">View Terms and Conditions</a>
                                        <br/>
                                        <label htmlFor="_2a0a2a0a2f1b0_input" id="_2a0a2a0a2f1a0c" className="wc-label wc_req"> I have read and agree to the terms and conditions*</label>
                                      </div>
                                    </div>
                                  </div>
                                </div>
                                <div id="_2a0a2a0a2f1b" className="wc-field">
                                  <span className="wc_fld_pl">&nbsp;</span>
                                  <div className="wc-input">
                                    <span id="_2a0a2a0a2f1b0" className="wc-checkbox wc-input-wrapper">
                                      <input id="_2a0a2a0a2f1b0_input" type="checkbox" name="_2a0a2a0a2f1b0" required value="true" />
                                    </span>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>

                    <div id="_2a0a2a0a3" className="wc-panel wc-panel-type-feature wc-margin-n-lg wc-margin-s-sm">
                      <div className="wc-borderlayout" style={{ display: 'flex', justifyContent: 'space-between', padding: '1rem 0' }}>
                        <div className="wc-west wc_bl_mid50">
                          <button id="_2a0a2a0a3a0a" name="_2a0a2a0a3a0a" value="x" type="button" className="wc-button wc_btn_cancel">Clear</button>
                        </div>
                        <div className="wc-east wc_bl_mid50">
                          <button id="_2a0a2a0a3b0a" name="_2a0a2a0a3b0a" value="x" type="submit" className="wc-button" disabled={loading}>
                            {loading ? (
                              <span style={{ display: 'flex', alignItems: 'center', gap: '5px' }}>
                                <span className="spinner" style={{ width: '12px', height: '12px', border: '2px solid #fff', borderTop: '2px solid transparent', borderRadius: '50%', animation: 'spin 1s linear infinite' }}></span>
                                Submitting...
                              </span>
                            ) : (
                              'Submit'
                            )}
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </section>
          </div>
        </div>
        )}

        {error && (
          <div className="wc-panel wc-margin-all-lg" style={{ color: 'red', fontWeight: 'bold' }}>
            <div className="wc-content">Error: {error}</div>
          </div>
        )}

        {visaData && (
          <div id="visa-details-pdf-content" className="wc-panel wc-margin-all-lg" style={{ backgroundColor: '#fff', border: '1px solid #ccc' }}>
            <div className="wc-content" style={{ padding: '10px' }}>
              
              {/* Top buttons bar */}
              <div style={{ display: 'flex', justifyContent: 'space-between', borderBottom: '1px solid #ccc', paddingBottom: '10px', marginBottom: '20px' }}>
                <button type="button" className="wc-button" onClick={() => setVisaData(null)} style={{ padding: '4px 10px', backgroundColor: '#f5f5f5', border: '1px solid #999', cursor: 'pointer', color: '#000' }}>New enquiry</button>
                <div>
                  <button type="button" className="wc-button" onClick={handleDownloadPdf} style={{ padding: '4px 10px', backgroundColor: '#e2e2e2', border: '1px solid #999', marginRight: '10px', color: '#000' }}>View as PDF</button>
                  <button type="button" className="wc-button" style={{ padding: '4px 10px', backgroundColor: '#f5f5f5', border: '1px solid #999', color: '#000' }}>Send Email</button>
                </div>
              </div>

              {/* Data Table */}
              <table style={{ width: '100%', textAlign: 'left', borderCollapse: 'collapse', fontSize: '14px', lineHeight: '1.8' }}>
                <tbody>
                  <tr>
                    <td style={{ width: '25%', paddingBottom: '15px' }}>Current date and time</td>
                    <td style={{ width: '75%', paddingBottom: '15px' }}>{new Date().toLocaleString('en-AU', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric', hour: '2-digit', minute: '2-digit', second: '2-digit', timeZoneName: 'short', timeZone: 'Australia/Sydney' })} Canberra, Australia</td>
                  </tr>
                  <tr>
                    <td>Family name</td>
                    <td>{visaData.familyName}</td>
                  </tr>
                  <tr>
                    <td>Given name(s)</td>
                    <td>{visaData.givenNames}</td>
                  </tr>
                  <tr>
                    <td>Document number</td>
                    <td>{visaData.documentNumber}</td>
                  </tr>
                  <tr>
                    <td>Visa class / subclass</td>
                    <td>{visaData.visaClassSubclass}</td>
                  </tr>
                  <tr>
                    <td>Visa applicant</td>
                    <td>{visaData.visaApplicant}</td>
                  </tr>
                  <tr>
                    <td>Visa grant date</td>
                    <td>{formatDate(visaData.visaGrantDate)}</td>
                  </tr>
                  <tr>
                    <td>Visa expiry date</td>
                    <td>{formatDate(visaData.visaExpiryDate)}</td>
                  </tr>
                  {/* <tr>
                    <td>Location</td>
                    <td>{visaData.location}</td>
                  </tr> */}
                  <tr>
                    <td>Visa status</td>
                    <td>{visaData.visaStatus}</td>
                  </tr>
                  <tr>
                    <td>Visa grant number</td>
                    <td>{visaData.visaGrantNumber}</td>
                  </tr>
                  <tr>
                    <td>Entries allowed</td>
                    <td>{visaData.entriesAllowed}</td>
                  </tr>
                  <tr>
                    <td>Must not arrive after</td>
                    <td>{formatDate(visaData.mustNotArriveAfter)}</td>
                  </tr>
                  <tr>
                    <td>Enter before date</td>
                    <td>{formatDate(visaData.enterBeforeDate)}</td>
                  </tr>
                  <tr>
                    <td>Period of stay</td>
                    <td>{visaData.periodOfStay}</td>
                  </tr>
                  <tr>
                    <td>Visa type</td>
                    <td>{visaData.visaType}</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        )}

        <footer id="_3" className="wc-panel wc-panel-type-footer wc-margin-all-lg">
          <div className="wc-borderlayout">
            <div className="wc_bl_mid">
              <div className="wc-west wc_bl_mid50">
                <div id="_3a" className="wc-panel">
                  <ul className="wc-listlayout wc-hgap-med wc-align-left wc-listlayout-type-flat wc-listlayout-separator-bar">
                    <li><a id="_3a0" className="wc-link" href="#">Accessibility</a></li>
                    <li><a id="_3a1" className="wc-link" href="#">Online Security</a></li>
                    <li><a id="_3a2" className="wc-link" href="#">Privacy</a></li>
                    <li><a id="_3a3" className="wc-link" href="#">Copyright &amp; Disclaimer</a></li>
                    <li><button id="_3a4" type="button" className="wc-button wc-linkbutton wc_btn_cancel">Change Password</button></li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </footer>
      </form>
    </div>
  );
}

export default VevoFirstParty;
