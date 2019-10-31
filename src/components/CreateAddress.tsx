import React from 'react';
import { Modal, Button, Input, message, Icon, Collapse, Select } from 'antd'
import axios from 'axios';
import { IAddressData } from '../state/appState'
import { getAddressActionCreator } from '../components/LoginContainer'
//redux
import { IAction, ActionType } from '../framework/IAction';
import { IWindow } from '../framework/IWindow'
import { format } from 'url';
declare let window: IWindow;
const { Option } = Select;
const { Panel } = Collapse;

interface INewAddress {
  _id: string;
  type: string;
  street: string;
  zip_code: string;
  city: string;
  iso_country_code: string;
  ref_user: string;
  pickup_station_id: string;
  pickup_ident_no: string;
}

interface IProps {
  stateCounter: number
}

interface IState {
  iso_country_code: string;
  type: string;
  createAddressFormVisible: boolean;
  inputData: INewAddress;
}

export default class CreateAddress extends React.PureComponent<IProps, IState> {

  constructor(props: IProps) {
    super(props);

    this.showForm = this.showForm.bind(this);
    this.handleOk = this.handleOk.bind(this);
    this.handleCancel = this.handleCancel.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.handleType = this.handleType.bind(this);
    this.handleCountry = this.handleCountry.bind(this);

    this.state = {
      iso_country_code: "",
      type: "",
      createAddressFormVisible: window.CS.getUIState().showCreateAddressForm,
      inputData: {
        _id: "",
        type: "home",
        street: "",
        zip_code: "",
        city: "",
        iso_country_code: "DE",
        ref_user: window.CS.getUIState().user._id,
        pickup_station_id: "",
        pickup_ident_no: "",


      }
    };
  }

  handleType(event:any){
    console.log("handleType",event)
    this.setState({
      type: event
    })
    console.log("type", this.state.type)
  }

  handleCountry(event:any){
    console.log("handleCountry",event)
    this.setState({
      iso_country_code: event
    })
    console.log("country",this.state.iso_country_code)
  }

  showForm = () => {
    const action: IAction = {
      type: ActionType.show_Address_Form
    }
    window.CS.clientAction(action);
    this.setState({ createAddressFormVisible: window.CS.getUIState().showCreateAddressForm });
  };

  handleOk = (event: any) => {
    event.preventDefault();
    const action: IAction = {
      type: ActionType.close_Address_Form
    }
    const input = {
      _id: "",
      type: this.state.type,
      street: this.state.inputData.street,
      zip_code: this.state.inputData.zip_code,
      city: this.state.inputData.city,
      iso_country_code: this.state.iso_country_code,
      ref_user: window.CS.getUIState().user._id,
      pickup_station_id: this.state.inputData.pickup_station_id,
      pickup_ident_no: this.state.inputData.pickup_ident_no,
    }
    console.log("INPUT HERE ######: ",input)
    axios.post(`${process.env.REACT_APP_BACKEND}/address/createAddress`, input)
      .then(res => {
        console.log("create address route", res)
        console.log("user_ID", window.CS.getUIState().user._id)
        window.CS.clientAction(action);
        this.setState({ createAddressFormVisible: window.CS.getUIState().showCreateAddressForm });
        window.CS.clientAction(getAddressActionCreator());
      })
      .catch(error => {
        switch (error.response.data.error) {
          case "all fields must be filled":
            message.error("Bitte füllen Sie alle Felder aus");
            break;
          case "not a real email":
            message.error("Bitte geben Sie ihre richtige Email Adresse an");
            break;
          default:
            console.log("unbekannter Datenbankfehler");
            break;
        }
      });

    this.setState({ createAddressFormVisible: window.CS.getUIState().showCreateAddressForm });

  };

  handleCancel = () => {
    const action: IAction = {
      type: ActionType.close_Address_Form
    }
    window.CS.clientAction(action);
    this.setState({ createAddressFormVisible: window.CS.getUIState().showCreateAddressForm });
    window.CS.clientAction(getAddressActionCreator());
  };

  handleChange(event: any) {
    let { name, value } = event.target;
    this.setState({
      inputData: {
        ...this.state.inputData,
        [name]: value
      }
    });
  }


  // <Select defaultValue="Lieferadresse" style={{ width: 120 }} onChange={this.handleChange}>
  // <Option value="Lieferadresse" name="type">Lieferadresse</Option>
  //   <Option value="Rechnungsadresse" name="type">Rechnungsadresse</Option>
  //   <Option value="Abholstation" name="type">Abholstation</Option>
  // </Select>
  //
  render() {
    if (window.CS.getUIState().showCreateAddressForm) {
      return (
        <div>
          <form id="createAddressForm">
            <table className="account-table">
              <tr>
                <th colSpan={2}>Adresse hinzufügen<br /><br /></th>
              </tr>
              <tr>
                <td>Adresstyp: </td>
                <td>
                <Select  defaultValue="home" size="small"  className="searchItemStyle" onChange={this.handleType}>
                            <Option value="home">Lieferadresse</Option>
                            <Option value="invoice">Rechnungsadresse</Option>
                            <Option value="pickup">Packstation</Option>
                        </Select>
                  {/* <Input placeholder="Adresstyp" name="type" value={this.state.inputData.type} onChange={this.handleChange} />&nbsp; */}
              </td>
              </tr>

              <tr>
                <td>Straße: </td>
                <td><Input placeholder="Straße" name="street" value={this.state.inputData.street} onChange={this.handleChange} />&nbsp;</td>
              </tr>

              <tr>
                <td>Postleitzahl:</td>
                <td> <Input placeholder="Postleitzahl" name="zip_code" value={this.state.inputData.zip_code} onChange={this.handleChange} />&nbsp;</td>
              </tr>

              <tr>
                <td>Stadt:</td>
                <td><Input placeholder="Stadt" name="city" value={this.state.inputData.city} onChange={this.handleChange} />&nbsp;</td>
              </tr>

              <tr>
              <td>Land:</td>
              <Select  defaultValue="DE" size="small" className="searchItemStyle" onChange={this.handleCountry}>
              <Option value='AF'>Afghanistan</Option>
              <Option value='AX'>Aland Islands</Option>
              <Option value='AL'>Albania</Option>
              <Option value='DZ'>Algeria</Option>
              <Option value='AS'>American Samoa</Option>
              <Option value='AD'>Andorra</Option>
              <Option value='AO'>Angola</Option>
              <Option value='AI'>Anguilla</Option>
              <Option value='AQ'>Antarctica</Option>
              <Option value='AG'>Antigua And Barbuda</Option>
              <Option value='AR'>Argentina</Option>
              <Option value='AM'>Armenia</Option>
              <Option value='AW'>Aruba</Option>
              <Option value='AU'>Australia</Option>
              <Option value='AT'>Austria</Option>
              <Option value='AZ'>Azerbaijan</Option>
              <Option value='BS'>Bahamas</Option>
              <Option value='BH'>Bahrain</Option>
              <Option value='BD'>Bangladesh</Option>
              <Option value='BB'>Barbados</Option>
              <Option value='BY'>Belarus</Option>
              <Option value='BE'>Belgium</Option>
              <Option value='BZ'>Belize</Option>
              <Option value='BJ'>Benin</Option>
              <Option value='BM'>Bermuda</Option>
              <Option value='BT'>Bhutan</Option>
              <Option value='BO'>Bolivia</Option>
              <Option value='BW'>Botswana</Option>
              <Option value='BV'>Bouvet Island</Option>
              <Option value='BR'>Brazil</Option>
              <Option value='BN'>Brunei Darussalam</Option>
              <Option value='BG'>Bulgaria</Option>
              <Option value='BF'>Burkina Faso</Option>
              <Option value='BI'>Burundi</Option>
              <Option value='KH'>Cambodia</Option>
              <Option value='CM'>Cameroon</Option>
              <Option value='CA'>Canada</Option>
              <Option value='CV'>Cape Verde</Option>
              <Option value='KY'>Cayman Islands</Option>
              <Option value='TD'>Chad</Option>
              <Option value='CL'>Chile</Option>
              <Option value='CN'>China</Option>
              <Option value='CX'>Christmas Island</Option>
              <Option value='CO'>Colombia</Option>
              <Option value='KM'>Comoros</Option>
              <Option value='CG'>Congo</Option>
              <Option value='CK'>Cook Islands</Option>
              <Option value='CR'>Costa Rica</Option>
              <Option value='CI'>Cote D\Ivoire</Option>
              <Option value='HR'>Croatia</Option>
              <Option value='CU'>Cuba</Option>
              <Option value='CY'>Cyprus</Option>
              <Option value='CZ'>Czech Republic</Option>
              <Option value='DK'>Denmark</Option>
              <Option value='DJ'>Djibouti</Option>
              <Option value='DM'>Dominica</Option>
              <Option value='DO'>Dominican Republic</Option>
              <Option value='EC'>Ecuador</Option>
              <Option value='EG'>Egypt</Option>
              <Option value='SV'>El Salvador</Option>
              <Option value='GQ'>Equatorial Guinea</Option>
              <Option value='ER'>Eritrea</Option>
              <Option value='EE'>Estonia</Option>
              <Option value='ET'>Ethiopia</Option>
              <Option value='FO'>Faroe Islands</Option>
              <Option value='FJ'>Fiji</Option>
              <Option value='FI'>Finland</Option>
              <Option value='FR'>France</Option>
              <Option value='GF'>French Guiana</Option>
              <Option value='PF'>French Polynesia</Option>
              <Option value='GA'>Gabon</Option>
              <Option value='GM'>Gambia</Option>
              <Option value='GE'>Georgia</Option>
              <Option value='DE'>Germany</Option>
              <Option value='GH'>Ghana</Option>
              <Option value='GI'>Gibraltar</Option>
              <Option value='GR'>Greece</Option>
              <Option value='GL'>Greenland</Option>
              <Option value='GD'>Grenada</Option>
              <Option value='GP'>Guadeloupe</Option>
              <Option value='GU'>Guam</Option>
              <Option value='GT'>Guatemala</Option>
              <Option value='GG'>Guernsey</Option>
              <Option value='GN'>Guinea</Option>
              <Option value='GW'>Guinea-Bissau</Option>
              <Option value='GY'>Guyana</Option>
              <Option value='HT'>Haiti</Option>
              <Option value='HN'>Honduras</Option>
              <Option value='HK'>Hong Kong</Option>
              <Option value='HU'>Hungary</Option>
              <Option value='IS'>Iceland</Option>
              <Option value='IN'>India</Option>
              <Option value='ID'>Indonesia</Option>
              <Option value='IQ'>Iraq</Option>
              <Option value='IE'>Ireland</Option>
              <Option value='IM'>Isle Of Man</Option>
              <Option value='IL'>Israel</Option>
              <Option value='IT'>Italy</Option>
              <Option value='JM'>Jamaica</Option>
              <Option value='JP'>Japan</Option>
              <Option value='JE'>Jersey</Option>
              <Option value='JO'>Jordan</Option>
              <Option value='KZ'>Kazakhstan</Option>
              <Option value='KE'>Kenya</Option>
              <Option value='KI'>Kiribati</Option>
              <Option value='KR'>Korea</Option>
              <Option value='KW'>Kuwait</Option>
              <Option value='KG'>Kyrgyzstan</Option>
              <Option value='LV'>Latvia</Option>
              <Option value='LB'>Lebanon</Option>
              <Option value='LS'>Lesotho</Option>
              <Option value='LR'>Liberia</Option>
              <Option value='LI'>Liechtenstein</Option>
              <Option value='LT'>Lithuania</Option>
              <Option value='LU'>Luxembourg</Option>
              <Option value='MO'>Macao</Option>
              <Option value='MK'>Macedonia</Option>
              <Option value='MG'>Madagascar</Option>
              <Option value='MW'>Malawi</Option>
              <Option value='MY'>Malaysia</Option>
              <Option value='MV'>Maldives</Option>
              <Option value='ML'>Mali</Option>
              <Option value='MT'>Malta</Option>
              <Option value='MQ'>Martinique</Option>
              <Option value='MR'>Mauritania</Option>
              <Option value='MU'>Mauritius</Option>
              <Option value='YT'>Mayotte</Option>
              <Option value='MX'>Mexico</Option>
              <Option value='MD'>Moldova</Option>
              <Option value='MC'>Monaco</Option>
              <Option value='MN'>Mongolia</Option>
              <Option value='ME'>Montenegro</Option>
              <Option value='MS'>Montserrat</Option>
              <Option value='MA'>Morocco</Option>
              <Option value='MZ'>Mozambique</Option>
              <Option value='MM'>Myanmar</Option>
              <Option value='NA'>Namibia</Option>
              <Option value='NR'>Nauru</Option>
              <Option value='NP'>Nepal</Option>
              <Option value='NL'>Netherlands</Option>
              <Option value='NC'>New Caledonia</Option>
              <Option value='NZ'>New Zealand</Option>
              <Option value='NI'>Nicaragua</Option>
              <Option value='NE'>Niger</Option>
              <Option value='NG'>Nigeria</Option>
              <Option value='NU'>Niue</Option>
              <Option value='NF'>Norfolk Island</Option>
              <Option value='NO'>Norway</Option>
              <Option value='OM'>Oman</Option>
              <Option value='PK'>Pakistan</Option>
              <Option value='PW'>Palau</Option>
              <Option value='PA'>Panama</Option>
              <Option value='PG'>Papua New Guinea</Option>
              <Option value='PY'>Paraguay</Option>
              <Option value='PE'>Peru</Option>
              <Option value='PH'>Philippines</Option>
              <Option value='PN'>Pitcairn</Option>
              <Option value='PL'>Poland</Option>
              <Option value='PT'>Portugal</Option>
              <Option value='PR'>Puerto Rico</Option>
              <Option value='QA'>Qatar</Option>
              <Option value='RE'>Reunion</Option>
              <Option value='RO'>Romania</Option>
              <Option value='RU'>Russian Federation</Option>
              <Option value='RW'>Rwanda</Option>
              <Option value='BL'>Saint Barthelemy</Option>
              <Option value='SH'>Saint Helena</Option>
              <Option value='LC'>Saint Lucia</Option>
              <Option value='MF'>Saint Martin</Option>
              <Option value='WS'>Samoa</Option>
              <Option value='SM'>San Marino</Option>
              <Option value='SA'>Saudi Arabia</Option>
              <Option value='SN'>Senegal</Option>
              <Option value='RS'>Serbia</Option>
              <Option value='SC'>Seychelles</Option>
              <Option value='SL'>Sierra Leone</Option>
              <Option value='SG'>Singapore</Option>
              <Option value='SK'>Slovakia</Option>
              <Option value='SI'>Slovenia</Option>
              <Option value='SB'>Solomon Islands</Option>
              <Option value='SO'>Somalia</Option>
              <Option value='ZA'>South Africa</Option>
              <Option value='ES'>Spain</Option>
              <Option value='LK'>Sri Lanka</Option>
              <Option value='SD'>Sudan</Option>
              <Option value='SR'>Suriname</Option>
              <Option value='SZ'>Swaziland</Option>
              <Option value='SE'>Sweden</Option>
              <Option value='CH'>Switzerland</Option>
              <Option value='TW'>Taiwan</Option>
              <Option value='TJ'>Tajikistan</Option>
              <Option value='TZ'>Tanzania</Option>
              <Option value='TH'>Thailand</Option>
              <Option value='TL'>Timor-Leste</Option>
              <Option value='TG'>Togo</Option>
              <Option value='TK'>Tokelau</Option>
              <Option value='TO'>Tonga</Option>
              <Option value='TN'>Tunisia</Option>
              <Option value='TR'>Turkey</Option>
              <Option value='TM'>Turkmenistan</Option>
              <Option value='TV'>Tuvalu</Option>
              <Option value='UG'>Uganda</Option>
              <Option value='UA'>Ukraine</Option>
              <Option value='GB'>United Kingdom</Option>
              <Option value='US'>United States</Option>
              <Option value='UY'>Uruguay</Option>
              <Option value='UZ'>Uzbekistan</Option>
              <Option value='VU'>Vanuatu</Option>
              <Option value='VE'>Venezuela</Option>
              <Option value='VN'>Viet Nam</Option>
              <Option value='WF'>Wallis And Futuna</Option>
              <Option value='EH'>Western Sahara</Option>
              <Option value='YE'>Yemen</Option>
              <Option value='ZM'>Zambia</Option>
              <Option value='ZW'>Zimbabwe</Option>
            </Select>
                {/* <td>Land:</td>
                <td><Input placeholder="Land" name="iso_country_code" value={this.state.inputData.iso_country_code} onChange={this.handleChange} />&nbsp;</td> */}
              </tr>


              <tr>
                <td>Abholstation:</td>
                <td><Input placeholder="Abholstation" name="pickup_station_id" value={this.state.inputData.pickup_station_id} onChange={this.handleChange} />&nbsp;</td>
              </tr>

              <tr>
                <td>AbholstationID:</td>
                <td><Input placeholder="AbholstationID" name="pickup_ident_no" value={this.state.inputData.pickup_ident_no} onChange={this.handleChange} />&nbsp;</td>
              </tr>

            </table>
          </form>
          <Button key="back" onClick={this.handleCancel}>
            Abbrechen
            </Button>,
            <Button style={{ "backgroundColor": "rgb(71, 38, 21)" }} form="signupForm" key="submit" type="primary" onClick={this.handleOk}>
            Adresse hinzufügen
            </Button>
        </div>
      );
    } else {
      return (
        <div>
          Nothin here!
    </div>
      );
    }
  }
}